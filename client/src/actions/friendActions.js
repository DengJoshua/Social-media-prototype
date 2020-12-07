import http from "../services/httpService";
import { ADD_FRIEND, SEARCH_USERS } from "./types";

const apiEndPoint = "http://localhost:5000/api/friends/";

export const searchUsers = (query) => async (dispatch) => {
  const { data } = await http.post("http://localhost:5000/api/search/users", {
    query,
  });
  dispatch({
    type: SEARCH_USERS,
    payload: data,
  });
};

export const sendFriendRequest = (myId, reqId) => async (dispatch) => {
  const { data } = await http.post(apiEndPoint + "sendFriendRequest", {
    myId,
    reqId,
  });
  dispatch({
    type: ADD_FRIEND,
    payload: data,
  });
};
