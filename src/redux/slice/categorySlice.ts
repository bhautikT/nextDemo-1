import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCategories,
  GetAllCategories,
  getSingleCategory,
} from "@/services/categoryService";

interface CategoriesState {
  categories: Array<object>;
  allCategoriesData: Array<object>;
  singleCategory: Object;
  loading: boolean;
  totalPages: number;
  currentPage: number;
}

const initialState: CategoriesState = {
  categories: [],
  singleCategory: {},
  allCategoriesData: [],
  loading: false,
  totalPages: 1,
  currentPage: 1,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    resetCategoryData: (state) => {
      state.categories = [];
      state.allCategoriesData = [];
      state.singleCategory = {};
      state.loading = false;
      state.totalPages = 1;
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetAllCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(GetAllCategories.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.allCategoriesData = action.payload;
        state.totalPages = action.payload.totalPages || 1;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getSingleCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.singleCategory = action.payload;
      })
      .addCase(getSingleCategory.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { resetCategoryData, setCurrentPage } = categorySlice.actions;
export default categorySlice.reducer;
