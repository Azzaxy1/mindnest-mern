import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateJournalState } from "../../../types/createJournalTypes";

const initialState: CreateJournalState = {
  form: {
    title: "",
    body: "",
    image: null,
  },
};

const createJournalSlice = createSlice({
  name: "createJournal",
  initialState,
  reducers: {
    setUpdatedForm: (
      state,
      action: PayloadAction<{
        title: string;
        body: string;
        image: string | null;
      }>
    ) => {
      state.form = action.payload;
    },
    resetForm: (state) => {
      state.form = initialState.form;
    },
  },
});

export const { setUpdatedForm, resetForm } = createJournalSlice.actions;

export default createJournalSlice.reducer;
