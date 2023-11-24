import axios from "axios";

// axios.defaults.baseURL = "https://dj-rest-test-f6d48f5f2d48.herokuapp.com/";
axios.defaults.baseURL = "api/";

axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
