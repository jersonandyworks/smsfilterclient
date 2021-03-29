import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "../config/axios.config";
import nookies, { parseCookies, setCookie, destroyCookie } from "nookies";
import NavAdmin from "../components/nav";
import Layout from "../components/layout";

function Home({ uploads }) {
  const router = useRouter();
  const cookies = parseCookies();
  console.log({ cookies });
  console.log("uploads: ", uploads);

  return (
    <>
      <Head>
        <title>SMS Filtering System</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
                  <th>Entries Count</th>
                  <th style={{ width: "250px" }}></th>
                </tr>
              </thead>
              <tbody>
                {uploads.map((file, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td><Link href={`/messages/${file.id}`} ><a>{file.filename}</a></Link></td>
                    <td><Link href={`/messages/${file.id}`} ><a>{file.messages.length}</a></Link></td>
                    <td>
                    <Link href="/">
                        <a>
                          <span className="badge bg-warning">
                            Download Report
                          </span>
                        </a>
                      </Link>
                      &nbsp;
                      <Link href="/">
                        <a>
                          <span className="badge bg-danger">
                            Delete Report
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
}

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  let res = [];
  let error = 0;
  console.log("errorxXXXX: ");
  try {
    console.log("coookies: ", cookies);
    const uploads = await axios.get("/uploads", {
      headers: { Authorization: "Bearer " + cookies.userData },
    });

    res = uploads.data;
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
export default Home;
