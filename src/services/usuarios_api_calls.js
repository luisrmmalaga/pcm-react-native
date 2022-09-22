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

export async function createUser(data) {
  try {
    return await postRequest("user", data).then((response) => {
      return response.status;
    });
  } catch (error) {
    console.log("Error creating user - " + error);
  }
}

export async function updateUser(data) {
  try {
    return await putRequest("user/" + data._id, data).then((response) => {
      return response.status;
    });
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

//INICIO DE SESIÓN
//IF el device se había registrado antes
//THEN se modifica el timestamps del ultimo registro;
//ELSE se crea nuevo usuario
export async function createOrUpdateUserSession(id, timestamp) {
  getUserById(id).then((response) => {
    if (response) {
      console.log("usuario encontrado", response);
      response.timestampUltimoRegistro = timestamp;
      console.log("usuario encontrado seteado", response);
      // return updateUser(userFind).then(
      //   (response) => "Usuario ya existente - " + response
      // );
    } else {
      newUser = {
        _id: id,
        timestampCreacion: timestamp,
        timestampFin: timestamp,
        timestampUltimoRegistro: timestamp,
        coordenadas: { latitud: 0, longitud: 0 },
      };
      console.log("usuario nuevo", newUser);
      console.log("time", timestamp);
      // return createUser(newUser).then(
      //   (response) => "Nuevo usuario creado con éxito - " + response
      // );
    }
  });
}
