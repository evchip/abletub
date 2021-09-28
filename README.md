# abletub - a music distribution platform built on IPFS

**abletub** is a music sharing platform that stores files on the Inter-Planetary File Storage Network (IPFS): a decentralized network protocol for storing and sharing data in a distributed file system. IPFS uses content-addressing to uniquely identify each file in a global namespace connecting all computing devices.

![Sample Image](https://i.imgur.com/kApR6z3.png[/img])

## Front End Stack
React, GraphQL, Chakra UI, NextJS, Apollo-Client, React-Soundplayer
Deployed on Vercel

## Back End Stack
PostgresQL, Redis, TypeORM, Express, Apollo Server, Express
Deployed with a Dokku container


## Get Started
Install dependencies for server and web directories
```
$ yarn install
```

Create your Postgres database

Create your Redis store

Create a .env file at the root of your server directory and add your own variables (Reference the .env.example file).

In the server directory, run:
```
$ yarn watch
```

then run:
```
$ yarn dev
```

In the web directory, run:
```
$ yarn dev
```



