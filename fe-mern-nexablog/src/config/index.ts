import store from "./redux/store";
import { updatedName } from "./redux/reducers/globalSlice";
import { updatedDataJournal, updatedPage } from "./redux/reducers/homeSlice";
import { setUpdatedForm } from "./redux/reducers/createJournalSlice";

export { store, updatedDataJournal, updatedName, updatedPage, setUpdatedForm };
