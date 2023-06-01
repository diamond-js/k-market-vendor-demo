"use client";
import Logo from "@/components/Logo";
import React, { ReactNode, useEffect, useState } from "react";
import { useAuthContext } from "../hooks/authHooks";
import { logout } from "@/lib/firebaseUtils";
import { useRouter } from "next/navigation";
import { homeRoute } from "@/lib/routes";
import { LogoutIcon } from "@/components/icons/logout";
import AppIcon from "@/components/AppIcon";
import { ChevronDown } from "@/components/icons";
import { LoadingModal } from "@/components/LoadingModal";

type Props = {
  children: ReactNode;
};

const layout = ({ children }: Props) => {
  const { user, isLoggedIn, isLoadingUser } = useAuthContext();

  const router = useRouter();

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) router.replace(homeRoute);
  }, [isLoggedIn]);

  if (isLoadingUser) {
    return <LoadingModal />;
  }
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <nav className="mb-8 flex gap-4 flex-col md:flex-row md:justify-between md:items-center">
        <Logo className="w-fit h-7 md:h-10" />
        <div className="w-fit relative">
          <button
            className="bg-gray-100 hover:bg-white flex items-center justify-center gap-2 rounded-lg py-2 px-3"
            onClick={() => setShowProfileDropdown((p) => !p)}
          >
            {user?.email}
            <AppIcon className={showProfileDropdown ? "rotate-180" : ""}>
              <ChevronDown />
            </AppIcon>
          </button>

          {showProfileDropdown && (
            <div className="absolute bg-white p-4 top-full translate-y-3 inset-x-0 rounded-lg border border-gray-200 shadow-xl">
              <button
                className="flex items-center justify-center gap-2 rounded-lg py-2"
                onClick={logout}
              >
                Logout
                <AppIcon>
                  <LogoutIcon />
                </AppIcon>
              </button>
            </div>
          )}
        </div>
      </nav>

      {children}
    </div>
  );
};

export default layout;
