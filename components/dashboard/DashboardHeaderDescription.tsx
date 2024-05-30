import { usePathname } from "next/navigation";
import React from "react";

const DashboardHeaderDescription = ({ role }: { role: string }) => {
  const currentRoute = usePathname();

  return (
    <div className={currentRoute.includes("/account")
    ? "w-full border-t bg-grey"
    : "w-full border-y bg-grey"}>
      <div
        className={
          currentRoute.includes("/account")
            ? "hidden"
            : "w-11/12 mx-auto py-5 md:py-7 space-y-1"
        }>
        <p className=" text-lg font-medium">
          {currentRoute === "/dashboard" && role === "commuter"
            ? "Manage your tickets"
            : currentRoute === "/dashboard" && role === "driver"
            ? "Manage your wallets"
            : currentRoute === "/dashboard" && role === "admin"
            ? "Analytics"
            : currentRoute.includes("/wallet")
            ? "Manage your wallet"
            : currentRoute.includes("/verification")
            ? "Verification Successful"
            : currentRoute.includes("/drivers")
            ? "Drivers"
            : currentRoute.includes("/user-accounts")
            ? "All Users"
            : null}
        </p>
        <p className="text-link-ash text-sm">
          {currentRoute === "/dashboard" && role === "commuter"
            ? "See your used and unused tickets"
            : currentRoute === "/dashboard" && role === "driver"
            ? "See your balance and initiate withdrawals"
            : currentRoute === "/dashboard" && role === "admin"
            ? "All the analytics for your Taxico account"
            : currentRoute.includes("/wallet")
            ? "All your transaction logs are here"
            : currentRoute.includes("/verification-pending")
            ? "Your verification is still pending"
            : currentRoute.includes("/drivers")
            ? "Details of the drivers onboarded on taxico"
            : currentRoute.includes("/user-accounts")
            ? "Details of all the users on the platform"
            : null}
        </p>
      </div>
    </div>
  );
};

export default DashboardHeaderDescription;
