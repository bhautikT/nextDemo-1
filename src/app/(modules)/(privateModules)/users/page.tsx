"use client";
import React, { useState } from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import defaultImage from "../../../../../public/assets/images.png";

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Sample data
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      profile_image: "/profile1.jpg",
      provider: "Google",
    },
    // Add more users here
  ];

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const displayedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  console.log(defaultImage, "defaultImage");

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
          {displayedUsers.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="py-4 px-6 border-b border-gray-200 text-gray-800">
                {user.name}
              </td>
              <td className="py-4 px-6 border-b border-gray-200 text-gray-800">
                {user.email}
              </td>
              <td className="py-4 px-6 border-b border-gray-200">
                <img
                  src={defaultImage.src}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </td>
              <td className="py-4 px-6 border-b border-gray-200 text-gray-800">
                {user.provider}
              </td>
              <td className="py-4 px-6  border-gray-200 flex space-x-4">
                <button className="text-blue-500 hover:text-blue-700">
                  <FaEye size={20} />
                </button>
                <button className="text-green-500 hover:text-green-700">
                  <FaEdit size={20} />
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <FaTrash size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
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

export default Users;
