import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import readXlsxFile from "read-excel-file";
import styles from "../../components/layout.module.css";
import axios from "../../config/axios.config";
import nookies, { parseCookies, setCookie, destroyCookie } from "nookies";
import { useRouter } from "next/router";
import NavAdmin from "../../components/nav";
import Layout from "../../components/layout";
import Dropdown from "../../components/ui/dropdown";
import _ from "lodash";

export default function FileUpload() {
  const cookies = parseCookies();
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [fileName, setFileName] = useState("");
  const [listName, setListName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [percent, setPercent] = useState(0);
  const [excelRows, setExcelRows] = useState([]);
  const [excelColumns, setExcelColumns] = useState({});
  const [excelSampleRows, setSampleExcelRows] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [showDropDownRow1, setShowDropDownRow1] = useState(false);
  const [selectRow1Value, setSelectRow1Value] = useState("");

  const [showDropDownRow2, setShowDropDownRow2] = useState(false);
  const [selectRow2Value, setSelectRow2Value] = useState("");

  const [showDropDownRow3, setShowDropDownRow3] = useState(false);
  const [selectRow3Value, setSelectRow3Value] = useState("");

  const [showDropDownRow4, setShowDropDownRow4] = useState(false);
  const [selectRow4Value, setSelectRow4Value] = useState("");

  const [showDropDownRow5, setShowDropDownRow5] = useState(false);
  const [selectRow5Value, setSelectRow5Value] = useState("");

  const [showDropDownRow6, setShowDropDownRow6] = useState(false);
  const [selectRow6Value, setSelectRow6Value] = useState("");

  const [showDropDownRow7, setShowDropDownRow7] = useState(false);
  const [selectRow7Value, setSelectRow7Value] = useState("");
  const [showCustomField, setShowCustomField] = useState(false);

  const [fieldToRemove, setFieldToRemove] = useState([]);
  const [customFieldValue, setCustomFieldValue] = useState("");
  const [customColumns, setCustomColumns] = useState([
    { column: 1, value: "" },
    { column: 2, value: "" },
    { column: 3, value: "" },
    { column: 4, value: "" },
    { column: 5, value: "" },
    { column: 6, value: "" },
    { column: 7, value: "" },
    { column: 8, value: "" },
    { column: 9, value: "" },
    { column: 10, value: "" },
    { column: 11, value: "" },
    { column: 12, value: "" },
  ]);

  const changeHandler = async (event) => {
    console.log("selected files: ", event.target.files);
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
    const xlsRows = await readXlsxFile(event.target.files[0]);
    setSampleExcelRows(_.slice(xlsRows, 0, 3));
    setExcelRows(xlsRows);
    setShowModal(true);
  };

  const fileNameHandler = async (e) => {
    setFileName(e.target.value);
  };

  const listNameHandler = async (e) => {
    setListName(e.target.value);
  };

  const handlePushFieldToRemove = (field) => {
    const fieldsToRemove = [...fieldToRemove];
    console.log(fieldsToRemove);
    fieldsToRemove.push(field);
    setFieldToRemove(fieldsToRemove);
  };

  const handleSubmit = async (e) => {
    const cookies = parseCookies();
    e.preventDefault();
    setIsUploading(true);
    console.log("!@#!@#!#: fileName", fileName);
    const formData = new FormData();
    formData.append("files", selectedFile);
    console.log("formData: ", formData);
    // const uploadedData = await axios.post("/upload", formData, {
    //   headers: { "Content-Type": "multipart/form-data",  'Authorization': 'Bearer ' + cookies.userData},
    // });

    // console.log("uploadedData: ", uploadedData);
    const columns = customColumns;
    console.log(JSON.stringify({ ...excelRows }));

    await axios
      .post(
        "/uploads",
        {
          filename: _.snakeCase(fileName),
          list_name: _.snakeCase(listName),
          excelrows: excelRows,
          excelcolumns: columns,
        },
        { headers: { Authorization: "Bearer " + cookies.userData } }
      )
      .catch((e) => console.log(e));
    setSelectedFile(null);
    setExcelColumns({});
    setFieldToRemove([]);
    setSelectRow1Value("");
    setSelectRow2Value("");
    setSelectRow3Value("");
    setSelectRow4Value("");
    setSelectRow5Value("");
    setSelectRow6Value("");
    setSelectRow7Value("");
    setCustomColumns([
      { column: 1, value: "" },
      { column: 2, value: "" },
      { column: 3, value: "" },
      { column: 4, value: "" },
      { column: 5, value: "" },
      { column: 6, value: "" },
      { column: 7, value: "" },
      { column: 8, value: "" },
      { column: 9, value: "" },
      { column: 10, value: "" },
      { column: 11, value: "" },
      { column: 12, value: "" },
    ]);
    setShowModal(false);

    // ,
    //   {
    //     onUploadProgress: (event) => {
    //       const percentage = Math.round((event.loaded / event.total) * 100);
    //       console.log("percentage: ", percentage);
    //       setPercent(percentage);
    //       if (percentage === 100) {
    //         setIsUploading(false);
    //         // router.push("/");
    //       }
    //     },
    //   }
  };

  const handCustomField = async (index, value) => {
    const customFieldValue = [...customColumns];
    customFieldValue[index].value = _.trim(value).toLowerCase();
    setCustomColumns(customFieldValue);
    console.log("customFieldValue: ", customFieldValue);
  };

  const handCustomFieldText = async (index, value) => {
    const customFieldValue = [...customColumns];
    customFieldValue[index].value = _.trim(value).toLowerCase();
    setCustomColumns(customFieldValue);
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
                    <input type="file" onChange={changeHandler} disabled={fileName === "" || listName === "" ? true : false} />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        {/* END UPLOAD FORM */}

        <div
          className={showModal ? "modal fade show" : ""}
          id="modal-lg"
          style={{
            display: showModal ? "block" : "none",
            paddingRight: "17px",
          }}
          aria-modal="true"
          role="dialog">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Upload Contact Records</h4>
                <button
                  onClick={() => setShowModal(false)}
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header">
                        <h3 className="card-title">RECIPIENT LIST</h3>
                        <br />
                        {fieldToRemove.length > 0 ? (
                          <button
                            className="btn btn-warning"
                            onClick={() => {
                              setFieldToRemove([]);
                              setSelectRow1Value("");
                              setSelectRow2Value("");
                              setSelectRow3Value("");
                              setSelectRow4Value("");
                              setSelectRow5Value("");
                              setSelectRow6Value("");
                              setSelectRow7Value("");
                            }}>
                            Clear Row Selected
                          </button>
                        ) : null}
                      </div>

                      <div className="card-body table-responsive p-0">
                        <table className="table table-hover text-nowrap">
                          <thead>
                            <tr>
                              {excelSampleRows.length > 0
                                ? excelSampleRows[0].map((row, i) => {
                                    const index = i + 1;
                                    let excelColumns = { ...excelColumns };
                                    let setSelectRowValue = setSelectRow1Value;
                                    let selectedRowValue = selectRow1Value;
                                    let setShowDropDownRow = setShowDropDownRow1;
                                    let showDropDownRow = showDropDownRow1;

                                    switch (index) {
                                      case 1:
                                        setSelectRowValue = setSelectRow1Value;
                                        selectedRowValue = selectRow1Value;
                                        setShowDropDownRow = setShowDropDownRow1;
                                        showDropDownRow = showDropDownRow1;

                                        break;
                                      case 2:
                                        setSelectRowValue = setSelectRow2Value;
                                        selectedRowValue = selectRow2Value;
                                        setShowDropDownRow = setShowDropDownRow2;
                                        showDropDownRow = showDropDownRow2;
                                        break;
                                      case 3:
                                        setSelectRowValue = setSelectRow3Value;
                                        selectedRowValue = selectRow3Value;
                                        setShowDropDownRow = setShowDropDownRow3;
                                        showDropDownRow = showDropDownRow3;
                                        break;
                                      case 4:
                                        setSelectRowValue = setSelectRow4Value;
                                        selectedRowValue = selectRow4Value;
                                        setShowDropDownRow = setShowDropDownRow4;
                                        showDropDownRow = showDropDownRow4;
                                        break;
                                      case 5:
                                        setSelectRowValue = setSelectRow5Value;
                                        selectedRowValue = selectRow5Value;
                                        setShowDropDownRow = setShowDropDownRow5;
                                        showDropDownRow = showDropDownRow5;
                                        break;
                                      case 6:
                                        setSelectRowValue = setSelectRow6Value;
                                        selectedRowValue = selectRow6Value;
                                        setShowDropDownRow = setShowDropDownRow6;
                                        showDropDownRow = showDropDownRow6;
                                        break;
                                      case 7:
                                        setSelectRowValue = setSelectRow7Value;
                                        selectedRowValue = selectRow7Value;
                                        setShowDropDownRow = setShowDropDownRow7;
                                        showDropDownRow = showDropDownRow7;
                                        break;
                                    }

                                    return (
                                      <th>
                                        {selectedRowValue !== "custom" ? (
                                          <Dropdown
                                            key={i + 1}
                                            row={i + 1}
                                            index={i}
                                            setFieldToRemove={setFieldToRemove}
                                            setSelectRowValue={
                                              setSelectRowValue
                                            }
                                            selectedRowValue={selectedRowValue}
                                            setShowDropDownRow={
                                              setShowDropDownRow
                                            }
                                            setShowCustomField={
                                              setShowCustomField
                                            }
                                            setCustomFieldValue={
                                              handCustomFieldText
                                            }
                                            showDropDownRow={showDropDownRow}
                                            fieldToRemove={fieldToRemove}
                                            handlePushFieldToRemove={
                                              handlePushFieldToRemove
                                            }
                                          />
                                        ) : (
                                          <>
                                            <input
                                              key={i + 1}
                                              type="text"
                                              value=""
                                              className="form-group"
                                              onChange={(e) =>
                                                handCustomField(
                                                  i,
                                                  e.target.value
                                                )
                                              }
                                              value={customColumns[i].value}
                                            />{" "}
                                            <a
                                              style={{
                                                color: "red",
                                                cursor: "pointer",
                                              }}
                                              onClick={() =>
                                                setSelectRowValue("")
                                              }>
                                              X
                                            </a>
                                          </>
                                        )}
                                      </th>
                                    );
                                  })
                                : null}
                            </tr>
                          </thead>
                          <tbody>
                            {excelSampleRows.map((row, i) => (
                              <tr>
                                <td>{row[0]}</td>
                                <td>{row[1]}</td>
                                <td>{row[2]}</td>
                                <td>{row[3]}</td>
                                <td>{row[4]}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer justify-content-between">
                <button
                  onClick={() => setShowModal(false)}
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal">
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(e) => handleSubmit(e)}>
                  Save changes and Upload
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={showModal ? "modal-backdrop fade show" : null}></div>
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
