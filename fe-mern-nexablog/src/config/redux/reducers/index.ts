import { combineReducers } from "redux";
import globalReducer from "./globalSlice";
import homeReducer from "./homeSlice";
import createjournalReducer from "./createJournalSlice";

const reducer = combineReducers({
  global: globalReducer,
  home: homeReducer,
  createjournal: createjournalReducer,
});

export default reducer;
