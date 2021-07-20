import { Request, Response } from 'express';
import { Session, SessionData } from 'express-session'
import { Redis } from 'ioredis';
import { createUpvoteLoader } from './utils/createUpvoteLoader';
import { createUserLoader } from './utils/createUserLoader';

// export interface CustomSessionData extends Session {
//     userId: number;
//     // You can add any additional data here.
//   }

export type MyContext = {
    //req: Request & { session: Session & { userId: number } };
    req: Request & { 
      session: Session & Partial<SessionData> & { userId?: number };
    };
    redis: Redis;
    res: Response;
    userLoader: ReturnType<typeof createUserLoader>;
    updootLoader: ReturnType<typeof createUpvoteLoader>;
}