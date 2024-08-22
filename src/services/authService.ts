import AxiosDefaultSetting from "@/AxiosSetting";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signInUser = createAsyncThunk(
  "auth/signInUser",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await AxiosDefaultSetting({
        method: "POST",
        data: formData,
        url: "/users/register",
        contentType: "multipart/form-data", // Ensure content type is set for FormData
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const LoginUser = createAsyncThunk(
  "auth/LoginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosDefaultSetting({
        method: "POST",
        data: data,
        url: "/auth/login",
        contentType: "application/json", // Ensure content type is set for FormData
      });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
