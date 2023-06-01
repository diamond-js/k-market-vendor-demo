"use client";
import { useAuthContext } from "@/app/hooks/authHooks";
import { useFormState } from "@/app/hooks/form";
import AppButton from "@/components/AppButton";
import AppIcon from "@/components/AppIcon";
import AppInput from "@/components/AppInput";
import AppTextarea from "@/components/AppTextarea";
import { BackButton } from "@/components/BackButton";
import { CheckIcon } from "@/components/icons";
import { db } from "@/lib/AppFirebase";
import { buyAndSellRoute } from "@/lib/routes";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";

type Props = {};

const images = [
  {
    name: "nails",
    link: "https://images.unsplash.com/photo-1605701249987-f0bb9b505d06?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2NyZXd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "nails",
    link: "https://images.unsplash.com/photo-1625773084027-5ede6d300b25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNjcmV3fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "hammer",
    link: "https://plus.unsplash.com/premium_photo-1676901918792-f6e04df8b7b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGFtbWVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "hammer",
    link: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGFtbWVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "hammer",
    link: "https://plus.unsplash.com/premium_photo-1677108530122-2e35f2a0c6c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhhbW1lcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },

  {
    name: "paint",
    link: "https://plus.unsplash.com/premium_photo-1681487367144-3ac7acfead6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFpbnQlMjBidWNrZXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
  },

  {
    name: "paint",
    link: "https://images.unsplash.com/photo-1585676737728-432f58d5fdba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFpbnQlMjBidWNrZXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "paint",
    link: "https://images.unsplash.com/photo-1623835255306-868c63d9335e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGFpbnQlMjBidWNrZXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
  },
];

const page = ({}: Props) => {
  const { user } = useAuthContext();
  const { loading, setLoading } = useFormState();

  const [selectedImg, setSelectedImg] = useState(images[0].link);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const name = (e.target as any)["name"]?.value;
    const desc = (e.target as any)["desc"]?.value;
    const price = (e.target as any)["price"]?.value;

    if (!name || !desc || !price) return alert("Please fill in all fields");

    if (!user?.uid) return alert("Please Login");

    const productColRef = collection(db, "products");

    addDoc(productColRef, {
      user: user?.uid,
      name,
      desc,
      price,
      imgLink: selectedImg,
    })
      .then(() => {
        alert("Product Created");
      })
      .catch((err) => {
        alert("Sorry could not create product: " + err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <main className="max-w-3xl mx-auto">
      <BackButton route={buyAndSellRoute}>Store</BackButton>

      <form
        className="border-gray-100 border rounded-2xl p-8 flex gap-6 flex-col"
        onSubmit={handleSubmit}
      >
        <AppInput
          label="Product Name"
          name="name"
        />
        <AppInput
          label="Product Price"
          name="price"
          type="number"
        />
        <AppTextarea
          label="Product Description"
          name="desc"
          rows={5}
        />

        <p className="font-medium">Select Demo Images</p>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 justify-between">
          {images.map((image, index) => {
            const isSelected = selectedImg === image.link;
            return (
              <li
                key={index}
                className={`${isSelected ? "rounded-lg bg-gray-700" : ""} p-2`}
                onClick={() => setSelectedImg(image.link)}
              >
                <img
                  src={image.link}
                  alt={image.name}
                  className="w-full aspect-video object-cover bg-gray-200 rounded-sm mb-2"
                />
                <p className="text-lg font-semibold capitalize flex justify-between items-center">
                  <span className={isSelected ? "text-white" : "text-gray-800"}>
                    {image.name}
                  </span>

                  {isSelected && (
                    <AppIcon className="rounded-full w-6 h-6 bg-white">
                      <CheckIcon />
                    </AppIcon>
                  )}
                </p>
              </li>
            );
          })}
        </ul>

        <AppButton>{loading ? "Creating..." : "Create"}</AppButton>
      </form>
    </main>
  );
};

export default page;
