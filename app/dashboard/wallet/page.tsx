import { FiPlus } from "react-icons/fi";

const WalletPage = () => {
  return (
    <>
      <div className="flex justify-between gap-2 border-b-[0.5px] border-[#DFDFDF]">
        <div className="w-full py-2.5">
          <p className="text-sm font-medium">Wallet Balance</p>
          <p className="font-semibold text-xl mt-1">NGN 4,500.00</p>
        </div>
        <button className="w-fit text-nowrap flex items-center gap-1.5 text-custom-blue hover:text-link-ash text-sm">
          <FiPlus />
          Buy Ticket
        </button>
      </div>
      <div className="flex justify-between gap-3 ">
        <div className="w-1/2 py-2.5 border-b-[0.5px] border-[#DFDFDF]">
          <p className="text-sm font-medium flex gap-1.5">Tickets Purchased</p>
          <p className="font-semibold text-xl mt-1">12</p>
        </div>
        <div className="w-1/2 py-2.5 border-b-[0.5px] border-[#DFDFDF]">
          <p className="text-sm font-medium flex gap-1.5">Used Tickets</p>
          <p className="font-semibold text-xl mt-1">4</p>
        </div>
      </div>
    </>
  );
};

export default WalletPage;
