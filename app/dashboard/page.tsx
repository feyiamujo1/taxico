"use client";

import TransactionTable from "~/components/dashboard/TransactionTable";
import ShortInformationContainer from "~/components/dashboard/ShortInformationContainer";
import PaystackIntegration from "~/components/dashboard/PaystackIntegration";
import { HiOutlineChevronRight } from "react-icons/hi";
import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSavedState } from "~/lib/localStorage";
import { Loader2 } from "lucide-react";
import LoadingBox from "~/components/dashboard/LoadingBox";
import ErrorBox from "~/components/dashboard/ErrorBox";
import { TransactionsType, WalletsType } from "~/lib/types/DashboardTypes";

const CommutersHomePage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userInfo = getSavedState("taxicoUser");
  const role = userInfo?.user_metadata?.role || "";
  const [walletInfo, setWalletInfo] = useState<WalletsType[] | null>();
  const [transactionTableInfo, setTransactionTableInfo] = useState<
    TransactionsType[] | null
  >();

  const currentDate = new Date();
  let currentMonth = currentDate.getMonth();
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
  const getdashboardInfo = async () => {
    try {
      const response: any = await axios.get(
        `https://${process.env.NEXT_PUBLIC_SUPABASE_REF}.supabase.co/rest/v1/wallets?select=*&id=eq.${userInfo?.user_metadata?.sub}`,
        {
          headers: {
            "Content-Type": "application/json",
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
          }
        }
      );
      if (response && response?.status === 200) {
        console.log("Wallet Info -", response?.data);
        setWalletInfo(response?.data);
        const responseTwo: any = await axios.get(
          `https://${process.env.NEXT_PUBLIC_SUPABASE_REF}.supabase.co/rest/v1/transactions?select=*&id=eq.${userInfo?.user_metadata?.sub}`,
          {
            headers: {
              "Content-Type": "application/json",
              apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
            }
          }
        );
        if (responseTwo && response?.status === 200) {
          console.log("Table info -", responseTwo?.data);
          setTransactionTableInfo(responseTwo?.data);
        }
      }
    } catch (error: any) {
      console.log(error);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getdashboardInfo();
  }, []);

  return loading ? (
    <LoadingBox />
  ) : !loading && error !== "" ? (
    <ErrorBox />
  ) : (
    <>
      {role === "admin" && (
        <p className="font-semibold text-lg mb-3">Financials</p>
      )}
      <div className="w-full box-border flex gap-3 md:gap-6 md:flex-row">
        <div
          className={`w-full h-fit flex  justify-between ${
            role === "admin" ? "flex-col-reverse" : "flex-col"
          }`}>
          {role !== "admin" ? (
            <div className="flex justify-between gap-2 border-b-[0.5px] border-[#DFDFDF] py-2.5">
              <div className="w-full ">
                <p className="text-sm text-custom-black">
                  {role === "admin" ? "Total Inflow" : "Balance"}
                </p>
                <p className="font-semibold text-lg md:text-xl mt-1">
                  NGN{" "}
                  {walletInfo && walletInfo.length !== 0
                    ? walletInfo[0]?.balance
                    : "0"}
                </p>
              </div>
              {role === "commuter" && <PaystackIntegration />}
            </div>
          ) : null}
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
              <p className="font-semibold text-lg md:text-xl mt-1">
                NGN{" "}
                {role !== "admin" && walletInfo && walletInfo.length !== 0
                  ? role === "commuter"
                    ? walletInfo[0]?.outflow
                    : walletInfo[0]?.inflow
                  : "0"}
              </p>
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
                {role !== "commuter" && "NGN"}{" "}
                {role !== "admin" && walletInfo && walletInfo.length !== 0
                  ? role === "commuter"
                    ? walletInfo[0]?.outflow / 200
                    : walletInfo[0]?.outflow
                  : "0"}
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

      {transactionTableInfo && transactionTableInfo?.length !== 0 ? (
        <TransactionTable data={transactionTableInfo} />
      ) : (
        <ShortInformationContainer type={"transactions"} />
      )}
    </>
  );
};

export default CommutersHomePage;
