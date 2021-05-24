import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:1337",
  "Content-Type": "application/x-www-form-urlencoded",
  Accept: "application/json",
});

instance.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
instance.defaults.headers.post["Accept"] = "application/json";
export default instance;
