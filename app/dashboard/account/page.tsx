import DriverSignUp from "~/components/auth/DriverSignupForm";
import SignupForm from "~/components/auth/SignupForm";
import { getSavedState } from "~/lib/localStorage";

const AccountPage = () => {
  const role = getSavedState("taxicoUser")?.user_metadata?.role || {};
  return (
    <div className="w-full sm:w-[400px] 2xl:w-[450px] mx-auto mt-20">
      {role === "commuter" ? <SignupForm /> : <DriverSignUp />}
    </div>
  );
};

export default AccountPage;
