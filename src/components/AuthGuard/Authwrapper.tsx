"use client";
import { ComponentType, useEffect } from "react";
//import { routes } from "@/routes";
//import Loadercomponent from "@/components/common/Loadercomponent";
import { useRouter } from "next/navigation";

//auth props
type WithAuthProps = {
  [key: string]: any;
};
const withAuth = <P extends WithAuthProps>(WrappedComponent: ComponentType<P>) => {
  // This function will be part of the component's return, ensuring it only runs client-side.
  const verifyToken = () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    // Implement your token verification logic here
    return !!token;
  };

  return (props: P) => {
    const router = useRouter();
    const isAuthenticated = verifyToken();

    useEffect(() => {
      // Since verifyToken checks the window object, it's safe to call here; it won't run server-side.
      if (!isAuthenticated) {
        router.replace("/auth/loginPage");
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      // Display a loader or any placeholder while the redirection is in progress
      return <p>Loading....</p>;
    }

    // Only mount the wrapped component if authenticated
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
