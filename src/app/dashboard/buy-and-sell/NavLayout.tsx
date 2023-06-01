"use client";
import { buyAndSellRoute, ordersRoute } from "@/lib/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLayout = () => {
  const pathname = usePathname();

  const isOrdersRoute = pathname.endsWith("/orders");

  return (
    <nav className="border border-gray-100 rounded-lg overflow-hidden flex flex-col">
      <Link
        href={buyAndSellRoute}
        className={`p-4 ${!isOrdersRoute ? "bg-gray-100 font-bold" : ""}`}
      >
        Products
      </Link>
      <Link
        href={ordersRoute}
        className={`p-4 border-t border-gray-100 ${
          isOrdersRoute ? "bg-gray-100 font-bold" : ""
        }`}
      >
        Orders
      </Link>
    </nav>
  );
};

export default NavLayout;
