"use client";
import React, { useEffect, useState } from "react";
import { FaTrash, FaEye } from "react-icons/fa";
import defaultImage from "../../../../../public/assets/images.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { deleteUserHandler, fetchUsers } from "@/services/authService";
import { setCurrentPage } from "@/redux/slice/userSlice";
import useDebounce from "@/hooks/useDebounce";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500); // 500ms delay
  const { data: session } = useSession();
  const UserData = useSelector((state: any) => state.root.signIn.loginData);

  const dispatch: AppDispatch = useDispatch();
  const { users, totalPages, currentPage, loading, error } = useSelector(
    (state: any) => state.root.users
  );

  useEffect(() => {
    if (debouncedSearchQuery !== searchQuery) {
      dispatch(setCurrentPage(1));
    }
  }, [debouncedSearchQuery, dispatch, searchQuery]);

  useEffect(() => {
    dispatch(
      fetchUsers({ page: currentPage, searchQuery: debouncedSearchQuery })
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
          dispatch(fetchUsers({ page: 1, searchQuery: debouncedSearchQuery }));
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
        <h1 className="text-3xl font-semibold text-gray-800">All Users</h1>
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
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-4 px-6 text-left font-semibold text-gray-600">
                Name
              </th>
              <th className="py-4 px-6 text-left font-semibold text-gray-600">
                Email
              </th>
              <th className="py-4 px-6 text-left font-semibold text-gray-600">
                Profile Image
              </th>
              <th className="py-4 px-6 text-left font-semibold text-gray-600">
                Provider
              </th>
              <th className="py-4 px-6 text-left font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user: any) => (
              <tr key={user?.id} className="hover:bg-gray-50">
                <td className="py-4 px-6  border-gray-200 text-gray-800">
                  {user?.name}
                </td>
                <td className="py-4 px-6  border-gray-200 text-gray-800">
                  {user?.email}
                </td>
                <td className="py-4 px-6  border-gray-200">
                  <img
                    src={
                      user.profile_image?.length > 0 && user?.provider
                        ? user.profile_image
                        : defaultImage.src
                    }
                    alt={user?.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>
                <td className="py-4 px-6  border-gray-200 text-gray-800">
                  {user?.provider ? user?.provider : "-"}
                </td>
                <td className="py-4 px-6 border-gray-200 flex space-x-4">
                  {/* <button className="text-blue-500 hover:text-blue-700">
                    <FaEye size={20} />
                  </button> */}
                  {/* <button className="text-green-500 hover:text-green-700">
                    <FaEdit size={20} />
                  </button> */}
                  {!(
                    session?.user?.email === user?.email ||
                    UserData?.user?.email === user?.email
                  ) && (
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => DeletePopUp(user?._id)}
                    >
                      <FaTrash size={20} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={() => dispatch(setCurrentPage(currentPage - 1))}
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
          onClick={() => dispatch(setCurrentPage(currentPage + 1))}
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

export default Users;
