import "../styles/global.css";
import Error from "next/error";
function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

App.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  console.log(appContext);
  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };

  return {};
};

export default App;
