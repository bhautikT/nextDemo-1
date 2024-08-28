"use client";
import { useEffect, ComponentType } from "react";
//import { routes } from "@/routes";
//import Loadercomponent from "@/components/common/Loadercomponent";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

// // Define a type for the props of the WrappedComponent
// type WithAuthProps = {
//   [key: string]: any;
// };

const withAuthPublic = (WrappedComponent: any) => {
  // This function will be part of the component's return, ensuring it only runs client-side.
  const verifyToken = (): boolean => {
    const UserData = useSelector((state: any) => state.root.signIn.loginData);
    const userSession: any = localStorage.getItem("userSession");
    const sessionData = JSON.parse(userSession);
    const token = typeof window !== "undefined" ? UserData?.token : null;
    // Implement your token verification logic here
    return !!token || !!sessionData;
  };

  return (props: any) => {
    const router = useRouter();
    const isAuthenticated = verifyToken();

    useEffect(() => {
      // Since verifyToken checks the window object, it's safe to call here; it won't run server-side.
      if (isAuthenticated) {
        router.replace("/users");
      }
    }, [isAuthenticated, router]);

    if (isAuthenticated) {
      // Display a loader or any placeholder while the redirection is in progress
      return <p>loading</p>;
    }

    // Only mount the wrapped component if authenticated
    return <WrappedComponent {...props} />;
  };
};

export default withAuthPublic;
