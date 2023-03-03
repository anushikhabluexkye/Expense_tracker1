import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const initialState = {
  user: null,
  isSuccess: false,
  isLoading: false,
  isError: false,
  message: "",
};

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login("/api/User", user);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.isLoading = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        toast.success("Login successful!!");
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isError = true;
        state.message = action.payload;
        toast.error("Login failed!!");
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
