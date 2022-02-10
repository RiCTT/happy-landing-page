import axios from "axios";

console.log("process.env");
console.log(process.env);

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

instance.interceptors.response.use(
  function onFulFilled(res) {
    const data = res.data;
    const { code } = data;
    if (code === 0) {
      return data.data;
    }
    throw new Error(res);
  },
  function onRejected(error) {
    console.log("error");
    console.log(error);
    // return error;
    throw new Error(error);
  }
);

export const http = instance;
