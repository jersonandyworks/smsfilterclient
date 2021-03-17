import Head from "next/head";
import Link from "next/link";
import axios from "../config/axios.config";
import cookies from "next-cookies";

export default function Form() {
  const loginUser = async (event) => {
    event.preventDefault();

    const res = axios
      .post("/auth/local", {
        identifier: event.target.name.value,
        password: event.target.password.value,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("response: ", response);
        const userData = {
          username: response.data.user.username,
          jwt: response.data.jwt,
        };

        document.cookie = "userData=" + userData.jwt;
        localStorage.setItem("userData", userData);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <form onSubmit={loginUser}>
      <label htmlFor="name">Name</label>
      <input
        placeholder="Username/Email"
        id="name"
        name="name"
        type="text"
        autoComplete="name"
        required
      />
      <input
        placeholder="Password"
        id="password"
        name="password"
        type="password"
        autoComplete="password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}
