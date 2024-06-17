"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import DashboardHeader from "~/components/dashboard/DashboardHeader";
import DashboardHeaderDescription from "~/components/dashboard/DashboardHeaderDescription";
import SideBar from "~/components/dashboard/SideBar";
import { getSavedState } from "~/lib/localStorage";

export default function GeneralDashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const role = getSavedState("taxicoUser")?.user_metadata?.role || "";
  const [showSideBar, setShowSideBar] = useState<boolean>(false);

  return (
    <div
      className={`w-full box-border relative ${
        pathname.includes("pay-driver") && "h-screen bg-[#F6F7FF]"
      }`}>
      {!pathname.includes("pay-driver") && (
        <SideBar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
      )}
      <main
        className={`flex-grow ${
          !pathname.includes("pay-driver") && "md:ml-[290px]"
        }`}>
        {!pathname.includes("pay-driver") && (
          <>
            <DashboardHeader
              role={role}
              showSideBar={showSideBar}
              setShowSideBar={setShowSideBar}
            />
            <DashboardHeaderDescription role={role} />
          </>
        )}
        <div className="w-full">
          <div className="w-11/12 mx-auto py-5 md:py-7 box-border">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
