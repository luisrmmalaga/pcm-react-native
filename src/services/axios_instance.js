import axios from "axios";
import API_URL from "@config/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// axiosClient.defaults.baseURL = API_URL;
// axiosClient.baseURL = API_URL;

// axiosClient.defaults.headers = {
//   "Content-Type": "application/json",
//   Accept: "application/json",
// };

// axiosClient.interceptors.request.use(
//   async (config) => {
//     const token = await AsyncStorage.getItem("token");
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

//All request will wait 20 seconds before timeout
axiosClient.defaults.timeout = 20000;

axiosClient.defaults.withCredentials = true;

export function getRequest(URL) {
  return axiosClient
    .get(`${URL}`)
    .then((response) => {
      response;
    })
    .catch((error) => {
      console.log("GET ERROR: " + error);
    });
}

export function postRequest(URL, payload) {
  return axiosClient.post(`/${URL}`, payload).then((response) => response);
}

export function putRequest(URL, payload) {
  return axiosClient.put(`/${URL}`, payload).then((response) => response);
}

export function deleteRequest(URL) {
  return axiosClient.delete(`/${URL}`).then((response) => response);
}

export default axiosClient;
