import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import { gql, compose, graphql } from "urql";
import { useS3SignMutation } from "../generated/graphql";
const AmazonS3URI = require("amazon-s3-uri");

const UploadFile = () => {
  const [state, setState] = useState({
    name: "",
  });
  const [picture, setPicture] = useState("");
  const [, s3Sign] = useS3SignMutation();

  const onChange = (e) => {
    console.log(e.target.files);
    submit(e.target.files[0]);
  };

  const uploadToS3 = async (file, signedRequest) => {
    const options = {
      headers: {
        ContentType: file.type,
      },
    };
    const result = await axios.put(signedRequest, file, options);
    return result;
  };

  const formatFilename = (filename) => {
    const date = moment().format("YYYYMMDD");
    const randomString = Math.random().toString(36).substring(2, 7);
    const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const newFilename = `audio/${date}-${randomString}-${cleanFileName}`;
    return newFilename.substring(0, 60);
  };

  const submit = async (file) => {
    // console.log('state', state)
    // const { file } = state;
    const response = await s3Sign({
      filename: formatFilename(file.name),
      filetype: file.type,
    });

    const { signedRequest, url } = response.data.signS3;

    setPicture(url);

    console.log("upload file: signedrequest:::", response);
    const result = await uploadToS3(file, signedRequest);
    console.log("issa result", result);
    // const graphqlResponse = await this.props.createChampion({
    //   variables: {
    //     name,
    //     audioUrl: url
    //   }
    // });

    // this.props.history.push(
    //   `/champion/${graphqlResponse.data.createChampion.id}`
    // );
  };

  return (
    <div>
      <input
        name="thang"
        onChange={(e) => setFieldValue("file", e.target.value)}
      ></input>
      <input name="name" onChange={onChange} value={state.name} />
      <input onChange={(e) => onChange(e)} type="file" accept="image/*"></input>
      {picture !== "" ? <img src={picture}></img> : null}
    </div>
  );
};

// const CreateChampionMutation = gql`
//   mutation($name: String!, $audioUrl: String!) {
//     createChampion(name: $name, audioUrl: $pictureUrl) {
//       id
//     }
//   }
// `;

export default UploadFile;
