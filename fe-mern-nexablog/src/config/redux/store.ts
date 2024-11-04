import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBLog } from "../../types/blog";

interface BlogState {
  dataBlogs: IBLog[];
  name: string;
}

const initialState: BlogState = {
  dataBlogs: [],
  name: "Abdurrohman",
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    updatedDataBlog: (state, action: PayloadAction<IBLog[]>) => {
      state.dataBlogs = action.payload;
    },
    updatedName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { updatedDataBlog, updatedName } = blogSlice.actions;

const store = configureStore({
  reducer: blogSlice.reducer,
});

export default store;
