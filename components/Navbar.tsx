import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="absolute top-0 right-0 left-0 w-11/12 2xl:w-[1400px] mx-auto py-2.5 md:py-5 flex justify-between items-center">
      <Image src={"/icon.png"} height={26} width={106} alt="logo" />
      <div className="flex items-center gap-3 font-medium">
        <Link href={"/"}>Login</Link>
        <Link href={"/"} className="bg-custom-ash py-3 px-6 rounded-3xl">
          Sign In
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
