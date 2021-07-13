import { User } from "../entities/User";
import { MyContext } from "src/types";
import { MiddlewareFn } from "type-graphql";

export const isAuth: MiddlewareFn<MyContext> = ({context}, next) => {
    console.log(context.req.session)
    async function checkUserId (ctx) {
        const user = await User.findOne(ctx.req.session.userId)

        if (!user.id) {
            throw new Error('not authenticated')
        }
        context.req.session.userId = user.id
    }
    
    checkUserId(context)
    return next();
}