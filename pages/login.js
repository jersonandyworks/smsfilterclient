import Head from "next/head";
import nookies, { parseCookies, setCookie, destroyCookie } from "nookies";
import axios from "../config/axios.config";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import { useState } from "react";

function Form() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const loginUser = async (event) => {
    console.log("event: ", event);
    event.preventDefault();
    const res = await axios.post("/auth/local", {
      identifier: username,
      password: password,
    });
    const userData = res.data;
    const jwt = userData.jwt;
    setCookie(null, "userData", jwt);
    router.push("/");
  };

  function usernameHandler(e){
    setUsername(e.target.value)
  }

  function passwordHandler(e){
    setPassword(e.target.value);
  }
  return (
    <Layout>
      <div className="login-page">
        <div className="login-box">
          <div className="card card-outline card-primary">
            <div className="card-header text-center">
              <a href="/" className="h1">
                <b>Wewe</b>Media
              </a>
            </div>
            <div className="card-body">
              <p className="login-box-msg">Sign in to start your session</p>

              <form method="POST">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Email"
                    onChange={usernameHandler}
                    required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope"></span>
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={passwordHandler}
                    required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock"></span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-8"></div>

                  <div className="col-4">
                    <button type="submit" onClick={loginUser} className="btn btn-primary btn-block">
                      Sign In
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Form;
