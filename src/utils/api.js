import axios from "axios";

export default axios.create({
  baseURL: "/.netlify/functions/",
  responseType: "json",
  xsrfCookieName: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Content-Type": "application/json",
  }
});
