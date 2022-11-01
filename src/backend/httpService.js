import axios from "axios";
import { getCookie } from "../Auth/auth";

const authToken = getCookie("token");

axios.defaults.baseURL =
  "http://ec2-13-212-216-200.ap-southeast-1.compute.amazonaws.com:5000/api/";
axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;

axios.interceptors.response.use(null, (error) => {
  if (error.response.status === 404) {
    return;
  }
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
