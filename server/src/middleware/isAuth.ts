import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  console.log('context req session', context.req.session)
  if (!context.req.session.userId) {
    throw new Error("not authenticated");
  }

  return next();
};