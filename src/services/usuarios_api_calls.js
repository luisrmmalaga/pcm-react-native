import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from "./axios_instance";

export async function getAllUsers() {
  try {
    const response = await getRequest("users");
    return response.data;
  } catch (error) {
    console.log("Error getting all users - " + error);
  }
}

export async function getUserById(id) {
  try {
    const user = await getRequest("user/" + id);
    console.log(user);
  } catch (error) {
    console.log("Error getting user " + id + "- " + error);
  }
}
