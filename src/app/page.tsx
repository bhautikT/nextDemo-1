"use client";
import withAuth from "@/components/AuthGuard/Authwrapper";
import React from "react";
import { useSelector } from "react-redux";
import Dashboard from "./(modules)/(privateModules)/dashboard/page";

function Home() {
  return (
    <div>
      <Dashboard />
    </div>
  );
}

export default withAuth(Home);
