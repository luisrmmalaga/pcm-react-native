import { getRequest, postRequest } from './axios_instance'

export async function getCheckpointsByUserId(idUsuario) {
  try {
    return await getRequest('checkpoints/' + idUsuario).then(function (
      response
    ) {
      console.log(
        'Get checkpoints from user ' + idUsuario + ' : ',
        response.status
      )
      return response.data
    })
  } catch (error) {
    console.log('Error getting checkpoints by user id - ' + error)
  }
}

export async function getCheckpointsByUserIdAndFavName(data) {
  try {
    return await getRequest(
      'checkpoints/' + data.user + '/from/' + data.nombre
    ).then(function (response) {
      console.log(
        'Get checkpoints from user ' +
          data.user +
          ' and favourite location name ' +
          data.nombre +
          ': ',
        response.status
      )
      return response.data
    })
  } catch (error) {
    console.log('Error getting checkpoints by user id - ' + error)
  }
}

export async function calculateTrending(data) {
  try {
    return await getRequest('trend/' + data.nombre + '/' + data.user).then(
      function (response) {
        console.log(
          'Calculate trend from favourite location ' + data.nombre + ' : ',
          response.status
        )
        return response.data
      }
    )
  } catch (error) {
    console.log('Error calculatting trend - ' + error)
  }
}

export async function createCheckpoint(checkpointData) {
  try {
    return await postRequest('checkpoint', checkpointData).then(
      (response) => response
    )
  } catch (error) {
    console.log('Error creating checkpoint - ' + error)
  }
}
