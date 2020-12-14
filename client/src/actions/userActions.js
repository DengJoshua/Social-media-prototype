import http from "../services/httpService";
import {
  FETCH_USER_DATA,
  GET_POSTS,
  SEARCH_USERS,
  ADD_FRIEND,
  GET_USER_FRIENDS,
  ACCEPT_REQUEST,
  DECLINE_REQUEST,
  CANCEL_REQUEST,
  UN_FRIEND,
} from "./types";

const apiEndPoint = "http://localhost:5000/api/friends/";

export const fetchUser = (id) => async (dispatch) => {
  const { data } = await http.get("http://localhost:5000/api/users/" + id);
  dispatch({
    type: FETCH_USER_DATA,
    payload: data,
  });
};

export const fetchPosts = () => async (dispatch) => {
  const { data } = await http.get("http://localhost:5000/api/posts");
  dispatch({
    type: GET_POSTS,
    payload: data,
  });
};

export const searchUsers = (query) => async (dispatch) => {
  const { data } = await http.post("http://localhost:5000/api/search/users", {
    query,
  });
  dispatch({
    type: SEARCH_USERS,
    payload: data,
  });
};

export const getMyFriends = (userId) => async (dispatch) => {
  const { data } = await http.get(apiEndPoint + userId);
  dispatch({
    type: GET_USER_FRIENDS,
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

export const acceptFriendRequest = (myId, reqId) => async (dispatch) => {
  const { data } = await http.post(apiEndPoint + "acceptFriendRequest", {
    myId,
    reqId,
  });
  dispatch({
    type: ACCEPT_REQUEST,
    payload: data,
  });
};

export const declineFriendRequest = (myId, reqId) => async (dispatch) => {
  await http.post(apiEndPoint + "decline", {
    myId,
    reqId,
  });
  dispatch({
    type: DECLINE_REQUEST,
    payload: reqId,
  });
};

export const cancelFriendRequest = (myId, reqId) => async (dispatch) => {
  await http.post(apiEndPoint + "cancel", {
    myId,
    reqId,
  });
  dispatch({
    type: CANCEL_REQUEST,
    payload: reqId,
  });
};

export const unFriend = (myId, reqId) => async (dispatch) => {
  await http.post(apiEndPoint + "unfriend", {
    myId,
    reqId,
  });
  dispatch({
    type: UN_FRIEND,
    payload: reqId,
  });
};
