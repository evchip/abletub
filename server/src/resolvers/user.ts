import { Field, InputType, Mutation, Query, Resolver, Arg, Ctx, ObjectType } from "type-graphql";
import { CustomSessionData, MyContext } from '../types';
import { User } from '../entities/User';
import argon2 from 'argon2';
import {EntityManager} from '@mikro-orm/postgresql';

@InputType()
class UserNamePasswordInput {
    @Field()
    username!: string;
    @Field()
    password!: string;
}

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
    @Query(() => User, { nullable: true})
    async me(@Ctx() { req, em }: MyContext) {
        console.log('RES.SESSION::::: ', req.session)
        // you are not logged in
        if (!req.session.userId) {
            return null;
        }
        const user = await em.findOne(User, { id: req.session.userId })
        return user
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg('options') options: UserNamePasswordInput,
        @Ctx() { em, req }: MyContext
        
    ): Promise<UserResponse> {
        if (options.username.length <= 2) {
            return {
                errors: [{
                    field: 'username',
                    message: 'length must be greater than 2'
                }]
            }
        }
        console.log(req.session)
        if (options.password.length <= 3) {
            return {
                errors: [{
                    field: 'password',
                    message: 'length must be greater than 2'
                }]
            }
        }
        const hashedPassword = await argon2.hash(options.password)
        let user = em.create(User, {
            username: options.username,
            password: hashedPassword
        });
        try {
            const result = await (em as EntityManager)
            .createQueryBuilder(User)
            .getKnexQuery()
            .insert(
                {
                    username: options.username, 
                    password: hashedPassword,
                    created_at: new Date(),
                    updated_at: new Date()
                }
            ).returning("*");
        user = result[0]
        console.log(user)
        } catch(err) {
            console.log(err)
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

        // let sess = req.session as CustomSessionData;
        // sess.userId = user.id;
        req.session.userId = user.id;

        return {
            user,
        };
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg('options') options: UserNamePasswordInput,
        @Ctx() { em }: MyContext
    ): Promise<UserResponse> {
        const user = await em.findOne(User, { username: options.username });
        if (!user) {
            return {
                errors: [{
                    field: 'username',
                    message: 'username does not exist' 
                }]
            }
        }
        const valid = await argon2.verify(user.password, options.password)
        if (!valid) {
            return {
                errors: [{
                    field: 'password',
                    message: 'password is incorrect' 
                }]
            }
        }
        
        return {user};
    }

    @Mutation(() => Boolean)
    logout(
        @Ctx() { req, res }: MyContext
    ) {
        return new Promise(resolve => req.session.destroy((err) => {
            res.clearCookie('qid')
            if (err) {
                console.log(err);
                resolve(false);
                return;
            }
            resolve(true);
        })) 
    }
}