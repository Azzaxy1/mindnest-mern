import { createSlice } from "@reduxjs/toolkit";

interface GlobalState {
  name: string;
}

const initialState: GlobalState = {
  name: "Abdurrohman",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    updatedName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { updatedName } = globalSlice.actions;

export default globalSlice.reducer;
