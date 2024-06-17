import Link from "next/link";
import { usePathname } from "next/navigation";
import { GrStorage } from "react-icons/gr";
import {
  HiHome,
  HiOutlineTruck,
  HiOutlineUser,
  HiOutlineUserGroup
} from "react-icons/hi2";
import { getSavedState } from "~/lib/localStorage";

const SideBar = ({
  showSideBar,
  setShowSideBar
}: {
  showSideBar: boolean;
  setShowSideBar: Function;
}) => {
  const pathname = usePathname();
  const userInfo = getSavedState("taxicoUser")?.user_metadata || {};
  return (
    <nav
      className={`${
        showSideBar
          ? "fixed h-screen w-[290px]"
          : "w-0 h-screen opacity-0 md:fixed md:w-[290px] md:h-screen md:opacity-100"
      } pt-5 md:pt-6 bg-grey  md:border-r transition-all `}>
      <div className="flex gap-2 w-[235px] mx-auto items-center ">
        <p
          className={`font-medium capitalize text-[13px] w-[42px] h-[42px] flex justify-center items-center bg-custom-blue text-white`}>
          {userInfo?.first_name[0] + userInfo?.last_name[0]}
        </p>
        <div>
          <p className=" font-medium w-[190px] truncate">
            {userInfo?.first_name + " " + userInfo?.last_name}
          </p>
          <p className="text-[13px] font-semibold -mt-0.5">
            {"@" + userInfo?.tag}
          </p>
        </div>
      </div>
      <div className="mt-12 w-[235px] mx-auto space-y-6">
        <Link
          href="/dashboard"
          className={`w-full flex items-center gap-3 transition-all duration-300 hover:text-black ${
            pathname === "/dashboard" ? "text-custom-blue" : "text-link-ash"
          }`}>
          <HiHome className="text-[22px]" />
          <p className=" text-sm font-medium">Home</p>
        </Link>
        {userInfo?.role === "driver" ||
          (userInfo?.role === "commuter" && (
            <Link
              href="/dashboard/transactions"
              className={`w-full flex items-center gap-3 transition-all duration-300 hover:text-black ${
                pathname.includes("/dashboard/transactions")
                  ? "text-custom-blue"
                  : "text-link-ash"
              }`}>
              <GrStorage className="text-[22px]" />
              <p className=" text-sm font-medium">Transactions</p>
            </Link>
          ))}
        {userInfo?.role === "admin" && (
          <>
            <Link
              href="/dashboard/drivers"
              className={`w-full flex items-center gap-3 transition-all duration-300 hover:text-black ${
                pathname.includes("/drivers")
                  ? "text-custom-blue"
                  : "text-link-ash"
              }`}>
              <HiOutlineTruck className="text-[22px]" />
              <p className=" text-sm font-medium">Drivers</p>
            </Link>
            <Link
              href="/dashboard/user-accounts"
              className={`w-full flex items-center gap-3 transition-all duration-300 hover:text-black ${
                pathname.includes("/user-accounts")
                  ? "text-custom-blue"
                  : "text-link-ash"
              }`}>
              <HiOutlineUserGroup className="text-[22px]" />
              <p className=" text-sm font-medium">User Accounts</p>
            </Link>
          </>
        )}
        <Link
          href="/dashboard/account"
          className={`w-full flex items-center gap-3 transition-all duration-300 hover:text-black ${
            pathname.includes("/account") ? "text-custom-blue" : "text-link-ash"
          }`}>
          <HiOutlineUser className="text-[22px]" />
          <p className=" text-sm font-medium">Account</p>
        </Link>
      </div>
    </nav>
  );
};

export default SideBar;
