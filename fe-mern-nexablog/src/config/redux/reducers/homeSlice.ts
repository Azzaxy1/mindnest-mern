import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBLog } from "../../../types/blogTypes";

interface HomeState {
  dataBlogs: IBLog[];
}

const initialState: HomeState = {
  dataBlogs: [],
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    updatedDataBlog: (state, action: PayloadAction<IBLog[]>) => {
      state.dataBlogs = action.payload;
    },
  },
});

export const { updatedDataBlog } = homeSlice.actions;

export default homeSlice.reducer;
