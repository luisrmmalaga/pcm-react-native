import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from './axios_instance'

export async function getAllFavourites() {
  try {
    return await getRequest('favourites').then(function (response) {
      console.log('Get all favourites locations ', response.status)
      return response.data
    })
  } catch (error) {
    console.log('Error getting all favourites locations - ' + error)
  }
}

export async function getFavouritesByUserId(id) {
  try {
    return await getRequest('favourites/' + id).then(
      (response) => response.data
    )
  } catch (error) {
    console.log('Error getting favourites locations  ' + id + ' - ' + error)
  }
}

export async function createFavourite(favouriteData) {
  try {
    return await postRequest('favourite', favouriteData).then(
      (response) => response
    )
  } catch (error) {
    console.log('Error creating favourite location - ' + error)
  }
}

export async function upsertFavourite(filter, favouriteData) {
  try {
    return await putRequest(
      filter.idUsuario +
        '/favourite/' +
        filter.latitud +
        '/' +
        filter.longitud +
        '/' +
        filter.timestampCreacion,
      favouriteData
    ).then((response) => response)
  } catch (error) {
    console.log('Error inserting or updating favourite location - ' + error)
  }
}

export async function updateFavourite(id) {
  try {
    return await putRequest('favourite/' + id).then(
      (response) => response.status
    )
  } catch (error) {
    console.log('Error updating favourite location ' + id + ' - ' + error)
  }
}

export async function deleteFavourite(id) {
  try {
    return await deleteRequest('favourite/' + id).then(
      (response) => response.status
    )
  } catch (error) {
    console.log('Error removing favourite location ' + id + ' - ' + error)
  }
}

export async function deleteFavouriteByUserIdTimestampAndCoords(favLocation) {
  try {
    return await deleteRequest(
      favLocation.idUsuario +
        '/' +
        favLocation.timestampCreacion +
        '/coordinates/' +
        favLocation.coordenadas.latitud +
        '/' +
        favLocation.coordenadas.longitud
    ).then((response) => response.status)
  } catch (error) {
    console.log(
      'Error removing favourite location by userId, timestamp and coordinates - ' +
        error
    )
  }
}
