import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosDefaultSetting from "./axios/axiosSetting";

//signin user
export const signInUser = createAsyncThunk("auth/signin", async (data, { rejectWithValue }) => {
  try {
    const response = await AxiosDefaultSetting({
      method: "POST",
      url: "/auth/login", //endpoint
      data: data,
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
