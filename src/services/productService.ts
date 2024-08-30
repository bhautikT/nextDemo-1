import AxiosDefaultSetting from "@/AxiosSetting";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// Thunk to fetch users with pagination and search query
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (
    { page, searchQuery }: { page: number; searchQuery: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await AxiosDefaultSetting({
        method: "GET",
        url: `/product/products?page=${page}&search=${searchQuery}`,
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
