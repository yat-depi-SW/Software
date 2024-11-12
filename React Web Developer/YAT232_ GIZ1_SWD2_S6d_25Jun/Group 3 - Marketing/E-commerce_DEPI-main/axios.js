// import React from 'react'
import axios from "axios";

export const BASE_URL = "http://localhost:5000";
export const API_URL = BASE_URL.concat("/api");

export const auth_data = JSON.parse(localStorage.getItem("auth")) || null;

const apiInstance = axios.create({
  baseURL: API_URL,
});

apiInstance.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
apiInstance.defaults.headers.post["Access-Control-Allow-Credentials"] = "true";
apiInstance.defaults.headers.post["Access-Control-Allow-Headers"] =
  "DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization";
apiInstance.defaults.headers.post["Access-Control-Allow-Methods"] =
  "GET,POST,PUT,PATCH,DELETE,OPTIONS";
apiInstance.defaults.headers.post["Content-Type"] = "application/json";
if (auth_data) {
  apiInstance.defaults.headers.post["Authorization"] =
    `Bearer ` + auth_data.token;
  apiInstance.defaults.headers.get["Authorization"] =
    `Bearer ` + auth_data.token;
  apiInstance.defaults.headers.put["Authorization"] =
    `Bearer ` + auth_data.token;
  apiInstance.defaults.headers.patch["Authorization"] =
    `Bearer ` + auth_data.token;
  apiInstance.defaults.headers.delete["Authorization"] =
    `Bearer` + auth_data.token;
  apiInstance.defaults.headers.common["Authorization"] =
    `Bearer` + auth_data.token;
}

export { apiInstance };
