"use client";

import { logout } from "@/redux/slice/authSlice";
import { AppDispatch } from "@/redux/store";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import userimage from "../../../../../public/assets/images.png";
import { resetData } from "@/redux/slice/userSlice";
import { resetProductData } from "@/redux/slice/productSlice";
import { resetCategoryData } from "@/redux/slice/categorySlice";

function User() {
  const { data: session } = useSession();
  const dispatch: AppDispatch = useDispatch();
  const UserData = useSelector((state: any) => state.root.signIn.loginData);
  const router = useRouter();

  const handleSignOut = () => {
    if (session) {
      localStorage.removeItem("userSession");
      dispatch(resetData());
      dispatch(resetProductData());
      dispatch(resetCategoryData());

      signOut({ callbackUrl: "/auth/loginPage" });
    } else {
      dispatch(logout());
      dispatch(resetData());
      dispatch(resetProductData());
      dispatch(resetCategoryData());

      router.push("/auth/loginPage");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="w-32 h-32 mb-4 overflow-hidden rounded-full border-4 border-gray-200 bg-white shadow-md">
        <img
          src={
            session && session.user?.image
              ? (session.user?.image as string)
              : userimage?.src
          }
          alt="Profile"
          className="object-cover w-full h-full"
        />
      </div>
      <p className="text-2xl font-semibold mb-2">
        Welcome{" "}
        <span className="font-bold">
          {session ? session.user?.name : UserData?.user?.name}
        </span>
      </p>
      <p className="text-lg font-medium mb-4">
        {session ? session.user?.email : UserData?.user?.email}
      </p>
      <button
        className="bg-red-600 text-white py-2 px-6 rounded-md shadow-lg hover:bg-red-700 transition duration-300"
        onClick={handleSignOut}
      >
        Sign out
      </button>
    </div>
  );
}

export default User;
