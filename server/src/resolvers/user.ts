import { Field, Mutation, Query, Resolver, Arg, Ctx, ObjectType, Root, FieldResolver } from "type-graphql";
import { MyContext } from '../types';
import { User } from '../entities/User';
import argon2 from 'argon2';
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from "../constants";
import { sendEmail } from "../utils/sendEmail";
import { UserNamePasswordInput } from "./UserNamePasswordInput";
import { validateRegister } from "../utils/validateRegister";
import {v4} from 'uuid';
import { getConnection } from "typeorm";

@ObjectType()
class FieldError {
    @Field()
    field!: string;

    @Field()
    message!: string;
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], {nullable: true})
    errors?: FieldError[]

    @Field(() => User, {nullable: true})
    user?: User

}

@Resolver(User)
export class UserResolver {

    @FieldResolver(() => String)
    email(@Root() user: User, @Ctx() {req}: MyContext) {
        // this is the current user and it's ok to show them their own email
        if (req.session.userId === user.id) {
            return user.email;
        }
        // the current user wants to see someone elses email
        return "";
    }

    @Mutation(() => UserResponse)
    async changePassword(
        @Arg('token') token: string,
        @Arg('newPassword') newPassword: string,
        @Ctx() {redis, req}: MyContext
    ): Promise<UserResponse> {
        if (newPassword.length <= 2) {
            return { errors: [
              {
                field: "newPassword",
                message: "length must be greater than 2",
              },
            ] };
          }
        const key = FORGET_PASSWORD_PREFIX+token
        const userId = await redis.get(key);
        if (!userId) {
            return {
                errors: [
                    {
                        field: "token",
                        message: "token is expired",
                      },
                ]
            }
        }
        const userIdNum = parseInt(userId)
        const user = await User.findOne(userIdNum);

        if (!user) {
            return {
                errors: [
                    {
                        field: "token",
                        message: "user no longer exists",
                    },
                ]
            }
        }

        await User.update({id: userIdNum}, {
            password: await argon2.hash(newPassword)
        })

        await redis.del(key)

        // log in user after change password
        req.session.userId = user.id;


        return {user};
    }

    @Mutation(() => Boolean)
    async forgotPassword(
        @Arg('email') email: string,
        @Ctx() {redis}: MyContext
    ) {
        const user = await User.findOne({where: {email}})
        if (!user) {
            // the email is not in the db
            return false;
        }
        const token = v4();

        await redis.set(FORGET_PASSWORD_PREFIX + token, user.id, 'ex', 1000 * 60 * 60 * 24 * 3) // 3 days
        sendEmail(email, `<a href="http://localhost:3000/change-password/${token}">reset password</a>`);

        return true;
    }

    @Query(() => User, { nullable: true})
    me(@Ctx() { req }: MyContext) {
       
        console.log('user.ts req.session.userId', req.session.userId)
        // you are not logged in
        if (!req.session.userId) {
            console.log('you are not logged in')
            return null;
        }

        return User.findOne(req.session.userId);
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg('options') options: UserNamePasswordInput,
        @Ctx() { req }: MyContext
        
    ): Promise<UserResponse> {
        const errors = validateRegister(options);
        if (errors) {
            return {errors};
        }
        const hashedPassword = await argon2.hash(options.password)
        let user;
        try {
            const result = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(User)
            .values({
                username: options.username,
                email: options.email,
                password: hashedPassword,
            })
            .returning("*")
            .execute();
            console.log('result:::: ', result);
            user = result.raw[0];
        } catch(err) {
            console.log('REGISTER ERROR: ', err)
            if (err.code === '23505') {
                // duplicate username error
                return {
                    errors: [{
                        field: 'username',
                        message: 'username is already taken'
                    }]
                }
            }
            
        }

        req.session!.userId = user.id;

        return {
            user,
        };
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg('usernameOrEmail') usernameOrEmail: string,
        @Arg('password') password: string,
        @Ctx() { req }: MyContext
    ): Promise<UserResponse> {
        const user = await User.findOne( 
            usernameOrEmail.includes('@') ? 
            { where: {email: usernameOrEmail} } : 
            { where: {username: usernameOrEmail} } 
        );
        // req.session.destroy((err: any) => console.log('session.id isAuth', req.sessionID, err))

        if (!user) {
            return {
                errors: [{
                    field: 'usernameOrEmail',
                    message: 'username does not exist' 
                }]
            }
        }
        console.log('session.id', req.sessionID)
        const valid = await argon2.verify(user.password, password)
        
        if (!valid) {
            return {
                errors: [{
                    field: 'password',
                    message: 'password is incorrect' 
                }]
            }
        }

        // let sess = req.session as CustomSessionData;
        // sess.userId = user.id;
        // req.session.userId = sess.userId

        req.session.userId = user.id;

        req.session.save(function(err) {
            console.log("err session save", err)
        })
        console.log('req.session.userid::::', req.session.userId)
        return {
            user
        };
    }

    @Mutation(() => Boolean)
    logout(
        @Ctx() { req, res }: MyContext
    ) {
        console.log('trigger logout', req.session)
        return new Promise(resolve => req.session.destroy((err) => {
            res.clearCookie(COOKIE_NAME)
            if (err) {
                console.log(err);
                resolve(false);
                return;
            }
            resolve(true);
        })) 
    }
}