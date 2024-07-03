"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardHeader from "~/components/dashboard/DashboardHeader";
import DashboardHeaderDescription from "~/components/dashboard/DashboardHeaderDescription";
import SideBar from "~/components/dashboard/SideBar";
import { getSavedState } from "~/lib/localStorage";

// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer } from "react-toastify";

interface UserMetadata {
  email: string;
  // email_verified: false;
  first_name: string;
  last_name: string;
  // phone_verified: false;
  profile_picture: string;
  role: string;
  sub: string;
  tag: string;
}

export default function GeneralDashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // const role = getSavedState("taxicoUser")?.user_metadata?.role || "";
  const [userInfo, setUserInfo] = useState<UserMetadata | null>(null);
  const [showSideBar, setShowSideBar] = useState<boolean>(false);

  useEffect(() => {
    const savedUserInfo = getSavedState("taxicoUser")?.user_metadata || null;
    setUserInfo(savedUserInfo);
  }, []);

  return (
    <div
      className={`w-full box-border ${
        showSideBar && "h-screen overflow-hidden"
      } ${pathname.includes("pay-driver") && "h-screen bg-[#F6F7FF]"}`}>
        {/* <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          containerId={"custom-toast-container"}
        /> */}
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
              role={userInfo?.role || ""}
              showSideBar={showSideBar}
              setShowSideBar={setShowSideBar}
            />
            <DashboardHeaderDescription role={userInfo?.role || ""} />
          </>
        )}
        <div className={`w-full`}>
          <div className="w-11/12 mx-auto py-5 md:py-7 box-border">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
