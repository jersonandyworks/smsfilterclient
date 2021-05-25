import Link from "next/link";
import axios from "../../config/axios.config";
import nookies, { parseCookies, setCookie, destroyCookie } from "nookies";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NavAdmin from "../../components/nav";
import Layout from "../../components/layout";
const Messages = ({ uploads }) => {
  const [pid, setId] = useState(1);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    setId(id);
  });
  return (
    <>
      <NavAdmin />
      <Layout>
        <div className="card" style={{ paddingTop: "2%" }}>
          <div className="card-header">
            <h3 className="card-title">Clean Records</h3>
            &nbsp;
            <Link href="/">
              <a>&laquo; Back</a>
            </Link>
          </div>

          <div className="card-body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th style={{ width: "10px" }}>#</th>
                  <th>{uploads.column.custom_column_one}</th>
                  <th>{uploads.column.custom_column_two}</th>
                  <th style={{ width: "100px" }}>
                    {uploads.column.custom_column_three}
                  </th>
                  {uploads.column.custom_column_four !== null ? (
                    <th style={{ width: "100px" }}>
                      {uploads.column.custom_column_four}
                    </th>
                  ) : null}
                  {uploads.column.custom_column_five !== "" ? (
                    <th style={{ width: "100px" }}>
                      {uploads.column.custom_column_five}
                    </th>
                  ) : null}

                  {uploads.column.custom_column_six !== "" ? (
                    <th style={{ width: "100px" }}>
                      {uploads.column.custom_column_six}
                    </th>
                  ) : null}

                  {uploads.column.custom_column_seven !== "" ? (
                    <th style={{ width: "100px" }}>
                      {uploads.column.custom_column_seven}
                    </th>
                  ) : null}

                  {uploads.column.custom_column_eight !== "" ? (
                    <th style={{ width: "100px" }}>
                      {uploads.column.custom_column_eight}
                    </th>
                  ) : null}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {uploads.messages.map((message, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      {message.hasOwnProperty("firstname")
                        ? message.firstname !== ""
                          ? message.firstname
                          : message.custom_value_one
                        : message.custom_value_one}
                    </td>
                    {message.hasOwnProperty("lastname") ? (
                      <td>
                        <a>
                          {message.hasOwnProperty("lastname")
                            ? message.lastname !== ""
                              ? message.lastname
                              : message.custom_value_two
                            : message.custom_value_two}
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
