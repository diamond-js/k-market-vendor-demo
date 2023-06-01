"use client";
import AppButton from "@/components/AppButton";
import AppIcon from "@/components/AppIcon";
import { ProductItem } from "@/components/Product";
import { CloseIcon, PlusIcon } from "@/components/icons";
import MinusIcon from "@/components/icons/minus";
import React, { useMemo, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/AppFirebase";

type Props = {
  onClose: () => void;
  vendorId: string;
  cart: CartItem[];
  removeItemFromCart?: (product: ProductItem) => void;
  changeItemQuantity: (product: ProductItem, quantity: number) => void;
};

export type CartItem = {
  product: ProductItem;
  quantity: number;
};

const Cart = ({
  onClose,
  cart,
  removeItemFromCart,
  changeItemQuantity,
  vendorId,
}: Props) => {
  const { quantity, totalPrice } = useMemo(() => {
    const initialSum = { quantity: 0, totalPrice: 0 };

    const sum = cart
      ?.map((p) => ({
        quantity: parseInt(p.quantity as any),
        totalPrice: parseInt(p.product.price as any) * p.quantity,
      }))
      .reduce((prev, curr) => {
        curr.quantity += prev.quantity;
        curr.totalPrice += prev.totalPrice;
        return curr;
      }, initialSum);
    return sum ?? initialSum;
  }, [cart]);

  const [isInCheckoutMode, setIsInCheckoutMode] = useState(false);
  const isCartEmpty = !cart.length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 p-2 md:p-5 animate-fadeIn">
      <div className="bg-white max-w-md w-full rounded-xl h-full ml-auto animate-slideIn flex flex-col ">
        <header className="text-2xl font-bold p-4 flex items-center justify-between">
          {isInCheckoutMode ? "Checkout Form" : "Cart"}
          <button
            onClick={onClose}
            className="w-12 h-12 border border-gray-100 rounded-full text-gray-700 text-lg"
          >
            <AppIcon className="">
              <CloseIcon />
            </AppIcon>
          </button>
        </header>

        {!isInCheckoutMode && (
          <main className="flex-1 pb-3 flex flex-col gap-4 px-4 h-full overflow-auto">
            {isCartEmpty && (
              <div className="flex-1 flex items-center justify-center px-4">
                <p className="text-xl text-gray-600">Your cart is empty</p>
              </div>
            )}
            {cart?.map((item) => {
              return (
                <CartItem
                  key={item.product.id}
                  cartItem={item}
                  removeFromCart={removeItemFromCart}
                  changeItemQuantity={changeItemQuantity}
                />
              );
            })}
          </main>
        )}

        {!isInCheckoutMode && !isCartEmpty && (
          <footer className="p-4 rounded-t-xl border-t border-gray-200 shadow-cart-footer-shadow">
            <div className="flex justify-between mb-3">
              <p className="text-base text-gray-600">Quantity</p>
              <p className="font-bold text-lg text-gray-800">{quantity}</p>
            </div>

            <div className="flex justify-between mb-5">
              <p className="font-semibold text-base text-gray-600">
                Total Price
              </p>
              <p className="font-bold text-lg text-gray-800">N {totalPrice}</p>
            </div>

            <div className="">
              <hr className="border-dashed mb-8" />

              <AppButton
                className="w-full"
                onClick={() => setIsInCheckoutMode(true)}
              >
                Proceed
              </AppButton>
            </div>
          </footer>
        )}

        {isInCheckoutMode && (
          <CheckoutForm
            quantity={quantity}
            totalPrice={totalPrice}
            cart={cart}
            vendorId={vendorId}
            onClose={() => setIsInCheckoutMode(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Cart;

type CartItemProp = {
  cartItem: CartItem;
  removeFromCart?: (product: ProductItem) => void;
  changeItemQuantity: (product: ProductItem, quantity: number) => void;
};

function CartItem({
  cartItem,
  removeFromCart,

  changeItemQuantity,
}: CartItemProp) {
  const { product, quantity } = cartItem;
  return (
    <div className="border-gray-200 border p-4 rounded-lg relative">
      <img
        src={product.imgLink}
        alt={product.name}
        className="w-full aspect-video object-cover bg-gray-200 rounded-lg mb-3"
      />
      <div className="flex justify-between gap-2 mb-3">
        <p className="text-lg font-bold">{product.name}</p>
        <AppIcon onClick={() => removeFromCart?.(product)}>
          <CloseIcon />
        </AppIcon>
      </div>

      <p className="mb-3 text-sm">{product.desc}</p>

      <footer className="flex items-center justify-between flex-wrap gap-2">
        <p className="text-lg font-bold">N{product.price}</p>

        <div className="flex gap-2 items-center">
          <button
            className="border border-gray-800 rounded-lg text-gray-800 px-3 py-2"
            onClick={() =>
              changeItemQuantity(product, quantity <= 1 ? 1 : quantity - 1)
            }
          >
            <AppIcon>
              <MinusIcon />
            </AppIcon>
          </button>
          <p className="font-semibold text-lg">{quantity}</p>
          <button
            className="border border-gray-800 bg-gray-800 rounded-lg text-white px-3 py-2"
            onClick={() => changeItemQuantity(product, quantity + 1)}
          >
            <AppIcon>
              <PlusIcon />
            </AppIcon>
          </button>
        </div>
      </footer>
    </div>
  );
}
