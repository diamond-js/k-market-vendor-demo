import Image from "next/image";

import logo from "../../public/logo.svg";
export default function ({
  size = "",
  className,
}: {
  size?: "" | "h-10" | "h-6" | "h-2";
  className?: string;
}) {
  return (
    <Image
      src={logo}
      alt="K Market Vendor"
      className={`${size} w-auto ${className}`}
    />
  );
}
