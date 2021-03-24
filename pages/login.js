import Head from "next/head";
import Link from "next/link";
import axios from "../config/axios.config";
import {useRouter} from "next/router";

function Form() {
  const router = useRouter();
  const loginUser = async (event) => {
    event.preventDefault();
   
      const res = await axios
      .post("/auth/local", {
        identifier: event.target.name.value,
        password: event.target.password.value,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const userData = res.data;
      const jwt = userData.jwt;
      document.cookie = "userData=" + jwt;
      localStorage.setItem("user", JSON.stringify(res.data.user));
      console.log("res: ", res);
      router.push("/")
      
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


export default Form;