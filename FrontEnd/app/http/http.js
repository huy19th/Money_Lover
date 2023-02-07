import axios from "axios";
const baseURL = 'http://10.7.100.33/service/api';

const Http = axios.create({
  baseURL,
  timeout: 30000,
  timeoutErrorMessage: "Request Timeout",
});

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // lấy token từ localStorage và gắn vào headers
  const token = localStorage.getItem('token');
    if (token) {
      config.headers.common["Authorization"] = `Bearer ${token}`;
    }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export default Http;