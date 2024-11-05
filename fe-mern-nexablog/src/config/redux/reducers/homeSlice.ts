import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBLog } from "../../../types/blogTypes";

interface HomeState {
  dataBlogs: IBLog[];
  page: {
    currentPage: number;
    totalPage: number;
  };
}

const initialState: HomeState = {
  dataBlogs: [],
  page: {
    currentPage: 1,
    totalPage: 1,
  },
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    updatedDataBlog: (state, action: PayloadAction<IBLog[]>) => {
      state.dataBlogs = action.payload;
    },
    updatedPage: (
      state,
      action: PayloadAction<{ currentPage: number; totalPage: number }>
    ) => {
      state.page = action.payload;
    },
  },
});

export const { updatedDataBlog, updatedPage } = homeSlice.actions;

export default homeSlice.reducer;
