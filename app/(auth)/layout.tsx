"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// import Image from "next/image";
// import { authOptions } from "~/lib/auth";
// import Logo from "~/public/images/wheat-14.jpg";

export default async function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // const session = await getServerSession(authOptions);

  // if (session?.user) redirect("/");

  const currentRoute = usePathname();

  return (
    <div className="relative m-0 w-full p-0">
      <nav className="absolute top-0 right-0 left-0 w-11/12 2xl:w-[1400px] mx-auto py-2.5 md:py-5 flex justify-between items-center">
        <Link href={"/"}>
          <Image src={"/icon.png"} height={26} width={106} alt="logo" />
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
      <div className="flex w-full items-center justify-center md:overflow-y-scroll">
        <div className="mx-auto w-11/12 space-y-3 py-8 sm:w-[400px] md:mt-24 md:w-[400px] md:py-28 2xl:w-[450px]">
          {children}
        </div>
      </div>
    </div>
  );
}
