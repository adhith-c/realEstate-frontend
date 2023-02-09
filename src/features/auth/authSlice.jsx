import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    id: null,
    token: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, id } = action.payload;
      state.id = id;
      state.token = accessToken;
    },
    logout: (state, action) => {
      state.id = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.id;

export const selectCurrentToken = (state) => state.auth.token;
