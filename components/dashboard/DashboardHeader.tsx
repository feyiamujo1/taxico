import Link from "next/link";
import { usePathname } from "next/navigation";
import { Squash as Hamburger } from "hamburger-react";
import { Dispatch, SetStateAction } from "react";

const DashboardHeader = ({
  role,
  showSideBar,
  setShowSideBar
}: {
  role: string;
  showSideBar: boolean;
  setShowSideBar: Dispatch<SetStateAction<boolean>>;
}) => {
  const currentRoute = usePathname();
  return (
    <div className="w-full">
      <div className="w-11/12 mx-auto py-4 md:py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            onClick={() => setShowSideBar(true)}
            className="font-medium h-[42px] w-[42px] flex justify-center items-center bg-custom-blue text-white md:hidden">
            <span className={`${showSideBar && "invisible md:visible"}`}>
              <Hamburger
                size={20}
                toggled={showSideBar}
                toggle={setShowSideBar}
                duration={0.3}
              />
            </span>
          </div>
          <h2 className=" text-lg font-semibold ">
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
        </div>
        <div className="flex gap-3 items-center">
          {currentRoute === "/dashboard" && role === "commuter" && (
            <Link
              href="/dashboard/pay-driver"
              className="py-2.5 px-4 rounded-3xl text-sm 2xl:text-base bg-custom-blue text-white">
              Pay Driver
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
