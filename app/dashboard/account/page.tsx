import EditAccount from "~/components/auth/EditAccount";

const AccountPage = () => {

  return (
    <div className="w-full sm:w-[400px] 2xl:w-[450px] mx-auto mt-10 md:mt-20 pb-20">
      <h2 className="pb-5 md:pb-10 font-semibold text-base md:text-lg ">Edit account information here</h2>
      <EditAccount />
    </div>
  );
};

export default AccountPage;
