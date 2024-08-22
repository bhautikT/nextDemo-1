import { createSlice } from "@reduxjs/toolkit";
import { LoginUser, signInUser } from "@/services/authService";
import toast from "react-hot-toast";

interface AuthState {
  user: string;
  loginData: object;
  loading: boolean;
  error?: string;
}

const initialState: AuthState = {
  loginData: {},
  user: "bhautik",
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = "";
      state.loginData = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.status === false) {
          toast.error(action.payload?.message || "Error occurred");
        } else {
          toast.success(action.payload?.message || "Registration successful");
        }
        state.user = action.payload?.user || ""; // Update with the user data if available
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(state.error || "An error occurred");
      })
      .addCase(LoginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.status === false) {
          toast.error(action.payload?.message || "Error occurred");
        } else {
          toast.success(action.payload?.message || "Login successful");
        }
        state.loginData = action.payload; // Update with the user data if available
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(state.error || "An error occurred");
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
