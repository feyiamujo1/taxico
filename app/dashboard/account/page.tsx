"use client"

import DriverSignUp from "~/components/auth/DriverSignupForm";
import SignupForm from "~/components/auth/SignupForm";
import { getSavedState } from "~/lib/localStorage";

const AccountPage = () => {
  const userInfo = getSavedState("taxicoUser") || "Loading";
  const role = userInfo?.user_metadata?.role
  console.log(userInfo);

  return (
    <div className="w-full sm:w-[400px] 2xl:w-[450px] mx-auto mt-10 md:mt-20 pb-20">
      <h2 className="pb-5 md:pb-10 font-semibold text-base md:text-lg ">Edit account information here</h2>
      {role === "commuter" ? <SignupForm /> : <DriverSignUp />}
    </div>
  );
};

export default AccountPage;
