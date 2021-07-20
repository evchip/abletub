import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import Redis from 'ioredis';
import path from "path";
import "reflect-metadata";
import "dotenv-safe/config";
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { COOKIE_NAME, __prod__ } from './constants';
import { _Post as Post } from "./entities/Post";
import { Updoot } from "./entities/Updoot";
import { User } from "./entities/User";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import { createUpvoteLoader } from "./utils/createUpvoteLoader";
import { createUserLoader } from "./utils/createUserLoader";


const main = async () => {
    const conn = await createConnection({
        type: "postgres",
        url: process.env.DATABASE_URL,
        logging: true,
        synchronize: true,
        migrations: [path.join(__dirname, "./migrations/*")],
        entities: [Post, User, Updoot]
    });
    
    // await User.delete({});
    await conn.runMigrations();

    const app = express();
    
    // await Post.delete({});
    const RedisStore = connectRedis(session)
    const redis = new Redis();
    app.use(
        cors({
        origin: 'http://localhost:3000',
        credentials: true
    }));

    app.use(
        session({
            name: COOKIE_NAME,
            store: new RedisStore({ 
                client: redis,
                disableTouch: true,
            }),
            cookie: {
                maxAge: 1000 * 60 * 24 * 365 * 10, // 10 years
                httpOnly: true,
                sameSite: "lax", //csrf
                secure: __prod__, // cookie only works in https
            },
            saveUninitialized: false,
            secret: "foo",
            resave: false,
        })
    );

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver, UserResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ 
            req,
            res,
            redis,
            userLoader: createUserLoader(),
            updootLoader: createUpvoteLoader()
        }),
    });

    apolloServer.applyMiddleware({ 
        app, 
        cors: false
    });

    app.listen(process.env.PORT || 4000, () => {
    console.log("Node server started");

    });
};

main().catch((err) => {
    console.log('err::::', err)
})
