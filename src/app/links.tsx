"use client";

import { loginRoute, signupRoute, dashboardRoute } from "@/lib/routes";
import Link from "next/link";
import { useAuthContext } from "./hooks/authHooks";
import { logout } from "@/lib/firebaseUtils";

export const Links = () => {
  const { isLoggedIn, user } = useAuthContext();

  console.log({ user });

  return (
    <>
      {isLoggedIn ? (
        <p
          className="cursor-pointer"
          onClick={logout}
        >
          Logout
        </p>
      ) : (
        <>
          <Link href={loginRoute}>Login</Link>
          <br />
          <br />
          <Link href={signupRoute}>Signup</Link>
          <br />
          <br />
        </>
      )}

      <Link href={dashboardRoute}>Dashboard</Link>
    </>
  );
};
