import { createSlice } from "@reduxjs/toolkit";
import { LoginUser, signInUser } from "@/services/authService";
import toast from "react-hot-toast";
import { fetchProducts } from "@/services/productService";

interface ProductsState {
  products: Array<object>;
  loading: boolean;
  totalPages: number;
  currentPage: number;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  totalPages: 1,
  currentPage: 1,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    resetProductData: (state) => {
      state.products = [];
      state.loading = false;
      state.totalPages = 1;
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.totalPages = action.payload.totalPages || 1;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setCurrentPage, resetProductData } = productSlice.actions;
export default productSlice.reducer;
