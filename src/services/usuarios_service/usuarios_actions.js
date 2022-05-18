import API_URL from "./config/constants.js";
export const GET_ALL_USERS = "users";

export const getAllUsers = () => {
  try {
    return async (dispatch) => {
      const result = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await result.json();

      if (json) {
        dispatch({
          type: GET_ALL_USERS,
          payload: json,
        });
      } else {
        console.log("Error getting all users!");
      }
    };
  } catch (error) {
    console.log(error);
  }
};
