"use client";
import { useAuthContext } from "@/app/hooks/authHooks";
import Order, { OrderType } from "@/components/Order";
import { db } from "@/lib/AppFirebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";

type Props = {};

const page = (props: Props) => {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<OrderType[]>([]);

  function fetchOrders() {
    const q = query(
      collection(db, "orders"),
      where("vendorId", "==", user?.uid)
    );

    const unsub = onSnapshot(q, (querySnapshot) => {
      const newOrders: any[] = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      setOrders(newOrders);
      console.log({ newOrders });

      setIsLoading(false);
    });

    return unsub;
  }
  useEffect(() => {
    if (!user?.uid) {
      return () => {};
    }
    return fetchOrders();
  }, [user]);

  return (
    <>
      {isLoading && (
        <p className="mb-6 font-bold bg-zinc-400 text-white rounded-lg py-2 px-4 w-fit  flex items-center justify-center gap-1 relative">
          Loading...
          <span className="w-4 h-4 bg-white animate-ping block rounded-full absolute right-4"></span>
        </p>
      )}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 w-full">
        {orders.map((order) => (
          <Order
            key={order.id}
            order={order}
          />
        ))}
      </div>
    </>
  );
};

export default page;
