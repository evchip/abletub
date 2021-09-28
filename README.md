# **[a b l e t u b](https://abletub.live/)** - a music distribution platform built on IPFS

**abletub.live** is a music sharing platform that stores files on the Inter-Planetary File Storage Network ([IPFS](https://ipfs.io/ "IPFS")): a decentralized network protocol for storing and sharing data in a distributed file system. **a b l e t u b** allows users to create an immutable content address that can be stored by any node on the IPFS network, including themselves, you, and me! This method of networking and storage provides several critical benefits:
 - facilitates a theoretically eternal method of data persistence, provided that nodes on the IPFS network continue to pin the data.
 - creates an immutable record of when an artist uploaded a track, providing evidence for copyright disputes.
 - helps fortify and decentralize the web by increasing the number of nodes serving content. With IPFS, we can all be servers.

![Front Page](https://i.imgur.com/kApR6z3.png[/img])

## File Storage
**a b l e t u b** uses [web3.storage](https://web3.storage/), an IPFS [pinning service](https://docs.ipfs.io/how-to/work-with-pinning-services/) provided by Protocol Labs. When users upload their files, **a b l e t u b** sends an upload request to web3.storage, then receieves back a content identifier (CID): a unique address that points to an immutable piece of data. The user's files are sent to nodes on the IPFS network, who store the files and index them under that CID. When the user requests this data, abletub uses that unique CID to send a request to all nodes on the network. When the node storing that data receives the request, it delivers the packets via the CDN provided by web3.storage.

## Front End
- [TypeScript 4.4.2](https://www.typescriptlang.org/)
- [React 17.0.2](https://reactjs.org/) 
- [GraphQL 15.6.0](https://graphql.org/) 
- [Apollo-Client 3.4.14](https://www.apollographql.com/docs/react/) 
- [Chakra UI 1.6.8](https://chakra-ui.com/) 
- [NextJS 11.0.1](https://nextjs.org/) 
- [React-Soundplayer 1.0.5](https://github.com/kosmetism/react-soundplayer)
- Hosted on [Vercel 23](https://vercel.com/)

## Back End
- [PostgresQL 13.4](https://www.postgresql.org/)
- [Redis 6.2.5](https://redis.io/)
- [Type-GraqhQL 1.1.1](https://typegraphql.com/) 
- [TypeORM 0.2.34](https://typeorm.io/#/)
- [Express 4.17.1](https://expressjs.com/)
- [Apollo Server 2.25.1](https://www.apollographql.com/docs/apollo-server/)
- Deployed with [Dokku](https://dokku.com/) VPS & [Docker](https://www.docker.com/)
- Hosted on [Digital Ocean](https://www.digitalocean.com/)


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



