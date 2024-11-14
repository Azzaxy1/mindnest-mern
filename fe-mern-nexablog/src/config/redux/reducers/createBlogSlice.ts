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
    resetForm: (state) => {
      state.form = initialState.form;
    },
  },
});

export const { setUpdatedForm, resetForm } = createBlogSlice.actions;

export default createBlogSlice.reducer;
