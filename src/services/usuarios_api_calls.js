import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from './axios_instance'

export async function getAllUsers() {
  try {
    return await getRequest('users').then((response) => response.data)
  } catch (error) {
    console.log('Error getting all users - ' + error)
  }
}

export async function getUserById(id) {
  try {
    return await getRequest('user/' + id).then((response) => response.data)
  } catch (error) {
    console.log('Error getting user ' + id + ' - ' + error)
  }
}

export async function createUser(data) {
  try {
    return await postRequest('user', data).then((response) => {
      return response.data
    })
  } catch (error) {
    console.log('Error creating user - ' + error)
  }
}

export async function updateUser(id, data) {
  try {
    return await putRequest('user/' + id, data).then((response) => {
      return response.status
    })
  } catch (error) {
    console.log('Error updating user ' + id + ' - ' + error)
  }
}

export async function deleteUser(id) {
  try {
    return await deleteRequest('user/' + id).then((response) => response.status)
  } catch (error) {
    console.log('Error removing user ' + id + ' - ' + error)
  }
}

// UPDATE SESIÓN
export async function findAndUpdateUserSession(id, timestamp) {
  getUserById(id).then((response) => {
    if (response) {
      response.timestampUltimoRegistro = timestamp
      return updateUser(id, response).then(
        (response) => 'Sesión actualizada - ' + response
      )
    }
  })
}
