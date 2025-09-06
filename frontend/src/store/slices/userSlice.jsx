import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  initialState,
  name: "currentuser",
  reducers: {
    currentuser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { currentuser } = userSlice.actions;
export default userSlice.reducer;
