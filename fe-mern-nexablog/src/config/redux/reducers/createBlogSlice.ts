import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateBlogState } from "../../../types/createBlogTypes";

const initialState: CreateBlogState = {
  form: {
    title: "",
    body: "",
    image: null,
  },
};

const createBlogSlice = createSlice({
  name: "createBlog",
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
  },
});

export const { setUpdatedForm } = createBlogSlice.actions;

export default createBlogSlice.reducer;
