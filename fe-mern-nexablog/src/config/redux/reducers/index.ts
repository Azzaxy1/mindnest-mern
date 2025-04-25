import { combineReducers } from "redux";
import globalReducer from "./globalSlice";
import homeReducer from "./homeSlice";
import createJournalReducer from "./createJournalSlice";

const reducer = combineReducers({
  global: globalReducer,
  home: homeReducer,
  createJournal: createJournalReducer,
});

export default reducer;
