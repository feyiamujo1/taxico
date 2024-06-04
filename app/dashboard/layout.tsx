"use client";
import { usePathname } from "next/navigation";
import DashboardHeader from "~/components/dashboard/DashboardHeader";
import DashboardHeaderDescription from "~/components/dashboard/DashboardHeaderDescription";
import SideBar from "~/components/dashboard/SideBar";

export default async function GeneralDashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div
      className={`flex ${
        pathname.includes("pay-driver") && "h-screen bg-[#F6F7FF] "
      }`}>
      {!pathname.includes("pay-driver") && <SideBar />}
      <main
        className={`flex-grow ${
          !pathname.includes("pay-driver") && "md:ml-[290px]"
        }`}>
        {!pathname.includes("pay-driver") && (
          <>
            {" "}
            <DashboardHeader role="commuter" />
            <DashboardHeaderDescription role="commuter" />
          </>
        )}
        <div className="w-full">
          <div className="w-11/12 mx-auto py-5 md:py-7">{children}</div>
        </div>
      </main>
    </div>
  );
}
