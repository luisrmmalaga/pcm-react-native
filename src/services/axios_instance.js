import CONSTANTS from '@config/constants'
import axios from 'axios'

const axiosClient = axios.create({
  baseURL: CONSTANTS.LOCALHOST,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
})

export function getRequest(URL) {
  return axiosClient.get(`${URL}`).then((response) => response)
}

export function postRequest(URL, payload) {
  return axiosClient.post(`/${URL}`, payload).then((response) => response)
}

export function putRequest(URL, payload) {
  return axiosClient.put(`/${URL}`, payload).then((response) => response)
}

export function deleteRequest(URL) {
  return axiosClient.delete(`/${URL}`).then((response) => response)
}

export default axiosClient
