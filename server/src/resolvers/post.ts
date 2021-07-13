import { User } from "../entities/User";
import { MyContext } from "src/types";
import { Arg, Ctx, Query, Resolver, Mutation, InputType, Field, UseMiddleware } from "type-graphql";
import { _Post as Post } from '../entities/Post';
import { isAuth } from "../middleware/isAuth";

@InputType()
class PostInput {
    @Field()
    title!: string
    @Field()
    text!: string
}


@Resolver()
export class PostResolver {
    @Query(() => [Post])
    async posts(): Promise<Post[]> {

        return Post.find()
    }

    @Query(() => Post, { nullable: true })
    post(
        @Arg('id') id: number
    ): Promise<Post | undefined> {
        return Post.findOne(id)
    }


    @Mutation(() => Post)
    async createPost(
        @Arg('input') input: PostInput,
        @Ctx() { req }: MyContext
    ): Promise<Post> {
        const user = await User.findOne(req.session.userId)
        console.log('fuckin user', user)
        if (!user.id) {
            throw new Error('not authenticated')
        }
        // req.session.userId = user.id

        return Post.create({
            ...input, 
            creatorId: user.id})
            .save();
    }

    @Mutation(() => Post, { nullable: true })
    async updatePost(
        @Arg("id") id: number,
        @Arg("title", () => String, { nullable: true }) title: string
    ): Promise<Post | null> {
        const post = await Post.findOne(id);
        if (!post) {
            return null
        }
        if (typeof title !== 'undefined') {
            await Post.update({id}, {title})
        }
        return post;
    }

    @Mutation(() => Boolean)
    async deletePost(
        @Arg("id") id: number,
    ): Promise<boolean> {
        await Post.delete(id)
        return true;
    }
}