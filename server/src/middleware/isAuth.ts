import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  // context.req.session.destroy((err: any) => console.log('session.id isAuth', context.req.sessionID, err))

    // console.log('fuckin user', context.res)
  if (!context.req.session.userId) {
    throw new Error("not authenticated");
  }

  return next();
};