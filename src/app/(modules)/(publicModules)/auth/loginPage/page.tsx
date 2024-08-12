"use client";
import withAuthPublic from "@/components/AuthGuard/Auth-wrapper-public";
import React from "react";
import { useSelector } from "react-redux";

function Login() {
  //get sigin user data
  const user = useSelector((state: any) => state.root.signIn);
  console.log("user", user);
  return <div>signup</div>;
}

export default Login;
