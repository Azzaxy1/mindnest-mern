import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IJournal } from "../../../types/journalTypes";

interface HomeState {
  dataJournals: IJournal[];
  page: {
    currentPage: number;
    totalPage: number;
  };
}

const initialState: HomeState = {
  dataJournals: [],
  page: {
    currentPage: 1,
    totalPage: 1,
  },
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    updatedDataJournal: (state, action: PayloadAction<IJournal[]>) => {
      state.dataJournals = action.payload;
    },
    updatedPage: (
      state,
      action: PayloadAction<{ currentPage: number; totalPage: number }>
    ) => {
      state.page = action.payload;
    },
  },
});

export const { updatedDataJournal, updatedPage } = homeSlice.actions;

export default homeSlice.reducer;
