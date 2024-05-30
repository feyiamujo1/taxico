"use client";
import DashboardHeader from "~/components/dashboard/DashboardHeader";
import DashboardHeaderDescription from "~/components/dashboard/DashboardHeaderDescription";
import SideBar from "~/components/dashboard/SideBar";

export default async function GeneralDashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <SideBar />
      <main className="flex-grow md:ml-[290px]">
        <DashboardHeader role="commuter" />
        <DashboardHeaderDescription role="commuter" />
        <div className="w-full">
          <div className="w-11/12 mx-auto py-5 md:py-7">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
