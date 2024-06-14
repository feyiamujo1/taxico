import Link from "next/link";

const CheckMailPage = () => {
  return (
    <div className="mb-10 md:mb-0">
      <p className="text-xl font-medium md:text-2xl mb-2.5 text-custom-black">
        Check Your Email
      </p>
      <p className="text-custom-black text-sm mb-8 font-medium">
        A link has been sent to the email provided, click on the link to
        activate your account.
      </p>
      <p className="font-medium text-[#EF2929] text-sm mb-2">
        Didn&apos;t receive any link?
      </p>
      <input
        placeholder="Your email"
        className="w-full outline-none focus:!outline-none focus:ring-1 focus:ring-white rounded-lg !bg-white border border-custom-ash px-2.5 h-12 focus:border-custom-blue text-sm"
        type="email"
      />
      <button
        className={`w-full mt-7 font-medium rounded-3xl disabled:text-black text-white px-2.5 py-3 text-sm bg-custom-blue disabled:bg-[#F3F3F3] transition-all duration-300`}
        // disabled={
        //   loading
        // }
        type="submit">
        {/* {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} */}
        Resend
      </button>

      <p className="text-center mt-3.5 text-[13px]">
        Confirmed your email?{" "}
        <Link
          href="/login"
          className=" cursor-pointer font-semibold underline hover:text-custom-blue">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default CheckMailPage;
