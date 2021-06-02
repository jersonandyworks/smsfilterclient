import Link from "next/link";
import axios from "../../config/axios.config";
import nookies, { parseCookies, setCookie, destroyCookie } from "nookies";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NavAdmin from "../../components/nav";
import Layout from "../../components/layout";
import _ from "lodash";
const Messages = ({ uploads }) => {
  const [pid, setId] = useState(1);
  const [messages, setMessages] = useState(uploads.messages);
  const [searchType, setSearchType] = useState();
  const [inputType, setInputType] = useState("text");
  const [isSearchDisabled, setSearchDisabled] = useState(true);
  const [showLimitButton, setShowLimitButton] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showUncleanList, setShowUncleanList] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    setId(id);
  });

  const searchKeywordHandler = (e) => {
    setSearchValue(e.target.value);
    console.log(showUncleanList);
    const searchValue = e.target.value;
    let results = [];
    if (searchType !== "limit") {
      if (showUncleanList === false) {
        let searchResults = uploads.messages.filter(({ firstname }) =>
          new RegExp(`(^${searchValue})`, "g").test(firstname)
        );
        switch (searchType) {
          case "firstname":
            searchResults = uploads.messages.filter(({ firstname }) =>
              new RegExp(`(^${searchValue})`, "g").test(firstname)
            );
            break;
          case "lastname":
            searchResults = uploads.messages.filter(({ lastname }) =>
              new RegExp(`(^${searchValue})`, "g").test(lastname)
            );
            break;
          case "contact_phone":
            searchResults = uploads.messages.filter(({ contact_phone }) =>
              new RegExp(`(^${searchValue})`, "g").test(contact_phone)
            );

          default:
            searchResults = uploads.messages.filter(({ firstname }) =>
              new RegExp(`(^${searchValue})`, "g").test(firstname)
            );
            break;
        }
        if (searchValue === "") {
          searchResults = uploads.messages;
        }
        results = searchResults;
      } else {
        console.log("~~~~~~~~");
        let searchResults = uploads.dirtymessages.filter(({ firstname }) =>
          new RegExp(`(^${searchValue})`, "g").test(firstname)
        );
        switch (searchType) {
          case "firstname":
            searchResults = uploads.dirtymessages.filter(({ firstname }) =>
              new RegExp(`(^${searchValue})`, "g").test(firstname)
            );
            break;
          case "lastname":
            searchResults = uploads.dirtymessages.filter(({ lastname }) =>
              new RegExp(`(^${searchValue})`, "g").test(lastname)
            );
            break;
          case "contact_phone":
            searchResults = uploads.dirtymessages.filter(({ contact_phone }) =>
              new RegExp(`(^${searchValue})`, "g").test(contact_phone)
            );

          default:
            searchResults = uploads.dirtymessages.filter(({ firstname }) =>
              new RegExp(`(^${searchValue})`, "g").test(firstname)
            );
            break;
        }
        if (searchValue === "") {
          searchResults = uploads.dirtymessages;
        }
        results = searchResults;
      }
    } else {
      results = messages.slice(0, searchValue);
    }

    setMessages(results);
  };
  const selectTypeHandler = async (e) => {
    setSearchValue("");
    setShowLimitButton(false);
    switch (e.target.value) {
      case "contact_phone":
        setInputType("number");
        break;
      case "email":
        setInputType("email");
        break;
      case "url":
        setInputType("url");
        break;
      case "limit":
        setShowLimitButton(true);
        break;
      default:
        setInputType("text");
        break;
    }
    setSearchType(e.target.value);
    setSearchDisabled(e.target.value == "default" ? true : false);
  };

  const getResultSort = (type) => {
    let messages = [...uploads.messages];
    switch (type) {
      case "lastname":
        messages = messages.sort((a, b) =>
          a.lastname.localeCompare(b.lastname)
        );
        break;
      case "firstname":
        messages = messages.sort((a, b) =>
          a.firstname.localeCompare(b.firstname)
        );
        break;
      case "contact":
        messages = messages.sort((a, b) => a.contact.localeCompare(b.contact));
        break;
      case "phone":
        messages = messages.sort((a, b) => a.phone.localeCompare(b.phone));
      case "url":
        messages = messages.sort((a, b) => a.url.localeCompare(b.url));
        break;
      case "link":
        messages = messages.sort((a, b) => a.link.localeCompare(b.link));
        break;
      case "website":
        messages = messages.sort((a, b) => a.website.localeCompare(b.website));
        break;
    }

    return messages;
  };

  const showUncleanListHandler = () => {
    setShowUncleanList(!showUncleanList);
    if (!showUncleanList) {
      setMessages(uploads.dirtymessages);
    } else {
      setMessages(uploads.messages);
    }
  };

  const sortByHandler = async (type) => {
    const results = getResultSort(type);
    setMessages(results);
  };

  const submitLimit = (e) => {
    e.preventDefault();
    setMessages(messages.slice(0, searchValue));
  };
  const submitClear = async (e) => {
    e.preventDefault();
    setMessages(uploads.messages);
    setSearchValue("");
    setSearchType("default");
    setSearchDisabled(true);
  };
  return (
    <>
      <NavAdmin />
      <Layout>
        <div className="card" style={{ paddingTop: "2%" }}>
          <div className="card-header">
            <div className="row">
              <div className="col-md-6">
                <h3 className="card-title">Clean Records</h3>
                &nbsp;
                <Link href="/">
                  <a>&laquo; Back</a>
                </Link>
                &nbsp;
              </div>
              <div className="col-md-6">
                <form className="form-inline">
                  <div className="form-group">
                    <select
                      className="form-control"
                      onChange={selectTypeHandler}
                      value={searchType}>
                      <option value="default">Search Type</option>
                      <option value="firstname">First Name</option>
                      <option value="lastname">Lastname</option>
                      <option value="contact_phone">Contact / Phone </option>
                      <option value="email">Email</option>
                      <option value="address">Address</option>
                      <option value="url">URL</option>
                      <option value="limit">Limit Results</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ marginLeft: "5px" }}>
                    <input
                      type={inputType}
                      className="form-control"
                      placeholder="Search keyword"
                      disabled={isSearchDisabled}
                      onChange={searchKeywordHandler}
                      value={searchValue}
                    />
                  </div>
                  {showLimitButton ? (
                    <button
                      type="submit"
                      onClick={submitLimit}
                      className="btn btn-primary"
                      style={{ marginLeft: "5px" }}>
                      Limit
                    </button>
                  ) : (
                    <button
                      type="submit"
                      onClick={submitClear}
                      className="btn btn-primary"
                      style={{ marginLeft: "5px" }}>
                      Clear Filter
                    </button>
                  )}
                  <div class="checkbox" style={{ marginLeft: "20px" }}>
                    <label>
                      <input
                        type="checkbox"
                        defaultChecked={showUncleanList}
                        onChange={showUncleanListHandler}
                      />{" "}
                      &nbsp; Show unclean records
                    </label>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="card-body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th style={{ width: "10px" }}>#</th>
                  <th>
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        sortByHandler(uploads.column.custom_column_one)
                      }>
                      {uploads.column.custom_column_one}{" "}
                      <i className="fas fa-sort"></i>
                    </a>
                  </th>
                  <th>
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        sortByHandler(uploads.column.custom_column_two)
                      }>
                      {uploads.column.custom_column_two}{" "}
                      <i className="fas fa-sort"></i>
                    </a>
                  </th>
                  <th style={{ width: "100px" }}>
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        sortByHandler(uploads.column.custom_column_three)
                      }>
                      {uploads.column.custom_column_three}{" "}
                      <i className="fas fa-sort"></i>
                    </a>
                  </th>
                  {uploads.column.custom_column_four !== null ? (
                    <th style={{ width: "100px" }}>
                      <a
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          sortByHandler(uploads.column.custom_column_four)
                        }>
                        {uploads.column.custom_column_four}{" "}
                        <i className="fas fa-sort"></i>
                      </a>
                    </th>
                  ) : null}
                  {uploads.column.custom_column_five !== "" ? (
                    <th style={{ width: "100px" }}>
                      <a
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          sortByHandler(uploads.column.custom_column_five)
                        }>
                        {uploads.column.custom_column_five}{" "}
                        <i className="fas fa-sort"></i>
                      </a>
                    </th>
                  ) : null}

                  {uploads.column.custom_column_six !== "" ? (
                    <th style={{ width: "100px" }}>
                      <a
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          sortByHandler(uploads.column.custom_column_six)
                        }>
                        {" "}
                        {uploads.column.custom_column_six}{" "}
                        <i className="fas fa-sort"></i>
                      </a>
                    </th>
                  ) : null}

                  {uploads.column.custom_column_seven !== "" ? (
                    <th style={{ width: "100px" }}>
                      <a style={{ cursor: "pointer" }}>
                        {" "}
                        {uploads.column.custom_column_seven}{" "}
                        <i className="fas fa-sort"></i>
                      </a>
                    </th>
                  ) : null}

                  {uploads.column.custom_column_eight !== "" ? (
                    <th style={{ width: "100px" }}>
                      <a style={{ cursor: "pointer" }}>
                        {" "}
                        {uploads.column.custom_column_eight}{" "}
                        <i className="fas fa-sort"></i>
                      </a>
                    </th>
                  ) : null}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {messages.map((message, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      {message.hasOwnProperty("firstname")
                        ? message.firstname !== ""
                          ? _.capitalize(message.firstname)
                          : _.capitalize(message.custom_value_one)
                        : _.capitalize(message.custom_value_one)}
                    </td>
                    {message.hasOwnProperty("lastname") ? (
                      <td>
                        <a>
                          {message.hasOwnProperty("lastname")
                            ? message.lastname !== ""
                              ? _.capitalize(message.lastname)
                              : _.capitalize(message.custom_value_two)
                            : _.capitalize(message.custom_value_two)}
                        </a>
                      </td>
                    ) : (
                      <td>
                        <a>
                          {message.hasOwnProperty("initials")
                            ? message.initials !== ""
                              ? message.initials
                              : message.custom_value_two
                            : message.custom_value_two}
                        </a>
                      </td>
                    )}
                    <td>
                      {message.hasOwnProperty("contact")
                        ? message.contact !== ""
                          ? message.contact
                          : message.custom_value_three
                        : message.custom_value_three}
                    </td>
                    <td>
                      {message.hasOwnProperty("url")
                        ? message.url
                        : message.custom_value_four}
                    </td>
                    {message.hasOwnProperty("address") ? (
                      <td>
                        {message.hasOwnProperty("address")
                          ? message.address
                          : message.custom_value_five}
                      </td>
                    ) : null}

                    <td>
                      <Link href="/">
                        <a>
                          <span className="badge bg-danger">
                            Remove Contact From Report
                          </span>
                        </a>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
  const cookies = nookies.get(ctx);
  let res = [];
  let uncleanData = [];
  let error = 0;
  try {
    const messages = await axios.get(`/uploads/${id}`, {
      headers: { Authorization: "Bearer " + cookies.userData },
    });

    res = messages.data;

    const column = await axios.get();
  } catch (e) {
    error = 1;
    console.log("error ", e);
  }

  if (error === 0) {
    return { props: { uploads: res } };
  } else {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
}

export default Messages;
