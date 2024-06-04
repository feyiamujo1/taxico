
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardHeader = ({ role }: { role: string }) => {
  const currentRoute = usePathname();
  return (
    <div className="w-full">
      <div className="w-11/12 mx-auto py-4 flex items-center justify-between">
        <h2 className=" text-lg font-semibold py-3">
          {currentRoute === "/dashboard"
            ? "Home"
            : currentRoute.includes("/transaction")
            ? "Transactions"
            : currentRoute.includes("/account")
            ? "Edit Account"
            : currentRoute.includes("/drivers")
            ? "Drivers"
            : currentRoute.includes("/user-accounts")
            ? "User Accounts"
            : ""}
        </h2>
        <div className="flex gap-3 items-center">
          {currentRoute === "/dashboard" && role === "commuter" && (
            <Link href="/dashboard/pay-driver" className="py-2.5 px-4 rounded-3xl text-sm 2xl:text-base bg-custom-blue text-white">
              Pay Driver
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
