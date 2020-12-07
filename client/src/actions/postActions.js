import http from "../services/httpService";
import {
  GET_POSTS,
  GET_POST,
  LIKE_POST,
  UNLIKE_POST,
  MAKE_POST,
  POST_COMMENT,
} from "./types";

const apiEndPoint = "http://localhost:5000/api/posts/";

export const fetchPosts = async (dispatch) => {
  const { data } = await http.get(apiEndPoint);
  dispatch({
    type: GET_POSTS,
    payload: data,
  });
};

export const fetchPost = (postId) => (dispatch) => {
  dispatch({
    type: GET_POST,
    payload: postId,
  });
};

export const makePost = (post, id) => async (dispatch) => {
  const { data } = await http.post(apiEndPoint + id, {
    text: post.text,
    video: post.vidUrl,
    image: post.imgUrl,
  });
  dispatch({
    type: MAKE_POST,
    payload: data,
  });
};

export const likePost = (postId, userId) => async (dispatch) => {
  dispatch({
    type: LIKE_POST,
    payload: {
      userId,
      postId,
    },
  });
  await http.post(apiEndPoint + "likePost", { postId, userId });
};

export const unlikePost = (postId, userId) => async (dispatch) => {
  dispatch({
    type: UNLIKE_POST,
    payload: {
      userId,
      postId,
    },
  });
  await http.post(apiEndPoint + "unlikePost", { postId, userId });
};

export const postComment = (postId, userId, comment) => async (dispatch) => {
  const { data } = await http.post(apiEndPoint + "comment", {
    postId,
    userId,
    comment,
  });
  dispatch({
    type: POST_COMMENT,
    payload: {
      userId,
      postId,
      comment: data,
    },
  });
};
