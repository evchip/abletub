import { EntityManager, IDatabaseDriver, Connection } from '@mikro-orm/core';
import { Request, Response } from 'express';
import { Session, SessionData } from 'express-session'

export interface CustomSessionData extends Session {
    userId: number;
    // You can add any additional data here.
  }

export type MyContext = {
    em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
    req: Request & { session: Session & Partial<SessionData> & { userId?: number } }
    res: Response;
}