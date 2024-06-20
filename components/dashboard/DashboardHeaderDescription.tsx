import { Divide } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

const DashboardHeaderDescription = ({ role }: { role: string }) => {
  const currentRoute = usePathname();

  return role ? (
    <div
      className={
        currentRoute.includes("/account")
          ? "w-full border-t bg-grey"
          : "w-full border-y bg-grey"
      }>
      <div
        className={
          currentRoute.includes("/account")
            ? "hidden"
            : "w-11/12 mx-auto py-5 md:py-7 space-y-1"
        }>
        <p className="text-base md:text-lg font-medium">
          {(currentRoute === "/dashboard" && role === "commuter") ||
          role === "driver"
            ? "Manage your wallet"
            : currentRoute === "/dashboard" && role === "admin"
            ? "Analytics"
            : currentRoute.includes("/transaction")
            ? "Manage your transactions"
            : currentRoute.includes("/verification")
            ? "Verification Successful"
            : currentRoute.includes("/drivers")
            ? "Drivers"
            : currentRoute.includes("/user-accounts")
            ? "All Users"
            : null}
        </p>
        <p className="text-link-ash text-xs md:text-sm">
          {currentRoute === "/dashboard" && role === "commuter"
            ? "All your transaction logs are here"
            : currentRoute === "/dashboard" && role === "driver"
            ? "View current balance, transactions and initiate withdrawals"
            : currentRoute === "/dashboard" && role === "admin"
            ? "All the analytics for your Taxico account"
            : currentRoute.includes("/transaction")
            ? "See all the transactions happening on your account"
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
  ) : (
    <div
      className={
        currentRoute.includes("/account")
          ? "w-full border-t bg-grey"
          : "w-full border-y bg-grey"
      }>
      <div
        className={
          currentRoute.includes("/account")
            ? "hidden"
            : "w-11/12 mx-auto py-5 md:py-7 space-y-2"
        }>
        <div className=" h-4 md:h-6 max-w-[300px] bg-custom-ash animate-pulse"></div>
        <div className=" h-2.5 md:h-4 max-w-[150px] bg-custom-ash animate-pulse mt-3"></div>
      </div>
    </div>
  );
};

export default DashboardHeaderDescription;
