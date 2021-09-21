import { Box, Input, Text } from "@chakra-ui/react";
import React, { ReactElement, useState, useContext } from "react";
import { FormContext } from "../../pages/upload-post";
import { Web3Storage } from "web3.storage";
import * as Yup from "yup";
import { useField } from "formik";

interface Props {}

function ImageForm({}: Props): ReactElement {
  const [CIDAddress, setCIDAddress] = useState("");
  const [trackName, setTrackName] = useState("");
  const [field, meta, helper] = useField("");
  const { setValue } = helper;
  // const { setValue } = useContext(FormContext);

  const PostSchema = Yup.object().shape({
    audioFileSize: Yup.number()
      .min(1, "please upload a file.")
      .max(50000000, "file is too large. max size is 50 MB.")
      .required("required"),
    imageFileSize: Yup.number()
      .min(1, "please upload a file.")
      .max(15000000, "file is too large. max size is 12 MB.")
      .required("required"),
  });

  // IPFS
  const uploadToIPFS = async (files: File[]) => {
    const getAccessToken = () => {
      return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGY5RGIxZDcwNzI2NjBCNjM4YjI0QWIwQjFGOEQ5OGFGZWNhZTlERUYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2MzIxNjk0NTI3NjcsIm5hbWUiOiJhYmxldHViIn0.fFhf0CfKqDOST6pADwgrffCz4P2AU5_FwmLOcMcxws4" as string;
    };

    const makeStorageClient = () => {
      const client = new Web3Storage({ token: getAccessToken() });
      return client;
    };

    const storeFiles = async (files: File[]) => {
      const client = makeStorageClient();
      console.log("client", client);
      const cid = await client.put(files);
      console.log("stored files with cid:", cid);
      setCIDAddress(cid);
      return cid;
    };

    const result = await storeFiles(files);
    return result;
  };

  const makeFileObjects = async (uploads: FileList | null) => {
    console.log("uploads", uploads);

    if (uploads) {
      return await uploads[0].arrayBuffer().then((res) => {
        const blob = new Blob([new Uint8Array(res)], { type: "file" });
        console.log("blob", blob);
        const files = [
          new File(["contents-of-file-1"], "plain-utf8.txt"),
          new File([blob], uploads[0].name),
        ];
        const CID = uploadToIPFS(files);
        return CID;
      });
    } else {
      return null;
    }
  };

  return (
    <Box mt="4">
      <Text>upload track ({"<"} 50 mb)</Text>
      <Input
        onChange={async (e) => {
          const CIDAddress = await makeFileObjects(e.target.files);

          if (e!.target!.files![0]) {
            setTrackName(e!.target!.files![0].name!);
            console.log("cid address", CIDAddress);
            setValue(CIDAddress as string);
          }
        }}
        setValue={setValue}
        name="audio"
        id="file"
        className="audio-file"
        type="file"
        accept=".mp3"
        mt={2}
      />
      <Text>{trackName}</Text>
    </Box>
  );
}

export default ImageForm;
