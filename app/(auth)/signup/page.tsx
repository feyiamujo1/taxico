import Link from "next/link";
import SignupForm from "~/components/SignupForm";

export default function SignUpPage() {
  return (
    <div className="mb-10 md:mb-0">
      <p className="text-xl font-medium md:text-2xl mb-2.5 text-custom-black">
        Join Taxico Today!
      </p>
      <p className="text-custom-black text-sm mb-8 font-medium">
        Fill in your details to create a new account.
      </p>
      <SignupForm />
      <p className="text-center mt-3.5 text-[13px]">
        Do you want to drive?{" "}
        <Link
          href="/driver-signup"
          className=" cursor-pointer font-semibold underline hover:text-custom-blue">
          Sign up as a driver
        </Link>
      </p>
    </div>
  );
}
