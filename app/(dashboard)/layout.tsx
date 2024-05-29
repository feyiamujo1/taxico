import Link from "next/link";
import {
  HiHome,
  HiOutlineShieldCheck,
  HiOutlineTruck,
  HiOutlineUser,
  HiOutlineUserGroup,
  HiOutlineWallet
} from "react-icons/hi2";

export default async function GeneralDashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <nav className="fixed w-[290px] pt-6 bg-grey h-screen md:border-r">
        <div className="flex gap-2 w-[235px] mx-auto items-center ">
          <p className="font-medium text-[13px] w-[42px] h-[42px] flex justify-center items-center bg-custom-blue text-white">
            FJ
          </p>
          <div>
            <p className=" font-medium w-[190px] truncate">
              Oluwafeyisayomi Amujoyegbe
            </p>
            <p className="text-[13px] font-semibold -mt-0.5">Commuter</p>
          </div>
        </div>
        <div className="mt-12 w-[235px] mx-auto space-y-6">
          <Link
            href="/commuter/"
            className={`w-full flex items-center gap-3 text-link-ash hover:text-custom-blue transition-all duration-300`}>
            <HiHome className="text-[22px]" />
            <p className=" text-sm font-medium">Home</p>
          </Link>
          <Link
            href="/commuter/wallet"
            className={`w-full flex items-center gap-3 text-link-ash hover:text-custom-blue transition-all duration-300`}>
            <HiOutlineWallet className="text-[22px]" />
            <p className=" text-sm font-medium">Wallet</p>
          </Link>
          <Link
            href="/driver/verification"
            className={`w-full flex items-center gap-3 text-link-ash hover:text-custom-blue transition-all duration-300`}>
            <HiOutlineShieldCheck className="text-[22px]" />
            <p className=" text-sm font-medium">Verification</p>
          </Link>
          <Link
            href="/admin/drivers"
            className={`w-full flex items-center gap-3 text-link-ash hover:text-custom-blue transition-all duration-300`}>
            <HiOutlineTruck className="text-[22px]" />
            <p className=" text-sm font-medium">Drivers</p>
          </Link>
          <Link
            href="/admin/users-account"
            className={`w-full flex items-center gap-3 text-link-ash hover:text-custom-blue transition-all duration-300`}>
            <HiOutlineUserGroup className="text-[22px]" />
            <p className=" text-sm font-medium">User Accounts</p>
          </Link>
          <Link
            href="/commuter/account"
            className={`w-full flex items-center gap-3 text-link-ash hover:text-custom-blue transition-all duration-300`}>
            <HiOutlineUser className="text-[22px]" />
            <p className=" text-sm font-medium">Account</p>
          </Link>
        </div>
      </nav>
      <main className="flex-grow md:ml-[290px]">
        <div className="w-full">
          <div className="w-11/12 mx-auto py-4">
            <div className="w-full flex items-center justify-between">
              <h2 className=" text-lg font-semibold py-3">My Account</h2>
              <div className="flex gap-3 items-center">
              <button className="py-3 px-6 rounded-3xl text-sm 2xl:text-base bg-custom-blue text-white">
                Buy Ticket
              </button>
              <button className="py-3 px-6 rounded-3xl text-sm 2xl:text-base bg-custom-blue text-white">
                Pay Driver
              </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full border-y bg-grey">
          <div className="w-11/12 mx-auto py-5 md:py-7 space-y-1">
            <p className=" text-lg font-medium">Manage your tickets</p>
            <p className="text-link-ash text-sm">
              See your used and unused tickets
            </p>
          </div> 
        </div>
        <div>{children}</div>
      </main>
    </div>
  );
}
