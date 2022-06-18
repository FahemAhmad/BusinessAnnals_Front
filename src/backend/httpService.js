import axios from "axios";
import { getCookie } from "../Auth/auth";

const authToken = getCookie("token");

axios.defaults.baseURL =
  "http://ec2-13-215-177-64.ap-southeast-1.compute.amazonaws.com:8000";
axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("Logging error", error);
    alert("An unexpected Error occurred");
  }

  return Promise.reject(error);
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
