import { combineReducers } from "redux";
import globalReducer from "./globalSlice";
import homeReducer from "./homeSlice";

const reducer = combineReducers({
  global: globalReducer,
  home: homeReducer,
});

export default reducer;
