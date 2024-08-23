"use client";

import { logout } from "@/redux/slice/authSlice";
import { AppDispatch } from "@/redux/store";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function User() {
  const { data: session } = useSession();
  const dispatch: AppDispatch = useDispatch();
  const UserData = useSelector((state: any) => state.root.signIn.loginData);
  const router = useRouter();

  if (session) {
    console.log(session.user?.image, "12333");
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="w-44 h-44 relative mb-4">
          <img
            src={session.user?.image as string}
            alt=""
            className="object-cover rounded-full"
          />
        </div>
        <p className="text-2xl mb-2">
          Welcome <span className="font-bold">{session.user?.name}</span>.
          Signed In As
        </p>
        <p className="font-bold mb-4">{session.user?.email}</p>
        <button
          className="bg-red-600 py-2 px-6 rounded-md"
          onClick={() => {
            signOut({ callbackUrl: "/auth/loginPage" });
          }}
        >
          Sign out
        </button>
      </div>
    );
  } else if (UserData?.token) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="w-44 h-44 relative mb-4">
          <img
            src={UserData?.user?.profile_image[0]}
            alt=""
            className="object-cover rounded-full"
          />
        </div>
        <p className="text-2xl mb-2">
          Welcome <span className="font-bold">{UserData?.user?.name}</span>.
          Signed In As
        </p>
        <p className="font-bold mb-4">{UserData?.user?.email}</p>
        <button
          className="bg-red-600 py-2 px-6 rounded-md"
          onClick={() => {
            dispatch(logout());
            router.push("/auth/loginPage");
          }}
        >
          Sign out
        </button>
      </div>
    );
  }
}

export default User;
