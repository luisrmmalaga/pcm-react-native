import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from "./axios_instance";

export async function getAllUsers() {
  try {
    return await getRequest("users").then((response) => response.data);
  } catch (error) {
    console.log("Error getting all users - " + error);
  }
}

export async function getUserById(id) {
  try {
    return await getRequest("user/" + id).then((response) => response.data);
  } catch (error) {
    console.log("Error getting user " + id + " - " + error);
  }
}

export async function createUser() {
  try {
    return await postRequest("user").then((response) => response.status);
  } catch (error) {
    console.log("Error creating user - " + error);
  }
}

export async function updateUser(id) {
  try {
    return await putRequest("user/" + id).then((response) => response.status);
  } catch (error) {
    console.log("Error updating user " + id + " - " + error);
  }
}

export async function deleteUser(id) {
  try {
    return await deleteRequest("user/" + id).then(
      (response) => response.status
    );
  } catch (error) {
    console.log("Error removing user " + id + " - " + error);
  }
}
