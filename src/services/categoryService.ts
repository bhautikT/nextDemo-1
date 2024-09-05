import AxiosDefaultSetting from "@/AxiosSetting";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface EditCategoryPayload {
  id: string;
  formData: Object;
}

// Thunk to fetch Category for Product
export const GetAllCategories = createAsyncThunk(
  "product/getCategories",
  async () => {
    try {
      const response = await AxiosDefaultSetting({
        method: "GET",
        url: `/category/getcategory`,
      });
      console.log(response, "response");
      return response.data.data.categories;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const AddCategoryHandler = createAsyncThunk(
  "auth/addCategory",
  async (formData: Object, { rejectWithValue }) => {
    try {
      const response = await AxiosDefaultSetting({
        method: "POST",
        data: formData,
        url: "/category/addcategory",
        contentType: "application/json",
      });
      return response.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// Thunk to fetch users with pagination and search query
export const fetchCategories = createAsyncThunk(
  "product/fetchCategories",
  async (
    { page, searchQuery }: { page: number; searchQuery: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await AxiosDefaultSetting({
        method: "GET",
        url: `/category/getcategory?page=${page}&search=${searchQuery}`,
      });
      console.log(response, "response");
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getSingleCategory = createAsyncThunk(
  "auth/getSingleCategory",
  async (id: string) => {
    try {
      const response = await AxiosDefaultSetting({
        method: "GET",
        url: `/category/getcategory/${id}`,
        contentType: "application/json",
      });
      console.log(response.data.data, "34");
      return response.data.data.category;
    } catch (error: any) {
      console.log(error?.response?.data?.message, "error");
      toast.error(error?.response?.data?.message);
    }
  }
);

export const EditCategoryHandler = createAsyncThunk(
  "auth/editCategory",
  async (payload: EditCategoryPayload, { rejectWithValue }) => {
    try {
      const response = await AxiosDefaultSetting({
        method: "PATCH",
        data: payload.formData,
        url: `/category/updatecategory/${payload.id}`,
        contentType: "application/json",
      });
      return toast.success(response?.data?.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const deleteCategoryHandler = createAsyncThunk(
  "auth/deleteCategory",
  async (id: string) => {
    try {
      const response = await AxiosDefaultSetting({
        method: "DELETE",
        url: `/category/deletecategory/${id}`,
        contentType: "application/json",
      });
      return toast.success(response?.data?.message);
    } catch (error: any) {
      console.log(error?.response?.data?.message, "error");
      toast.error(error?.response?.data?.message);
    }
  }
);
