"use client";

import { useAuthContext } from "@/app/hooks/authHooks";
import { useFormState } from "@/app/hooks/form";
import AppButton from "@/components/AppButton";
import AppIcon from "@/components/AppIcon";
import AppInput from "@/components/AppInput";
import AppTextarea from "@/components/AppTextarea";
import { ChevronLeft } from "@/components/icons";
import ArrowRight from "@/components/icons/arrows";
import { db } from "@/lib/AppFirebase";
import { dashboardRoute } from "@/lib/routes";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import Link from "next/link";
import React from "react";

type Props = {};

const page = ({}: Props) => {
  const { user } = useAuthContext();
  const { loading, setLoading } = useFormState();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const businessName = (e.target as any)["businessName"]?.value;
    const businessDescription = (e.target as any)["businessDescription"]?.value;

    if (!businessName) return alert("Please enter a business name");

    if (!user?.uid) return alert("Please Login");

    const vendorRef = doc(db, "vendors", user?.uid);

    setDoc(vendorRef, {
      user: user?.uid,
      businessName,
      businessDescription,
    })
      .then(() => {
        alert("Vendor Profile saved");
      })
      .catch((err) => {
        alert("Sorry could not save changes: " + err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <main className="max-w-3xl mx-auto">
      <header className="mb-10 text-base text-blue-600 flex items-center">
        <AppIcon className="mr-2">
          <ChevronLeft />
        </AppIcon>
        <Link href={dashboardRoute}>Back To Dashboard</Link>
      </header>

      <form
        className="border-gray-100 border rounded-2xl p-8 flex gap-6 flex-col"
        onSubmit={handleSubmit}
      >
        <AppInput
          label="Business Name"
          name="businessName"
        />
        <AppTextarea
          label="Business Description"
          name="businessDescription"
          rows={5}
        />

        <AppButton>{loading ? "Saving..." : "Save"}</AppButton>
      </form>
    </main>
  );
};

export default page;
