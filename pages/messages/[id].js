import Link from "next/link";
import axios from "../../config/axios.config";
import nookies, { parseCookies, setCookie, destroyCookie } from "nookies";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NavAdmin from "../../components/nav";
import Layout from "../../components/layout";
const Messages = ({ uploads }) => {
    console.log("messages: ", uploads.messages)
  const [pid, setId] = useState(1);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    console.log("POST: ", pid);
    setId(id);
  });
  return (
    <>
      <NavAdmin />
      <Layout>
        <div className="card" style={{ paddingTop: "2%" }}>
          <div className="card-header">
            <h3 className="card-title">Clean Records</h3>
          </div>

          <div className="card-body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th style={{ width: "10px" }}>#</th>
                  <th>File Name</th>
                  <th>Contact Number</th>
                  <th style={{ width: "40px" }}></th>
                </tr>
              </thead>
              <tbody>
                {uploads.messages.map((message, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{message.name}</td>
                    <td>
                    <a>{message.contact_number}</a>
                    </td>
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
  } catch (e) {
    error = 1;
    console.log("error ", e);
  }

  console.log("error: ", error);

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
