import axios from "axios";

export default axios.create({
  baseURL: "/.netlify/functions/",
  responseType: "json",
  xsrfCookieName: false
});