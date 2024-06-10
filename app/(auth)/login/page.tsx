import LoginForm from "~/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="mb-10 md:mb-0">
      <p className="text-xl font-medium md:text-3xl mb-8 text-custom-black">
        Log in to your account
      </p>
      <LoginForm />
      {/* <div className="mt-3.5">
        <p className="text-center text-[13px]">
          Forgot your password?{"  "}
          <Link
            href="/forgot-password"
            className="cursor-pointer font-semibold underline hover:text-custom-blue">
            Reset it here?
          </Link>
        </p>
      </div> */}
    </div>
  );
}
