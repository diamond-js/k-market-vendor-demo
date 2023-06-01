import { dashboardRoute } from "@/lib/routes";
import Link from "next/link";
import { ChevronLeft } from "./icons";
import AppIcon from "./AppIcon";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  route: string;
};

export const BackButton = ({ route, children }: Props) => {
  return (
    <header className="mb-10 text-base text-blue-600 flex items-center">
      <AppIcon className="mr-2">
        <ChevronLeft />
      </AppIcon>
      <Link href={route}>Back To {children}</Link>
    </header>
  );
};
