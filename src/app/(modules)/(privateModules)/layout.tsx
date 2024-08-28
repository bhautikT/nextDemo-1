"use client";
import { useIsMounted } from "@/hooks/use-is-Mounted";
import withAuth from "@/components/AuthGuard/Authwrapper";

function DefaultLayout({ children }: { children: React.ReactNode }) {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  return <div>{children}</div>;
}

export default withAuth(DefaultLayout);
