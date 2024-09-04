import AxiosDefaultSetting from "@/AxiosSetting";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface EditProductPayload {
  id: string;
  formData: FormData;
}

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

export const addProducts = createAsyncThunk(
  "auth/addProduct",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await AxiosDefaultSetting({
        method: "POST",
        data: formData,
        url: "/product/products",
        contentType: "multipart/form-data", // Ensure content type is set for FormData
      });
      return response.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const EditProducts = createAsyncThunk(
  "auth/editProduct", // Updated action type
  async (payload: EditProductPayload, { rejectWithValue }) => {
    try {
      const response = await AxiosDefaultSetting({
        method: "PATCH",
        data: payload.formData,
        url: `/product/products/${payload.id}`,

        contentType: "multipart/form-data",
      });
      return toast.success(response?.data?.message);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const getSingleProduct = createAsyncThunk(
  "auth/getSingleProduct",
  async (id: string) => {
    try {
      const response = await AxiosDefaultSetting({
        method: "GET",
        url: `/product/products/${id}`,
        contentType: "application/json",
      });
      console.log(response.data.data, "34");
      return response.data.data;
    } catch (error: any) {
      console.log(error?.response?.data?.message, "error");
      toast.error(error?.response?.data?.message);
    }
  }
);

export const deleteProductHandler = createAsyncThunk(
  "auth/deleteProduct",
  async (id: string) => {
    try {
      const response = await AxiosDefaultSetting({
        method: "DELETE",
        url: `/product/products/${id}`,
        contentType: "application/json",
      });
      return toast.success(response?.data?.message);
    } catch (error: any) {
      console.log(error?.response?.data?.message, "error");
      toast.error(error?.response?.data?.message);
    }
  }
);
