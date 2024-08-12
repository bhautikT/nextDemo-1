"use client";
import { signInUser } from "@/services/authService";
import withAuthPublic from "@/components/AuthGuard/Auth-wrapper-public";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Signup() {
  const user = useSelector((state: any) => state.root.signIn);
  const dispatch = useDispatch();
  //api call
  useEffect(() => {
    dispatch(signInUser({ data: "ss" }));
  }, []);
  return <div>signup</div>;
}

export default Signup;
