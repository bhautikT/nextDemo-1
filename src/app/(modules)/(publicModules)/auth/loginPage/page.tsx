"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSession, signIn, signOut } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "@/services/authService";
import { AppDispatch } from "@/redux/store";
import { logout } from "@/redux/slice/authSlice";
import toast from "react-hot-toast";
import Link from "next/link";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required")
    .trim("No leading or trailing spaces allowed")
    .strict(true),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required")
    .trim("No leading or trailing spaces allowed")
    .strict(true),
});

export default function Login() {
  const { data: session } = useSession();
  const dispatch: AppDispatch = useDispatch();
  const UserData = useSelector((state: any) => state.root.signIn.loginData);

  console.log(UserData, "useData");

  // Form setup with react-hook-form and Yup validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    console.log(data, "datatatata");
    try {
      const response = await dispatch(LoginUser(data));
      // Handle success
      console.log("Success:", response);
      toast.success("login successfully");
    } catch (error) {
      // Handle error
      console.error("Error:", error);
    }
  };

  if (session) {
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
          onClick={() => signOut()}
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
          onClick={() => dispatch(logout())}
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm mb-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <p className="text-red-500 text-xs mt-1">
            {errors.password?.message}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Sign in
          </button>
          <Link href="/auth/signupPage" className="text-black ">
            Sign Up
          </Link>
        </div>
      </form>
      <p className="text-2xl mb-2">Or sign in with</p>
      <button
        className="bg-none border-gray-300 border py-2 px-6 rounded-md mb-2"
        onClick={() => signIn("github")}
      >
        Sign in with GitHub
      </button>
      <button
        className="bg-none border-gray-300 border py-2 px-6 rounded-md mb-2"
        onClick={() => signIn("google")}
      >
        Sign in with Google
      </button>
      <button
        className="bg-none border-gray-300 border py-2 px-6 rounded-md mb-2"
        onClick={() => signIn("twitter")}
      >
        Sign in with Twitter
      </button>
      <button
        className="bg-none border-gray-300 border py-2 px-6 rounded-md mb-2"
        onClick={() => signIn("facebook")}
      >
        Sign in with Facebook
      </button>
      <button
        className="bg-none border-gray-300 border py-2 px-6 rounded-md mb-2"
        onClick={() => signIn("linkedin")}
      >
        Sign in with LinkedIn
      </button>
    </div>
  );
}
