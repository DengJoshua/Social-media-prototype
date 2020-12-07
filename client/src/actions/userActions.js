import http from "../services/httpService";
import { FETCH_USER_DATA, GET_POSTS } from "./types";

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
