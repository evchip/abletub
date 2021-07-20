import { MyContext } from "src/types";
import { Arg, Ctx, Query, Resolver, Mutation, InputType, Field, UseMiddleware, Int, FieldResolver, Root, ObjectType, Info } from "type-graphql";
import { _Post as Post } from '../entities/Post';
import { isAuth } from "../middleware/isAuth";
import { getConnection } from "typeorm";
import { Updoot } from "../entities/Updoot";
import { tmpdir } from "os";

@InputType()
class PostInput {
    @Field()
    title!: string
    @Field()
    text!: string
}

@ObjectType()
class PaginatedPosts {
    @Field(() => [Post])
    posts: Post[];
    @Field()
    hasMore: boolean;
}


@Resolver(Post)
export class PostResolver {

    @FieldResolver(() => String)
    textSnippet(@Root() root: Post) {
        return root.text.slice(0, 50)
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async vote(
        @Arg('postId', () => Int) postId: number,
        @Arg('value', () => Int) value: number,
        @Ctx() {req}: MyContext
    ) {
        const isUpdoot = value !== -1;
        const realValue = isUpdoot ? 1 : -1
        const {userId}  = req.session;
        const upDoot = await Updoot.findOne({where: {postId, userId}})

        // user has voted on the post before

        if (upDoot && upDoot.value !== realValue) {
            await getConnection().transaction(async (tm) => {
                await tm.query(`
                    update updoot
                    set value = $1
                    where "postId" = $2 and "userId" = $3
                `, [realValue, postId, userId]);

                await tm.query(`
                    update __post
                    set points = points + $1
                    where id = $2;
            `, [realValue, postId]);
            })
        } else if (!upDoot) {
            // has not voted on this post before
            await getConnection().transaction(async tm => {
                await tm.query(`
                    insert into updoot ("userId", "postId", value)
                    values ($1, $2, $3)
                `, [userId, postId, realValue]);

                await tm.query(`
                    update __post
                    set points = points + $1
                    where id = $2;
                `, [realValue, postId])
            })
            
        }

        await getConnection().query(
            `
            START TRANSACTION;
            
            
            COMMIT;
            `
        );
        return true
    }

    @Query(() => PaginatedPosts)
    async posts(
        @Arg("limit", () => Int) limit: number,
        @Arg("cursor", () => String, {nullable: true}) cursor: string | null,
        @Ctx() {req}: MyContext,
    ): Promise<PaginatedPosts> {
        const realLimit = Math.min(50, limit);
        const realLimitPlusOne = realLimit + 1;
        // req.session.userId = 7
        const replacements: any[] = [realLimitPlusOne];
        console.log('req.session.userId for post vote', req.session)

        if (req.session.userId) {
            console.log('has user ID')
            replacements.push(req.session.userId)
        }

        let cursorIdx = 3;
        if (cursor) {
            replacements.push(new Date(parseInt(cursor)))
            cursorIdx = replacements.length
        }

        const posts = await getConnection().query(`
        select p.*,
        json_build_object(
            'id', u.id,
            'username', u.username,
            'email', u.email,
            'createdAt', u."createdAt",
            'updatedAt', u."updatedAt"
            ) creator,
        ${
            req.session.userId
                ? '(select value from updoot where "userId" = $2 and "postId" = p.id) "voteStatus"' 
                : 'null as "voteStatus"'
        }
        from __post p
        inner join public.user u on u.id = p."creatorId"
        ${cursor ? `where p."createdAt" < $${cursorIdx}`: ''}
        order by p."createdAt" DESC
        limit $1
        `, replacements)

        // const qb = getConnection()
        //     .getRepository(Post)
        //     .createQueryBuilder("p")
        //     .innerJoinAndSelect("p.creator", "u", 'u.id = p."creatorId"')
        //     .orderBy('p."createdAt"', "DESC")
        //     .take(realLimitPlusOne)
            
            // if (cursor) {
            //     qb.where('p."createdAt" < :cursor', { 
            //         cursor: new Date(parseInt(cursor)) 
            //     })
            // }
            // const posts = await qb.getMany()
        
        //    console.log('posts ', posts)
        return { 
            posts: posts.slice(0, realLimit),
            hasMore: posts.length === realLimitPlusOne
        };
    }

    @Query(() => Post, { nullable: true })
    post(
        @Arg('id', () => Int) id: number
    ): Promise<Post | undefined> {
        return Post.findOne(id, {relations: ["creator"] })
    }


    @Mutation(() => Post)
    @UseMiddleware(isAuth)
    async createPost(
        @Arg("input") input: PostInput,
        @Ctx() { req }: MyContext
    ): Promise<Post> {

        return Post.create({
            ...input, 
            creatorId: req.session.userId})
            .save();

    }

    @Mutation(() => Post, { nullable: true })
    @UseMiddleware(isAuth)
    async updatePost(
        @Arg("id", () => Int) id: number,
        @Arg("title") title: string,
        @Arg("text") text: string,
        @Ctx() { req }: MyContext
    ): Promise<Post | null> {
        console.log('id', id, 'creatorId', req.session.userId)
        const result = await getConnection()
        .createQueryBuilder()
        .update(Post)
        .set({ title, text })
        .where('id = :id and "creatorId" = :creatorId', { id, creatorId: req.session.userId })
        .returning("*")
        .execute();

        return result.raw[0];
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deletePost(
        @Arg("id", () => Int) id: number,
        @Ctx() { req }: MyContext
    ): Promise<boolean> {
        // console.log('this delete resolver is running')
        // const post = await Post.findOne(id)
        // if (!post) {
        //     console.log('no post to delete')
        //     return false
        // }
        // if (post?.creatorId !== req.session.userId) {
        //     console.log('cookies think you are not authorized')
        //     throw new Error('not authorized')
        // }
        // console.log('there is a post')
        // await Updoot.delete({ postId: id })
        // await Post.delete({ id })

        // cascades delete on postgres
        await Post.delete({id, creatorId: req.session.userId})
        return true;
    }
}