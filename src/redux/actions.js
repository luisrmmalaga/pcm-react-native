export const GET_ALL_USERS = "GET_ALL_USERS";

export const getAllUsers = (users) => (dispatch) => {
  dispatch({
    type: GET_ALL_USERS,
    payload: users,
  });
};
