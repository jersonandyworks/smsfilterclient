import Head from "next/head";
import styles from "../../components/layout.module.css";
export default function FileUpload() {
  return (
    <>
      <Head>
        <title>SMS Filtering System</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <h1>Upload file!</h1>
      </div>
    </>
  );
}
