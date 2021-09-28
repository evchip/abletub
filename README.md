# **[a b l e t u b](https://abletub.live/)** - a music distribution platform built on IPFS

**abletub.live** is a music sharing platform that stores files on the Inter-Planetary File Storage Network ([IPFS](https://ipfs.io/ "IPFS")): a decentralized network protocol for storing and sharing data in a distributed file system. **a b l e t u b** allows users to create an immutable content address that can be stored by any node on the IPFS network, including themselves, you, and me! This method of networking and storage provides several critical benefits:
 - facilitates a theoretically eternal method of data persistence, provided that nodes on the IPFS network continue to pin the data.
 - creates an immutable record of when an artist uploaded a track, providing evidence for copyright disputes.
 - helps fortify and decentralize the web by increasing the number of nodes serving content. With IPFS, we can all be servers.

![Front Page](https://i.imgur.com/kApR6z3.png[/img])

## File Storage
**a b l e t u b** uses [web3.storage](https://web3.storage/), an IPFS [pinning service](https://docs.ipfs.io/how-to/work-with-pinning-services/) provided by Protocol Labs. When users upload their files, **a b l e t u b** sends an upload request to web3.storage, then receieves back a content identifier (CID): a unique address that points to an immutable piece of data. The user's files are sent to nodes on the IPFS network, who store the files and index them under that CID. When the user requests this data, abletub uses that unique CID to send a request to all nodes on the network. When the node storing that data receives the request, it delivers the packets via the CDN provided by web3.storage.

## Front End
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/) 
- [GraphQL](https://graphql.org/) 
- [Type-GraqhQL](https://typegraphql.com/) 
- [Apollo-Client](https://www.apollographql.com/docs/react/) 
- [Chakra UI](https://chakra-ui.com/) 
- [NextJS](https://nextjs.org/) 
- [React-Soundplayer](https://github.com/kosmetism/react-soundplayer)
- Hosted on [Vercel](https://vercel.com/)

## Back End
- [PostgresQL](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- [TypeORM](https://typeorm.io/#/)
- [Express](https://expressjs.com/)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- Deployed with [Dokku](https://dokku.com/) & [Docker](https://www.docker.com/)
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



