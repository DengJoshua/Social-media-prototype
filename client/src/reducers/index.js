import { combineReducers } from "redux";
import userReducer from "./userReducer";
import postReducer from "./postReducer";
import friendReducer from "./friendReducer";

export default combineReducers({
  user: userReducer,
  posts: postReducer,
  friends: friendReducer,
});
