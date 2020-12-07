import {
  ADD_FRIEND,
  ACCEPT_REQUEST,
  SEARCH_USERS,
  CANCEL_REQUEST,
} from "../actions/types";

const initialState = {
  friends: [],
  friendRequests: [],
  friend: {},
  users: [],
  isLoading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload,
        isLoading: false,
      };
    case ADD_FRIEND:
      return {
        ...state,
        friends: [action.payload, ...state.friends],
      };
    case ACCEPT_REQUEST:
      return {
        ...state,
      };
    case CANCEL_REQUEST:
      return {
        ...state,
        friends: action.payload,
      };
    default:
      return state;
  }
}
