import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {useRouter} from "next/router";
import axios from "../config/axios.config";
import cookies from "next-cookies";

function Home({ messages }) {
  const router = useRouter();
  console.log(messages);
  console.log(JSON.parse(localStorage.getItem("user")))
  return (
    <div className="container">
      <Head>
        <title>SMS Filtering System</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <center>
          <Image
            src="/images/logo.png" // Route of the image file
            height={50} // Desired size with correct aspect ratio
            width={240} // Desired size with correct aspect ratio
            alt="Your Name"
          />
        </center>
        <h1 className="title">
          <Link href="/uploads/file-upload">Upload a File</Link>
        </h1>
        <a href="/login" onClick={(e) => {
          e.preventDefault();
          document.cookie ="userData=;"
          router.push("/login")
        }}>Logout</a>
        <div id="body">
          <ul>
            {messages.map((message, i) => (
              <li key={i}>{message.name}</li>
            ))}
          </ul>
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer">
          Powered by WeweMedia
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}

// Home.getInitialProps = async (ctx) => {

//   return {
//     redirect: {
//       destination: "/login",
//       permanent: false,
//     },
//   };
//   return axios
//     .get("/messages", {
//       headers: {
//         Authorization: "Bearer " + jwt,
//       },
//     })
//     .catch((e) => {
//       console.log("e: ", e.response.status);
//       if (e.response.status === 401) {
//       }
//       return { messages: [] };
//     });

//   return { messages: data };
// };
export async function getServerSideProps(ctx) {
  console.log(cookies(ctx).userData);
  const jwt = cookies(ctx).userData;
  let res = "";
  let error = 0;
  
  // try {
  //   const messages = await axios.get("/messages", {
  //     headers: { Authorization: "Bearer " + jwt },
  //   });

  //   res = messages.data;

  //   console.log("res: ", res);
  // } catch (e) {
  //   res = [];
  //   error = 1;
  // }
  // if (error === 0) {
  //   return { props: { messages: res } };
  // } else {
  //   return {
  //     redirect: {
  //       destination: "/login",
  //       permanent: false,
  //     },
  //   };
  // }
}
export default Home;
