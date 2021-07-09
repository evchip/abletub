import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import microConfig from './mikro-orm.config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import { __prod__ } from './constants';
import { MyContext } from "./types";
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cors from 'cors';



const main = async () => {

    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();

    const app = express();

    const RedisStore = connectRedis(session)
    const redisClient = redis.createClient()
    
    app.use(
        cors({
        origin: 'http://localhost:3000',
        credentials: true
    }))

    app.use(
        session({
            name: "qid",
            store: new RedisStore({ 
                client: redisClient,
                disableTouch: true,
            }),
            cookie: {
                maxAge: 1000 * 60 * 24 * 365 * 10, // 10 years
                httpOnly: true,
                sameSite: "lax", //csrf
                secure: __prod__, // cookie only works in https
            },
            saveUninitialized: true,
            secret: "ghsggjjjjjffgggfkkkkkkker",
            resave: false,
        })
    );

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver, UserResolver],
            validate: false
        }),
        context: ({ req, res }) => ({ em: orm.em, req, res })
    });

    apolloServer.applyMiddleware({ 
        app, 
        cors: false
    });

    app.listen(process.env.PORT || 4000, () => {
    console.log("Node server started");
})
    //const post2 = orm.em.create(Post, {title: 'first post'});
    // await orm.em.persistAndFlush(post2);
    // const posts = await orm.em.find(Post, {});
    // console.log(posts);
}

main().catch((err) => {
    console.log(err)
})
