import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "../config/axios.config";
import nookies, { parseCookies, setCookie, destroyCookie } from "nookies";
import NavAdmin from "../components/nav";
import Layout from "../components/layout";
import { useEffect, useState } from "react";

function Home({ uploads }) {
  const router = useRouter();
  const cookies = parseCookies();
  const [deleteReport, setDeleteReport] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [uploadLists, setUploadLists] = useState(uploads);
  const [deleteId, setDeleteId] = useState(0);
  const [downloading, setDownloading] = useState(false);
  let confirm = showConfirm ? "show" : null;
  const fileDownload = require('js-file-download');
  async function removeReportHandler() {
    const reports = uploadLists.filter((item) => item.id !== deleteId);
    setUploadLists(reports);
    axios.delete("/uploads/"+deleteId, {
      headers: { Authorization: "Bearer " + cookies.userData },
    })
    setShowConfirm(false);
  }

  async function downloadReport(e,id,fileName) {
    e.preventDefault();
    setDownloading(true)
    return await axios.get("/downloads?id="+id,{
      responseType:"blob"
    }).then((res) => {
      fileDownload(res.data, fileName + ".xlsx")
      setDownloading(false)
    }) 
  }
  useEffect(() => {});

  return (
    <>
      <Head>
        <title>SMS Filtering System</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavAdmin />
      <Layout>
        <div
          className={["modal", "fade", confirm].join(" ")}
          id="modal-success"
          style={{ display: confirm ? "block" : "none", paddingRight: "17px" }}
          aria-modal="true"
          role="dialog">
          <div className="modal-dialog">
            <div className="modal-content bg-success">
              <div className="modal-header">
                <h4 className="modal-title">
                  Are you sure you want to delete it?
                </h4>
                <button
                  onClick={() => setShowConfirm(false)}
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close">
                  <span aria-hidden="true">??</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  Deleting this will also delete contacts,
                  <br /> kindly confirm to proceed.
                </p>
              </div>
              <div className="modal-footer justify-content-between">
                <button
                  onClick={() => setShowConfirm(false)}
                  type="button"
                  className="btn btn-outline-light"
                  data-dismiss="modal">
                  Close
                </button>
                <button
                  onClick={removeReportHandler}
                  type="button"
                  className="btn btn-outline-light">
                  Delete Report
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="card" style={{ paddingTop: "2%" }}>
          <div className="card-header">
            <h3 className="card-title">Clean Records</h3>
          </div>

          <div className="card-body">
            {uploadLists.length > 0 ? (
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th style={{ width: "10px" }}>#</th>
                    <th>File Name</th>
                    <th>Entries Count</th>
                    <th style={{ width: "250px" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {uploadLists.map((file, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>
                        <Link href={`/messages/${file.id}`}>
                          <a>{file.filename}</a>
                        </Link>
                      </td>
                      <td>
                        <Link href={`/messages/${file.id}`}>
                          <a>{Array.isArray(file.messages) ? file.messages.length : 0}</a>
                        </Link>
                      </td>
                      <td>
                       
                          <a style={{cursor:"pointer"}} onClick={(e) => downloadReport(e,file.id,file.filename + "_" + file.messages.length) }>
                            <span className={downloading ? "badge bg-info" : "badge bg-warning"}>
                              {downloading ? "Downloading..." : "Download Report"}
                            </span>
                          </a>
                   
                        &nbsp;
                        <Link href="/">
                          <a>
                            <span
                              onClick={() => {
                                setShowConfirm(true);
                                setDeleteId(file.id);
                              }}
                              className="badge bg-danger">
                              Delete Report
                            </span>
                          </a>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <center>
                <Link href="/uploads/file-upload">
                  <button type="button" class="btn btn-info toastsDefaultInfo">
                    Upload New Record
                  </button>
                </Link>
              </center>
            )}
          </div>
        </div>
        <div
          style={{ display: confirm ? "block" : "none" }}
          className={["modal-backdrop", "fade", confirm].join(" ")}></div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  let res = [];
  let error = 0;
  console.log("cookies: ", cookies );



  try {
    const uploads = await axios.get("/uploads", {
      headers: { Authorization: "Bearer " + cookies.userData },
    });

    res = uploads.data;
  } catch (e) {
    error = 1;
    console.log("error ", e.data);
  }

  if (error === 0) {
    return { props: { uploads: res } };
  } else {
    console.log ("res: ", res.data)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {props: {uploads: ""}}
}
export default Home;
