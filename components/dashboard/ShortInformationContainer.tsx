import {
  HiOutlineDocument,
  HiOutlineShieldCheck,
  HiOutlineShieldExclamation,
  HiOutlineTicket,
  HiOutlineWallet
} from "react-icons/hi2";

const ShortInformationContainer = ({ type }: { type: string }) => {
  return (
    <div className="max-w-[310px] mx-auto text-center flex flex-col h-full items-center justify-center mt-20">
      {type === "tickets" ? (
        <HiOutlineTicket className="text-5xl text-grey-2" />
      ) : type === "wallet" ? (
        <HiOutlineWallet className="text-5xl text-grey-2" />
      ) : type === "history" ? (
        <HiOutlineDocument className="text-5xl text-grey-2" />
      ) : type === "verification-success" ? (
        <HiOutlineShieldCheck className="text-5xl text-grey-2" />
      ) : type === "verification-failed" ? (
        <HiOutlineShieldExclamation className="text-5xl text-grey-2" />
      ) : (
        <HiOutlineTicket className="text-5xl text-grey-2" />
      )}
      <p className="font-semibold text-xl mt-6 mb-2 text-custom-black">
        {type === "tickets"
          ? "No Available Tickets"
          : type === "wallet"
          ? "Wallet is Empty"
          : type === "history"
          ? "No Transaction History"
          : type === "verification-success"
          ? "Verification Successful"
          : type === "verification-failed"
          ? "Verification Pending"
          : "No Available Tickets"}
      </p>
      <p className="text-grey-2">
        {type === "tickets"
          ? "When you buy tickets they will appear here."
          : type === "wallet"
          ? "Your wallet is empty"
          : type === "history"
          ? "When transactions occur on your account they will appear here."
          : type === "verification-success"
          ? "You can now use Taxico freely"
          : type === "verification-failed"
          ? "Your verification is still pendingg"
          : "When you buy tickets they will appear here."}
      </p>
    </div>
  );
};

export default ShortInformationContainer;
