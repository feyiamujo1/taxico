import Link from "next/link";
import { usePathname } from "next/navigation";
import { GrStorage } from "react-icons/gr";
import { Squash as Hamburger } from "hamburger-react";
import { Dispatch, SetStateAction } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import {
  HiHome,
  HiOutlineTruck,
  HiOutlineUser,
  HiOutlineUserGroup
} from "react-icons/hi2";
import { deleteLocalState, getSavedState } from "~/lib/localStorage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

const SideBar = ({
  showSideBar,
  setShowSideBar
}: {
  showSideBar: boolean;
  setShowSideBar: Dispatch<SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();
  const [userInfo, setUserInfo] = useState<UserMetadata | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedUserInfo = getSavedState("taxicoUser")?.user_metadata || null;
    setUserInfo(savedUserInfo);
  }, []);

  return (
    <nav
      className={`${
        showSideBar
          ? "fixed h-screen flex w-[290px]"
          : "w-0 -left-[290px] md:left-0 md:flex fixed md:w-[290px] md:h-screen md:opacity-100"
      } pt-4 md:pt-6 bg-grey md:border-r transition-all z-0 md:z-0 flex flex-col justify-between h-screen`}>
      <div className="h-fit">
        {userInfo ? (
          <div className="flex gap-2 w-[255px] md:w-[235px] mx-auto items-center ">
            <p
              className={`hidden font-medium capitalize text-[13px] w-[42px] h-[42px] md:flex justify-center items-center bg-custom-blue text-white`}>
              <span className={`${showSideBar && "invisible md:visible"}`}>
                {userInfo?.first_name?.charAt(0) +
                  userInfo?.last_name?.charAt(0)}
              </span>
            </p>
            <div
              onClick={() => setShowSideBar(false)}
              className="md:hidden font-medium h-[42px] w-[42px] flex justify-center items-center bg-custom-blue text-white ">
              <span>
                <Hamburger
                  size={20}
                  toggled={showSideBar}
                  toggle={setShowSideBar}
                  duration={0.3}
                />
              </span>
            </div>
            <div>
              <p className=" font-medium w-[190px] truncate">
                {userInfo?.first_name + " " + userInfo?.last_name}
              </p>
              <p className="text-[13px] font-semibold -mt-0.5">
                {"@" + userInfo?.tag}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex gap-2 w-[255px] md:w-[235px] mx-auto items-center ">
            <p
              className={`font-medium capitalize text-[13px] w-[42px] h-[42px] flex justify-center items-center bg-custom-blue text-white animate-pulse`}></p>
            <div>
              <p className=" font-medium w-[190px] truncate animate-pulse h-3.5 bg-custom-ash"></p>
              <p className="text-[13px] w-14 font-semibold mt-1 animate-pulse h-2.5 bg-custom-ash"></p>
            </div>
          </div>
        )}
        <div className="mt-12 w-[235px] mx-auto space-y-6">
          <Link
            onClick={() => {
              showSideBar && setShowSideBar(false);
            }}
            href="/dashboard"
            className={`w-full flex items-center gap-3 transition-all duration-300 hover:text-black ${
              pathname === "/dashboard" ? "text-custom-blue" : "text-link-ash"
            }`}>
            <HiHome className="text-[22px]" />
            <p className=" text-sm font-medium">Home</p>
          </Link>
          <Link
            onClick={() => {
              showSideBar && setShowSideBar(false);
            }}
            href="/dashboard/transactions"
            className={`w-full flex items-center gap-3 transition-all duration-300 hover:text-black ${
              pathname.includes("/dashboard/transactions")
                ? "text-custom-blue"
                : "text-link-ash"
            }`}>
            <GrStorage className="text-[20px]" />
            <p className=" text-sm font-medium">Transactions</p>
          </Link>
          {userInfo?.role === "admin" && (
            <>
              <Link
                onClick={() => {
                  showSideBar && setShowSideBar(false);
                }}
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
                onClick={() => {
                  showSideBar && setShowSideBar(false);
                }}
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
          {userInfo?.role !== "admin" && (
            <Link
              onClick={() => {
                showSideBar && setShowSideBar(false);
              }}
              href="/dashboard/account"
              className={`w-full flex items-center gap-3 transition-all duration-300 hover:text-black ${
                pathname.includes("/account")
                  ? "text-custom-blue"
                  : "text-link-ash"
              }`}>
              <HiOutlineUser className="text-[22px]" />
              <p className=" text-sm font-medium">Account</p>
            </Link>
          )}
        </div>
      </div>
      <div className="h-fit mt-12 w-[235px] mx-auto mb-20">
        <button
          onClick={() => {
            deleteLocalState("taxicoUser");
            router.push("/login");
          }}
          className="w-full flex items-center gap-3 transition-all duration-300 hover:text-[#d82534d9]">
          <IoLogOutOutline className="text-[22px]" />
          <p className=" text-sm font-medium">Log out</p>
        </button>
      </div>
    </nav>
  );
};

export default SideBar;
