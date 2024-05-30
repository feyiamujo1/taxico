import { usePathname } from "next/navigation";

const DashboardHeader = ({ role }: { role: string }) => {
  const currentRoute = usePathname();
  return (
    <div className="w-full">
      <div className="w-11/12 mx-auto py-4 flex items-center justify-between">
        <h2 className=" text-lg font-semibold py-3">
          {currentRoute === "/dashboard" && role === "commuter"
            ? "My Account"
            : currentRoute === "/dashboard" && role === "driver"
            ? "Home"
            : currentRoute === "/dashboard" && role === "admin"
            ? "Dashboard"
            : currentRoute.includes("/wallet")
            ? "Wallet"
            : currentRoute.includes("/account")
            ? "My Account"
            : currentRoute.includes("/verification")
            ? "Verification"
            : currentRoute.includes("/drivers")
            ? "Drivers"
            : currentRoute.includes("/user-accounts")
            ? "User Accounts"
            : ""}
        </h2>
        <div className="flex gap-3 items-center">
          {currentRoute === "/dashboard" ? (
            <>
              <button className="py-3 px-6 rounded-3xl text-sm 2xl:text-base bg-custom-blue text-white">
                Buy Ticket
              </button>
              <button className="py-3 px-6 rounded-3xl border text-sm 2xl:text-base ">
                Pay Driver
              </button>
            </>
          ) : currentRoute === "/dashboard/wallet" ? (
            <button className="py-3 px-6 rounded-3xl text-sm 2xl:text-base bg-custom-blue text-white">
              Topup
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
