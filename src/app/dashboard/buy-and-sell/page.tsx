import { BackButton } from "@/components/BackButton";
import {
  addProductRoute,
  buyAndSellRoute,
  dashboardRoute,
  hostUrl,
} from "@/lib/routes";
import Link from "next/link";
import React from "react";
import ListProducts from "./ListProducts";
import AppIcon from "@/components/AppIcon";
import { PlusIcon } from "@/components/icons";
import AppButton from "@/components/AppButton";

type Props = {};

const page = ({}: Props) => {
  return (
    <section>
      <h2 className="text-base font-bold mb-4">Products</h2>

      <section>
        <Link
          href={addProductRoute}
          className="block mb-10 "
        >
          <AppButton className="">
            Add Products
            <AppIcon className="text-lg">
              <PlusIcon />
            </AppIcon>
          </AppButton>
        </Link>

        {/* List Produts */}
        <ListProducts />
      </section>
    </section>
  );
};

export default page;
