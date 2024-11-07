import { combineReducers } from "redux";
import globalReducer from "./globalSlice";
import homeReducer from "./homeSlice";
import createBlogReducer from "./createBlogSlice";

const reducer = combineReducers({
  global: globalReducer,
  home: homeReducer,
  createBlog: createBlogReducer,
});

export default reducer;
