"use client";
import { useAuthContext } from "@/app/hooks/authHooks";
import { hostUrl } from "@/lib/routes";

const StoreLink = () => {
  const { user } = useAuthContext();
  const storeLink = hostUrl + "/store/" + user?.uid;
  return (
    <>
      <p className="text-gray-600 text-xs mb-6 overflow-hidden">{storeLink}</p>
      <button
        onClick={async () => {
          navigator.clipboard
            .writeText(storeLink)
            .then(() => alert("Link copied"))
            .catch(() => alert("Sorry, could not copy link"));
        }}
        className="min-w-full py-2 px-4 rounded-lg border border-gray-100 text-gray-800 hover:bg-gray-800 hover:text-white flex items-center justify-center gap-1 leading-none"
      >
        copy link
      </button>
    </>
  );
};

export default StoreLink;
