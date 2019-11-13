import axios from "axios";

export default axios.create({
  baseURL: "/.netlify/functions/",
  responseType: "json",
  xsrfCookieName: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Methods": "*",
  }
});
