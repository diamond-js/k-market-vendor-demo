"use client";

import { AuthContext } from "../hooks/authHooks";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/AppFirebase";
import { isUserLoggedIn } from "@/lib/firebaseUtils";

export default function AuthContextProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  const isLoggedIn = loading ? true : isUserLoggedIn(user);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      console.log("User state changed to", user?.email);
    });
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, isLoadingUser: loading, isLoggedIn: isLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
}
