import { FETCH_USER_DATA, LOGOUT } from "../actions/types";

const initialState = {
  user: {},
  isLoading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_DATA:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
    case LOGOUT:
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
}
