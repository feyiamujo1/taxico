"use client"
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const NavLinkSelector = () => {
    const currentRoute = usePathname();
  return (
    <nav className="absolute top-0 right-0 left-0 w-11/12 2xl:w-[1400px] mx-auto py-2.5 md:py-5 flex justify-between items-center">
      <Link href={"/"}>
        <Image src={"/logo.png"} height={26} width={106} alt="logo" />
      </Link>
      <div className="flex items-center gap-3 font-medium">
        {currentRoute === "/login" ? (
          <Link
            href={"/signup"}
            className="bg-custom-ash py-3 px-6 rounded-3xl hover:text-custom-blue">
            Sign Up
          </Link>
        ) : currentRoute === "signup" ? (
          <Link
            href={"/login"}
            className="bg-custom-ash py-3 px-6 rounded-3xl hover:text-custom-blue">
            Login
          </Link>
        ) : currentRoute === "signup-driver" ? (
          <Link
            href={"/signup"}
            className="bg-custom-ash py-3 px-6 rounded-3xl hover:text-custom-blue">
            Login
          </Link>
        ) : (
          <Link
            href={"/login"}
            className="bg-custom-ash py-3 px-6 rounded-3xl hover:text-custom-blue">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavLinkSelector;
