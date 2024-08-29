import AxiosDefaultSetting from "@/AxiosSetting";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

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
      toast.error(error?.response?.data?.message);
    }
  }
);

export const LoginUser = createAsyncThunk(
  "auth/LoginUser",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await AxiosDefaultSetting({
        method: "POST",
        data: data,
        url: "/auth/login",
        contentType: "application/json", // Ensure content type is set for FormData
      });
      return response.data.data;
    } catch (error: any) {
      console.log(error, "error");
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const forgotPasswordHandler = createAsyncThunk(
  "auth/forgotPassword",
  async (data: { email: string }, { rejectWithValue }) => {
    try {
      const response = await AxiosDefaultSetting({
        method: "POST",
        data: data,
        url: "/auth/forgotPassword",
        contentType: "application/json", // Ensure content type is set for FormData
      });
      console.log(response, "response123");
      return toast.success(response?.data?.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const ResetPasswordHandler = createAsyncThunk(
  "auth/resetPassword",
  async ({ slug, data }: { slug: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await AxiosDefaultSetting({
        method: "PATCH",
        data: data,
        url: `/auth/resetPassword/${slug}`,
        contentType: "application/json",
      });
      return toast.success(response?.data?.message);
    } catch (error: any) {
      console.log(error?.response?.data?.message, "error");
      toast.error(error?.response?.data?.message);
    }
  }
);

// Thunk to fetch users with pagination and search query
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (
    { page, searchQuery }: { page: number; searchQuery: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await AxiosDefaultSetting({
        method: "GET",
        url: `/users/getall?page=${page}&search=${searchQuery}`, // Assuming you have an endpoint like /users
      });
      console.log(response, "response");
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteUserHandler = createAsyncThunk(
  "auth/resetPassword",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await AxiosDefaultSetting({
        method: "DELETE",
        url: `/users/deleteUser/${id}`,
        contentType: "application/json",
      });
      return toast.success(response?.data?.message);
    } catch (error: any) {
      console.log(error?.response?.data?.message, "error");
      toast.error(error?.response?.data?.message);
    }
  }
);
