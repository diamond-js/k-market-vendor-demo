import { BackButton } from "@/components/BackButton";
import { dashboardRoute } from "@/lib/routes";
import { ReactNode } from "react";
import NavLayout from "./NavLayout";
import StoreLink from "./StoreLink";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="">
      <BackButton route={dashboardRoute}>Dashboard</BackButton>
      <div className="flex gap-6 flex-col lg:flex-row">
        <section>
          <article className="mb-10">
            <h2 className="text-base font-bold mb-4">Menu</h2>
            <NavLayout />
          </article>
          <article className="mb-10">
            <h2 className="text-base font-bold mb-4">Store Details</h2>
            <div className="p-4 bg-white border border-gray-100 rounded-lg  w-full overflow-hidden">
              <h4 className="text-gray-800 text-xl font-bold mb-1">
                Store Link
              </h4>

              <StoreLink />
            </div>
          </article>
        </section>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
