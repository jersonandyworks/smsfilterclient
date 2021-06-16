import axios from "axios";
console.log("host: ", process.env.HOST)
const instance = axios.create({
  baseURL: "http://178.128.221.120:1337",
  "Content-Type": "application/x-www-form-urlencoded",
  Accept: "application/json",
});

instance.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
instance.defaults.headers.post["Accept"] = "application/json";
export default instance;
