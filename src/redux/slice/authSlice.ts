import { signInUser } from "@/services/authService";
import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

//create new slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: "bhautik",
  },
  reducers: {
    logout: (state) => {
      state.user = "";
    },
  },
  //create reducer
  extraReducers: (builder) => {
    //sign in
    builder
      .addCase(signInUser.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        if (action?.payload?.status === false) {
          toast.error(action?.payload);
        } else {
          toast.success(action?.payload?.message);
        }
        return {
          ...state,
          loading: false,
        };
      })
      .addCase(signInUser.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
