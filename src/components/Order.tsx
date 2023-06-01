import React, { useMemo } from "react";
import { ProductItem } from "./Product";

export type OrderType = {
  id: string;
  products: ProductItem[];
  quantity: number;
  totalPrice: number;
  deliveryMethod: "pickup_delivery" | "door_delivery";
  deliveryStatus: "pendings" | "completed" | "cancelled";
  buyerInfo: { fullName: string; phoneNumber: string; address: string };
};

type Props = {
  order: OrderType;
};

const Order = ({ order }: Props) => {
  return (
    <div className="border border-gray-100 p-4 rounded-lg">
      <p className="capitalize mb-4 text-lg font-bold">
        {order.buyerInfo.fullName}
      </p>

      <p className="mb-3">
        Quantity: <b>{order.quantity}</b>
      </p>
      <p className="mb-3">
        Total price: <b>{order.totalPrice}</b>
      </p>

      <p className="bg-orange-50 font-bold text-sm w-fit px-4 py-1 rounded-full">
        pending
      </p>
    </div>
  );
};

export default Order;
