import { Web3Storage } from "web3.storage";

  export const IPFSRequestHandler = async (defaultURL: string, fileName: string) => {
    if (fileName.startsWith("http")) {
      return fileName;
    } else {
      const CIDURL = await retrieve(fileName, defaultURL);
      console.log('CIDURL::::', CIDURL)
      return CIDURL;
    }
  };

  const getAccessToken = () => {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGY5RGIxZDcwNzI2NjBCNjM4YjI0QWIwQjFGOEQ5OGFGZWNhZTlERUYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2MzIxNjk0NTI3NjcsIm5hbWUiOiJhYmxldHViIn0.fFhf0CfKqDOST6pADwgrffCz4P2AU5_FwmLOcMcxws4" as string;
  };

  const makeStorageClient = () => {
    const client = new Web3Storage({ token: getAccessToken() });
    return client;
  };

  const retrieve = async (cid: string, defaultURL: string) => {
    const client = makeStorageClient();
    const res = await client.get(cid);
    if (!res!.ok) {
      //   throw new Error(`failed to get ${cid}`)
      return defaultURL;
    } else {
      const files = await res?.files();
        
      if (!files!.length) {
          console.log('no files!!!!!!!!!!!!!')
        return defaultURL;
      } else {
        console.log('files in fetch', files[0])
        return `https://${files[0].cid}.ipfs.dweb.link`
        
      }
    }
  };
