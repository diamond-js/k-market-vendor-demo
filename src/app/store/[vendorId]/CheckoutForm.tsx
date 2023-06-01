import AppButton from "@/components/AppButton";
import AppIcon from "@/components/AppIcon";
import AppInput from "@/components/AppInput";
import { ChevronLeft } from "@/components/icons";
import { db } from "@/lib/AppFirebase";
import { addDoc, collection } from "firebase/firestore";
import React from "react";
import { CartItem } from "./Cart";
import { useFormState } from "@/app/hooks/form";

type Props = {
  onClose: () => void;
  quantity: number;
  totalPrice: number;
  cart: CartItem[];
  vendorId: string;
};

const CheckoutForm = ({
  vendorId,
  onClose,
  quantity,
  totalPrice,
  cart,
}: Props) => {
  const { loading, setLoading } = useFormState();
  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const target = e.target as any;
      const fullName = target.fullName.value;
      const address = target.address.value;
      const phoneNumber = target.phoneNumber.value;

      if (!fullName || !phoneNumber || !address) {
        alert("Please provide all required fields");
        return;
      }

      setLoading(true);

      const buyerInfo = { fullName, phoneNumber, address };

      await addDoc(collection(db, "orders"), {
        quantity,
        totalPrice,
        buyerInfo,
        vendorId,
        productsIds: cart.map((item) => item.product.id),
      });

      alert("Order sent");
      onClose();
    } catch (error) {
      alert("Sorry something went wrong!");
      console.log({ error });
    } finally {
      setLoading(false);
    }
  }
  return (
    <form
      className="p-4"
      onSubmit={(e) => {
        e.preventDefault();
        submitForm(e);
      }}
    >
      <button
        onClick={onClose}
        className="mb-3 flex gap-2 items-center text-blue-600"
      >
        <AppIcon className="">
          <ChevronLeft />
        </AppIcon>
        Back To Cart
      </button>
      <p className="mb-6 text-gray-600">
        Please tell us who is making this order
      </p>

      <div className="flex flex-col gap-4 mb-4">
        <AppInput
          label="Your full name"
          className=""
          name="fullName"
        />
        <AppInput
          label="Your address"
          name="address"
        />
        <AppInput
          label="Your phone number"
          name="phoneNumber"
        />
      </div>
      <AppButton
        disabled={loading}
        className="w-full"
        type="submit"
      >
        {loading ? "Sending" : "Checkout"}
      </AppButton>
    </form>
  );
};

export default CheckoutForm;
