import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="absolute z-50 top-0 right-0 left-0 w-11/12 2xl:w-[1400px] mx-auto py-2.5 md:py-5 flex justify-between items-center">
      <Link href={"/"}>
        <Image src={"/icon.png"} height={26} width={106} alt="logo" />
      </Link>
      <div className="flex items-center gap-3 font-medium">
        <Link href={"/login"} className="hover:text-custom-blue">
          Login
        </Link>
        <Link href={"/signin"} className="bg-custom-ash py-3 px-6 rounded-3xl hover:text-custom-blue">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
