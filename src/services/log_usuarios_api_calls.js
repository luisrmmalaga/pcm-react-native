import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from './axios_instance'

export async function getAllLogsUser() {
  try {
    return await getRequest('logUsers').then(function (response) {
      console.log('Get all logs ', response.status)
      return response.data
    })
  } catch (error) {
    console.log('Error getting all log users - ' + error)
  }
}

export async function getLogsUserById(id) {
  try {
    return await getRequest('logUser/' + id).then((response) => response.data)
  } catch (error) {
    console.log('Error getting logs user ' + id + ' - ' + error)
  }
}

export async function createLogUser(userData) {
  try {
    return await postRequest('logUser', userData).then(
      (response) => response.status
    )
  } catch (error) {
    console.log('Error creating log user - ' + error)
  }
}

export async function updateUser(id) {
  try {
    return await putRequest('logUser/' + id).then((response) => response.status)
  } catch (error) {
    console.log('Error updating log user ' + id + ' - ' + error)
  }
}

export async function deleteUser(id) {
  try {
    return await deleteRequest('logUser/' + id).then(
      (response) => response.status
    )
  } catch (error) {
    console.log('Error removing log user ' + id + ' - ' + error)
  }
}
