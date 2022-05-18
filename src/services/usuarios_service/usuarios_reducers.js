import { GET_ALL_USERS } from "../../redux/actions";

const initialState = {
  users: [],
};

function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return { ...state, users: action.payload };
    default:
      return state;
  }
}

export default usersReducer;
