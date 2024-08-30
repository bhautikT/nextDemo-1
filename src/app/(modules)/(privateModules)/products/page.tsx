"use client";
import React, { useEffect, useState } from "react";
import { FaTrash, FaEye, FaEdit } from "react-icons/fa";
import defaultImage from "../../../../../public/assets/images.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { deleteUserHandler, fetchUsers } from "@/services/authService";
import useDebounce from "@/hooks/useDebounce";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { fetchProducts } from "@/services/productService";
import { setCurrentPage } from "@/redux/slice/productSlice";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500); // 500ms delay

  const dispatch: AppDispatch = useDispatch();
  // const { totalPages, currentPage, loading, error } = useSelector(
  //   (state: any) => state.root.products
  // );
  const { products, totalPages, currentPage, loading } = useSelector(
    (state: any) => state.root.products.products
  );

  console.log(products, totalPages, currentPage, loading, "products");

  useEffect(() => {
    if (debouncedSearchQuery !== searchQuery) {
      dispatch(setCurrentPage(1));
    }
  }, [debouncedSearchQuery, dispatch, searchQuery]);

  useEffect(() => {
    dispatch(
      fetchProducts({ page: currentPage, searchQuery: debouncedSearchQuery })
    );
  }, [currentPage, debouncedSearchQuery, dispatch]);

  const DeletePopUp = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const deleteResult = await dispatch(deleteUserHandler(id));

        if (deleteResult.meta.requestStatus === "fulfilled") {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });

          dispatch(setCurrentPage(1));
          // dispatch(fetchUsers({ page: 1, searchQuery: debouncedSearchQuery }));
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the user.",
            icon: "error",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong while deleting the user.",
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg mt-[14px]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">All Products</h1>
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-4 px-6 text-left font-semibold text-gray-600">
                Product Name
              </th>
              <th className="py-4 px-6 text-left font-semibold text-gray-600">
                Category
              </th>
              <th className="py-4 px-6 text-left font-semibold text-gray-600">
                Image
              </th>
              <th className="py-4 px-6 text-left font-semibold text-gray-600">
                Price
              </th>
              <th className="py-4 px-6 text-left font-semibold text-gray-600">
                Stock
              </th>
              <th className="py-4 px-6 text-left font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product: any) => {
              console.log(
                `${process.env.NEXT_PUBLIC_BASE_URL}${product.image[0]}`,
                "234"
              );
              return (
                <tr key={product?.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6  border-gray-200 text-gray-800">
                    {product?.name}
                  </td>
                  <td className="py-4 px-6  border-gray-200 text-gray-800">
                    {product?.category}
                  </td>
                  <td className="py-4 px-6  border-gray-200">
                    <img
                      src={
                        product?.image?.length > 0
                          ? `${process.env.NEXT_PUBLIC_BASE_URL}${product.image[0]}`
                          : defaultImage?.src
                      }
                      alt={product?.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td className="py-4 px-6  border-gray-200 text-gray-800">
                    ${product?.price}
                  </td>
                  <td className="py-4 px-6  border-gray-200 text-gray-800">
                    {product?.stock}
                  </td>
                  <td className="py-4 px-6 border-gray-200 flex space-x-4">
                    <button className="text-blue-500 hover:text-blue-700">
                      <FaEye size={20} />
                    </button>
                    <button className="text-green-500 hover:text-green-700">
                      <FaEdit size={20} />
                    </button>

                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => DeletePopUp(product?._id)}
                    >
                      <FaTrash size={20} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={() => dispatch(setCurrentPage(Math.max(currentPage - 1, 1)))}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            dispatch(setCurrentPage(Math.min(currentPage + 1, totalPages)))
          }
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
