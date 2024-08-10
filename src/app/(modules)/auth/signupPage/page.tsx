"use client";
import React from "react";
import { useSelector } from "react-redux";

function Signup() {
  const user = useSelector((state: any) => state.root.signIn);
  console.log("user", user);
  return <div>signup</div>;
}

export default Signup;
