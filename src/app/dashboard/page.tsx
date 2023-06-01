"use client";

import Link from "next/link";

import { buyAndSellRoute, setupVendorAccountRoute } from "@/lib/routes";
import AppIcon from "@/components/AppIcon";
import ArrowRight from "@/components/icons/arrows";

type Props = {};

const page = ({}: Props) => {
  return (
    <main>
      <section className="p-4 bg-white border border-gray-100 rounded-lg flex sm:items-center justify-between flex-col sm:flex-row mb-14 gap-4">
        <div>
          <h3 className="text-gray-800 text-xl font-bold mb-1">
            Setup A Vendor Profile
          </h3>
          <p className="text-gray-600">
            Start selling, holding appointments, running payrolls and more
          </p>
        </div>
        <Link
          href={setupVendorAccountRoute}
          className="min-w-fit py-2 px-4 rounded-lg bg-gray-800 text-white"
        >
          Get Started
        </Link>
      </section>

      <h3 className="text-lg font-bold mb-4">Features</h3>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div className="p-4 bg-white border border-gray-100 rounded-lg">
          <h4 className="text-gray-800 text-xl font-bold mb-1">Buy & Sell</h4>
          <p className="text-gray-600 mb-6">
            An ecommerce system for your customers to buy products form your
            store.
          </p>
          <Link
            href={buyAndSellRoute}
            className="min-w-full py-2 px-4 rounded-lg border border-gray-100 text-gray-800 hover:bg-gray-800 hover:text-white flex items-center justify-center gap-1 leading-none"
          >
            view
            <AppIcon>
              <ArrowRight />
            </AppIcon>
          </Link>
        </div>
        <div className="p-4 bg-white border border-gray-100 rounded-lg">
          <h4 className="text-gray-800 text-xl font-bold mb-1">
            Home Services
          </h4>
          <p className="text-gray-600 mb-6">
            Setup a way your customers can make home service appointments with
            you
          </p>
          <button className="min-w-full py-2 px-4 rounded-lg border border-gray-100 text-gray-800 hover:bg-gray-800 hover:text-white flex items-center justify-center gap-1 leading-none">
            view
            <AppIcon>
              <ArrowRight />
            </AppIcon>
          </button>
        </div>
        <div className="p-4 bg-white border border-gray-100 rounded-lg">
          <h4 className="text-gray-800 text-xl font-bold mb-1">Booking</h4>
          <p className="text-gray-600 mb-6">
            Setup a booking system for your Store like a hotel or barbing salon
          </p>
          <button className="min-w-full py-2 px-4 rounded-lg border border-gray-100 text-gray-800 hover:bg-gray-800 hover:text-white flex items-center justify-center gap-1 leading-none">
            view
            <AppIcon>
              <ArrowRight />
            </AppIcon>
          </button>
        </div>
        <div className="p-4 bg-white border border-gray-100 rounded-lg">
          <h4 className="text-gray-800 text-xl font-bold mb-1">Fliping</h4>
          <p className="text-gray-600 mb-6">
            Meet people to swap goods with in k-market
          </p>
          <button className="min-w-full py-2 px-4 rounded-lg border border-gray-100 text-gray-800 hover:bg-gray-800 hover:text-white flex items-center justify-center gap-1 leading-none">
            view
            <AppIcon>
              <ArrowRight />
            </AppIcon>
          </button>
        </div>
      </section>
    </main>
  );
};

export default page;
