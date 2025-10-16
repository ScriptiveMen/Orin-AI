import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loading: true,
};

export const userSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        currentuser: (state, action) => {
            state.user = action.payload;
            state.loading = false;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.loading = false;
        },
    },
});

export const { currentuser, setLoading, logout } = userSlice.actions;
export default userSlice.reducer;
