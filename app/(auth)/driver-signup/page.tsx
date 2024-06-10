import Link from "next/link";
import DriverSignUp from "~/components/auth/DriverSignupForm";

export default function SignUpPage() {
  return (
    <div className="mb-10 md:mb-0">
      <p className="text-xl font-medium md:text-2xl mb-2.5 text-custom-black">
        Become a Taxico Driver!
      </p>
      <p className="text-custom-black text-sm mb-8 font-medium">
        Submit your details to start driving with us
      </p>
      <DriverSignUp />
      <p className="text-center mt-3.5 text-[13px]">
        Just a commuter?{" "}
        <Link
          href="/signup"
          className=" cursor-pointer font-semibold underline hover:text-custom-blue">
          Sign up here
        </Link>
      </p>
    </div>
  );
}
