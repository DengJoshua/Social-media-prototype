import {
  GET_POST,
  GET_POSTS,
  LIKE_POST,
  MAKE_POST,
  POST_COMMENT,
  UNLIKE_POST,
} from "../actions/types";

const initialState = {
  posts: [],
  post: {},
  comment: {},
  isLoading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case GET_POST:
      return {
        ...state,
        post: state.posts.find((e) => e._id === action.payload),
        isLoading: false,
      };
    case MAKE_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case LIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.postId
            ? {
                ...post,
                likes: [...post.likes, { _id: action.payload.userId }],
              }
            : post
        ),
      };
    case UNLIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.postId
            ? {
                ...post,
                likes: post.likes.filter(
                  (e) => e._id !== action.payload.userId
                ),
              }
            : post
        ),
      };
    case POST_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: [action.payload.comment, ...state.post.comments],
        },
        posts: state.posts.map((post) =>
          post._id === action.payload.postId
            ? { ...post, comments: [action.payload.comment, ...post.comments] }
            : post
        ),
      };

    default:
      return state;
  }
}
