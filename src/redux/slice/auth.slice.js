import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "@/redux/thunk/auth.thunk";

let initialState = {
  isLoggedIn: false,
  userDetails: false,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.isLoggedIn = true;
      state.userDetails = action.payload;
      state.error = null;
    },
    logOutUser: (state) => {
      state.isLoggedIn = false;
      state.userDetails = false;
      state.error = null;
      localStorage.removeItem("token");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle login thunk lifecycle
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.userDetails = action.payload;
        state.error = null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to login";
        state.isLoggedIn = false;
      });
  },
});

export const { loginUser, logOutUser, clearError } = authSlice.actions;

export default authSlice.reducer;
