import TransactionTable from "~/components/dashboard/TransactionTable";
import ShortInformationContainer from "~/components/dashboard/ShortInformationContainer";
import PaystackIntegration from "~/components/dashboard/PaystackIntegration";
import { HiOutlineChevronRight } from "react-icons/hi";
import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";
import DriverPopup from "~/components/dashboard/DriverProfilePopup";

const CommutersHomePage = () => {
  const TransactionData = [
    {
      id: 0,
      date: "22 May 2024, 20:05:54",
      amount: "200",
      type: "Funding",
      description: "From Paystack",
      status: "Completed"
    },
    {
      id: 1,
      date: "22 May 2024, 20:05:54",
      amount: "200",
      type: "Transfer",
      description: "To Driver",
      status: "Completed"
    },
    {
      id: 2,
      date: "22 May 2024, 20:05:54",
      amount: "200",
      type: "Funding",
      description: "From Paystack",
      status: "Completed"
    },
    {
      id: 3,
      date: "22 May 2024, 20:05:54",
      amount: "200",
      type: "Transfer",
      description: "To Driver",
      status: "Completed"
    },
    {
      id: 4,
      date: "22 May 2024, 20:05:54",
      amount: "200",
      type: "Transfer",
      description: "To Driver",
      status: "Completed"
    },
    {
      id: 5,
      date: "22 May 2024, 20:05:54",
      amount: "200",
      type: "Funding",
      description: "From Paystack",
      status: "Completed"
    },
    {
      id: 6,
      date: "22 May 2024, 20:05:54",
      amount: "200",
      type: "Funding",
      description: "From Paystack",
      status: "Completed"
    },
    {
      id: 7,
      date: "22 May 2024, 20:05:54",
      amount: "200",
      type: "Transfer",
      description: "To Driver",
      status: "Completed"
    },
    {
      id: 8,
      date: "22 May 2024, 20:05:54",
      amount: "200",
      type: "Funding",
      description: "From Paystack",
      status: "Completed"
    }
  ];
  const currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  const role: any = "commuter";
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  return (
    <>
      {role === "admin" && (
        <p className="font-semibold text-lg mb-3">Financials</p>
      )}
      <div className="flex gap-3 md:gap-6 md:flex-row">
        <div
          className={`w-full h-fit flex  justify-between ${
            role === "admin" ? "flex-col-reverse" : "flex-col"
          }`}>
          <div className="flex justify-between gap-2 border-b-[0.5px] border-[#DFDFDF] py-2.5">
            <div className="w-full ">
              <p className="text-sm text-custom-black">
                {role !== "commuter" ? "Balance" : "Total Inflow"}
              </p>
              <p className="font-semibold text-lg md:text-xl mt-1">NGN 4,500</p>
            </div>
            {role === "commuter" && <PaystackIntegration />}
          </div>
          <div className="flex justify-between gap-6 pt-[1px]">
            <div className="w-1/2 py-2.5 border-b-[0.5px] border-[#DFDFDF]">
              <p className="text-sm text-custom-black flex gap-1">
                {role === "commuter" ? (
                  `Total spend for ${monthNames[currentMonth]}`
                ) : (
                  <>
                    <GoArrowDownLeft className="text-[19px] text-[#37AF35]" />{" "}
                    Inflow
                  </>
                )}
              </p>
              <p className="font-semibold text-lg md:text-xl mt-1">NGN 1,200</p>
            </div>
            <div className="w-1/2 py-2.5 border-b-[0.5px] border-[#DFDFDF]">
              <p className="text-sm text-custom-black flex gap-1.5">
                {role === "commuter" ? (
                  `Trips Taken`
                ) : (
                  <>
                    <GoArrowUpRight className="text-[19px] text-[#EF2929]" />{" "}
                    Outflow
                  </>
                )}
              </p>
              <p className="font-semibold text-lg md:text-xl mt-1">
                {role !== "commuter" && "NGN"} 6,000
              </p>
            </div>
          </div>
        </div>
        {role === "driver" && (
          <div className="w-full">
            <div className="w-full py-2.5 border-b-[0.5px] border-[#DFDFDF]">
              <div className="flex justify-between mb-1.5 text-sm text-custom-black">
                <p className="">Withdrawal Account</p>
                <p className="text-[#BFBFBF] text-sm">WITHDRAW NOW</p>
              </div>
              <p className="font-semibold text-lg md:text-xl my-1">
                0348131283
              </p>
              <p className="text-xs text-custom-black">GTBANK</p>
            </div>
            <button className="w-full flex justify-between items-center py-4 border-b-[0.5px] border-[#DFDFDF]">
              <p className="text-sm text-custom-black">Add new account</p>
              <HiOutlineChevronRight />
            </button>
          </div>
        )}
      </div>
      {role === "admin" && (
        <>
          <p className="font-semibold text-lg pt-5 md:pt-7 pb-2">Users</p>
          <div className="flex justify-between gap-6 pt-[1px] py-2.5">
            <div className="w-1/2 py-2.5 border-b-[0.5px] border-[#DFDFDF]">
              <p className="text-sm text-custom-black flex gap-1.5">
                Commuters Count
              </p>
              <p className="font-semibold text-lg md:text-xl mt-1">264</p>
            </div>
            <div className="w-1/2 py-2.5 border-b-[0.5px] border-[#DFDFDF]">
              <p className="text-sm text-custom-black flex gap-1.5">
                Drivers Count
              </p>
              <p className="font-semibold text-lg md:text-xl mt-1">38</p>
            </div>
          </div>
        </>
      )}

      {!TransactionData ? (
        <ShortInformationContainer type={"wallet"} />
      ) : (
        <TransactionTable data={TransactionData} />
      )}
    </>
  );
};

export default CommutersHomePage;
