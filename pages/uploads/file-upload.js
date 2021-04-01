import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import styles from "../../components/layout.module.css";
import axios from "../../config/axios.config";
import nookies, { parseCookies, setCookie, destroyCookie } from "nookies";
import { useRouter } from "next/router";
import NavAdmin from "../../components/nav";
import Layout from "../../components/layout";

export default function FileUpload() {
  const cookies = parseCookies();
  const router = useRouter();
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

  const handleSubmit = async (e) => {
    const cookies = parseCookies();
    e.preventDefault();
    setIsUploading(true);
    console.log("!@#!@#!#: fileName", fileName);
    const formData = new FormData();
    formData.append("files", selectedFile);

    const uploadedData = await axios.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data",  'Authorization': 'Bearer ' + cookies.userData},
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
            const percentage = Math.round((event.loaded / event.total) * 100);
            console.log("percentage: ", percentage);
            setPercent(percentage);
            if (percentage === 100) {
              setIsUploading(false);
              router.push("/");
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
      <NavAdmin />
      <Layout>
        <div className="card card-primary">
          <div className="card-header">
            <h3 className="card-title">Upload Record</h3>
          </div>

          <form>
            <div className="card-body">
              {isUploading ? (
                <div className="progress">
                  <div
                    className="progress-bar"
                    style={{ width: `${percent}%` }}></div>
                </div>
              ) : null}

              <div className="form-group">
                <label htmlFor="exampleInputEmail1">File Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  onChange={fileNameHandler}
                  placeholder="E.g Filename-year-month-date"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">List Name</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={listNameHandler}
                  id="exampleInputPassword1"
                  placeholder="List name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputFile">XLSX file</label>
                <div className="input-group">
                  <div className="custom-file">
                    {/* <input
                      type="file"
                      className="custom-file-input"
                      id="exampleInputFile"
                      onChange={changeHandler}
                    /> */}
                    <input type="file" onChange={changeHandler} />
                  </div>
                  <div className="input-group-append">
                    <span className="input-group-text">Upload</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-footer">
              <button onClick={handleSubmit} className="btn btn-primary">
                Upload
              </button>
            </div>
          </form>
        </div>
        {/* END UPLOAD FORM */}
        {/* <div className={styles.container}>
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
        </div>{" "} */}
      </Layout>
    </>
  );
}
