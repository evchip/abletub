import { Web3Storage } from "web3.storage";

  export const IPFSRequestHandler = async (defaultURL: string, fileName: string) => {
    if (fileName.startsWith("http")) {
      return fileName;
    } else {
      return await retrieve(fileName, defaultURL);
    }
  };

  const getAccessToken = () => {
    return process.env.NEXT_PUBLIC_WEB3_API_TOKEN;
  };

  const makeStorageClient = () => {
    const client = new Web3Storage({ token: getAccessToken() });
    return client;
  };

  const retrieve = async (cid: string, defaultURL: string) => {
    const client = makeStorageClient();
    const res = await client.get(cid);

    if (!res!.ok) {
      // throw new Error(`failed to get ${cid}`)
      return defaultURL;
    } else {
      const files = await res?.files();
        
      if (!files!.length) {
        return defaultURL;
      } else {
        return `https://${files![0].cid}.ipfs.dweb.link`
        
      }
    }
  };
