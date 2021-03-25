import Head from "next/head";
import { useState } from "react";
import styles from "../../components/layout.module.css";
import axios from "../../config/axios.config";
import nookies, { parseCookies, setCookie, destroyCookie } from "nookies";
export default function FileUpload() {
  const cookies = parseCookies();
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [fileName, setFileName] = useState("");
  const [listName, setListName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [percent, setPercent] = useState(0);
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
    console.log("selectedFile: ", event.target.files[0]);
  };

  const fileNameHandler = async (e) => {
    setFileName(e.target.value);
  };

  const listNameHandler = async (e) => {
    setListName(e.target.value);
  };

  const handleSubmit = async () => {
    setIsUploading(true);
    console.log("!@#!@#!#: fileName", fileName);
    const formData = new FormData();
    formData.append("files", selectedFile);

    const uploadedData = await axios.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("uploadedData: ", uploadedData);

    await axios
      .post(
        "/uploads",
        {
          filename: fileName,
          list_name: listName,
          spreadsheet: uploadedData.data,
        },
        {
          onUploadProgress: (event) => {
            const percentage = Math.round((event.loaded / event.total) * 100)
            console.log("percentage: ", percentage);
            setPercent(percentage);
            if (percentage === 100) {
              setIsUploading(false);
            }
          },
        }
      )
      .catch((e) => console.log(e));
  };
  return (
    <>
      <Head>
        <title> SMS Filtering System </title>{" "}
        <link rel="icon" href="/favicon.ico" />
      </Head>{" "}
      <div className={styles.container}>
        <h1>
          {" "}
          {isUploading
            ? "Uploading... " + percent + "%"
            : percent === 100
            ? "File Uploaded successfully!"
            : "Upload file!"}{" "}
        </h1>{" "}
        <br />
        <input
          type="text"
          onChange={fileNameHandler}
          name="filename"
          placeholder="File Name"
        />
        &nbsp;
        <input
          onChange={listNameHandler}
          type="text"
          name="listname"
          placeholder="List Name"
        />{" "}
        <br />
        <input type="file" onChange={changeHandler} />{" "}
        <button onClick={handleSubmit}>Upload</button>
      </div>{" "}
    </>
  );
}
