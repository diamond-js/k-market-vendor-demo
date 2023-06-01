"use client";
import { useAuthContext } from "@/app/hooks/authHooks";
import Product, { ProductItem } from "@/components/Product";
import { db } from "@/lib/AppFirebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const ListProducts = () => {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<ProductItem[]>([]);

  useEffect(() => {
    if (!user?.uid) {
      return () => {};
    }

    const q = query(collection(db, "products"), where("user", "==", user?.uid));

    const unsub = onSnapshot(q, (querySnapshot) => {
      const newProducts: any[] = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      setProducts(newProducts);
      setIsLoading(false);
    });

    return unsub;
  }, [user]);

  return (
    <>
      {isLoading && (
        <p className="mb-6 font-bold bg-zinc-400 text-white rounded-lg py-2 px-4 w-fit  flex items-center justify-center gap-1 relative">
          Loading...
          <span className="w-4 h-4 bg-white animate-ping block rounded-full absolute right-4"></span>
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </>
  );
};

export default ListProducts;
