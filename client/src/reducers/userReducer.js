import {
  FETCH_USER_DATA,
  LOGOUT,
  ADD_FRIEND,
  ACCEPT_REQUEST,
  CANCEL_REQUEST,
  DECLINE_REQUEST,
  GET_USER_FRIENDS,
  SEARCH_USERS,
  UN_FRIEND,
} from "../actions/types";

const initialState = {
  user: {},
  friends: [],
  friendRequests: [],
  friend: {},
  search: [],
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
    case SEARCH_USERS:
      return {
        ...state,
        search: action.payload,
        isLoading: false,
      };
    case ADD_FRIEND:
      return {
        ...state,
        friends: [action.payload, ...state.friends],
        user: {
          ...state.user,
          friends: [...state.user.friends, action.payload],
        },
      };
    case ACCEPT_REQUEST:
      return {
        ...state,
        friends: [action.payload, ...state.friends],
        user: {
          ...state.user,
          friends: [action.payload, ...state.user.friends],
          friendRequests: state.user.friendRequests.filter(
            (e) => e._id !== action.payload._id
          ),
        },
        friendRequests: state.friendRequests.filter(
          (e) => e._id !== action.payload._id
        ),
      };
    case DECLINE_REQUEST:
      return {
        ...state,
        user: {
          ...state.user,
          friendRequests: state.user.friendRequests.filter(
            (e) => e._id !== action.payload
          ),
        },
      };
    case GET_USER_FRIENDS:
      return {
        ...state,
        friends: action.payload,
      };

    case CANCEL_REQUEST:
      return {
        ...state,
        friends: state.friends.filter((e) => e._id !== action.payload),
        user: {
          ...state.user,
          friends: state.friends.filter((e) => e._id !== action.payload),
        },
      };
    case UN_FRIEND:
      return {
        ...state,
        friends: state.friends.filter((e) => e._id !== action.payload),
        user: {
          ...state.user,
          friends: state.friends.filter((e) => e._id !== action.payload),
        },
      };
    default:
      return state;
  }
}
