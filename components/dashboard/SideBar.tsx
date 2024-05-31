import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiHome,
  HiOutlineTruck,
  HiOutlineUser,
  HiOutlineUserGroup,
  HiOutlineWallet
} from "react-icons/hi2";

const SideBar = () => {
  const pathname = usePathname();
  return (
    <nav className="fixed w-[290px] pt-6 bg-grey h-screen md:border-r">
      <div className="flex gap-2 w-[235px] mx-auto items-center ">
        <p className="font-medium text-[13px] w-[42px] h-[42px] flex justify-center items-center bg-custom-blue text-white">
          FJ
        </p>
        <div>
          <p className=" font-medium w-[190px] truncate">
            Oluwafeyisayomi Amujoyegbe
          </p>
          <p className="text-[13px] font-semibold -mt-0.5">@feyiamujo</p>
        </div>
      </div>
      <div className="mt-12 w-[235px] mx-auto space-y-6">
        <Link
          href="/dashboard"
          className={`w-full flex items-center gap-3 transition-all duration-300 ${
            pathname === "/dashboard" ? "text-custom-blue" : "text-link-ash"
          }`}>
          <HiHome className="text-[22px]" />
          <p className=" text-sm font-medium">Home</p>
        </Link>
        <Link
          href="/dashboard/transactions"
          className={`w-full flex items-center gap-3 transition-all duration-300 ${
            pathname.includes("/dashboard/transactions")
              ? "text-custom-blue"
              : "text-link-ash"
          }`}>
          <HiOutlineWallet className="text-[22px]" />
          <p className=" text-sm font-medium">Transactions</p>
        </Link>
        <Link
          href="/dashboard/drivers"
          className={`w-full flex items-center gap-3 transition-all duration-300 ${
            pathname.includes("/drivers") ? "text-custom-blue" : "text-link-ash"
          }`}>
          <HiOutlineTruck className="text-[22px]" />
          <p className=" text-sm font-medium">Drivers</p>
        </Link>
        <Link
          href="/dashboard/user-accounts"
          className={`w-full flex items-center gap-3 transition-all duration-300 ${
            pathname.includes("/user-accounts")
              ? "text-custom-blue"
              : "text-link-ash"
          }`}>
          <HiOutlineUserGroup className="text-[22px]" />
          <p className=" text-sm font-medium">User Accounts</p>
        </Link>
        <Link
          href="/dashboard/account"
          className={`w-full flex items-center gap-3 transition-all duration-300 ${
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
