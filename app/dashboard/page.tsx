"use client";

import TransactionTable from "~/components/dashboard/TransactionTable";
import ShortInformationContainer from "~/components/dashboard/ShortInformationContainer";
import PaystackIntegration from "~/components/dashboard/PaystackIntegration";

import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSavedState } from "~/lib/localStorage";
import { Loader2 } from "lucide-react";
import LoadingBox from "~/components/dashboard/LoadingBox";
import ErrorBox from "~/components/dashboard/ErrorBox";
import { TransactionsType, WalletsType } from "~/lib/types/DashboardTypes";
import AddDriverAccountDetail from "~/components/dashboard/AddDriverAccountDetail";

const CommutersHomePage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userInfo = getSavedState("taxicoUser");
  const role = userInfo?.user_metadata?.role || "";
  const [isUpdatingWallet, setIsUpdatingWallet] = useState(false);
  const [walletInfo, setWalletInfo] = useState<WalletsType[] | null>();
  const [transactionTableInfo, setTransactionTableInfo] = useState<
    TransactionsType[] | null
  >();

  const [commutersNumber, setCommutersNumber] = useState(0);
  const [driversNumber, setDriversNumber] = useState(0);
  const [fundAnalytics, setFundAnalytics] = useState<{
    total_inflow: number;
    total_outflow: number;
  }>();

  const [driversWithdrawalAccount, setDriversWithdrawalAccount] =
    useState<any[]>();

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
      if (role !== "admin") {
        const response: any = await axios.get(
          `https://${process.env.NEXT_PUBLIC_SUPABASE_REF}.supabase.co/rest/v1/wallets?select=*&user_id=eq.${userInfo?.user_metadata?.sub}`,
          {
            headers: {
              "Content-Type": "application/json",
              apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
            }
          }
        );

        if (response && response?.status === 200) {
          console.log("Wallet Info -", response);
          setWalletInfo(response?.data);
          const responseTwo: any = await axios.get(
            `https://${process.env.NEXT_PUBLIC_SUPABASE_REF}.supabase.co/rest/v1/transactions?select=*&or=(receiver_id.eq.${userInfo?.user_metadata?.sub},sender_id.eq.${userInfo?.user_metadata?.sub})`,
            {
              headers: {
                "Content-Type": "application/json",
                apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
              }
            }
          );
          if (responseTwo && responseTwo?.status === 200) {
            console.log("Table info -", responseTwo);
            setTransactionTableInfo(responseTwo?.data);

            if (role === "driver") {
              const responseThree: any = await axios.get(
                `https://${process.env.NEXT_PUBLIC_SUPABASE_REF}.supabase.co/rest/v1/bank_account_details?select=*&user=eq.${userInfo?.user_metadata?.sub}`,
                {
                  headers: {
                    "Content-Type": "application/json",
                    apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
                  }
                }
              );
              if (responseThree && responseThree?.status === 200) {
                console.log("Account details info -", responseThree);
                setDriversWithdrawalAccount(responseTwo?.data[0]);
              }
            }
          }
        }
      } else {
        const response: any = await axios.get(
          `https://${process.env.NEXT_PUBLIC_SUPABASE_REF}.supabase.co/rest/v1/rpc/count_users_by_role`,
          {
            headers: {
              "Content-Type": "application/json",
              apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
            }
          }
        );
        if (response && response?.status === 200) {
          console.log("RPC Info -", response?.data);
          // setWalletInfo(response?.data);
          setCommutersNumber(response?.data[0]["count"]);
          setDriversNumber(response?.data?.[2]["count"]);
          const responseTwo: any = await axios.get(
            `https://${process.env.NEXT_PUBLIC_SUPABASE_REF}.supabase.co/rest/v1/rpc/sum_inflows_outflows`,
            {
              headers: {
                "Content-Type": "application/json",
                apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
              }
            }
          );
          if (responseTwo && responseTwo?.status === 200) {
            console.log("Inflow/Outflow info -", responseTwo?.data);
            setFundAnalytics(responseTwo?.data[0]);
            // setDriversNumber(responseTwo?.data?.length);

            const responseThree: any = await axios.get(
              `https://${process.env.NEXT_PUBLIC_SUPABASE_REF}.supabase.co/rest/v1/transaction_details?select=*`,
              {
                headers: {
                  "Content-Type": "application/json",
                  apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
                }
              }
            );
            if (responseThree && responseThree?.status === 200) {
              console.log("Transactions table info -", responseThree?.data);
              setTransactionTableInfo(responseThree?.data);
            }
          }
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

  useEffect(() => {
    if (isUpdatingWallet === true) {
      console.log("Fetching new wallet info");
      getdashboardInfo();
      setIsUpdatingWallet(false);
    }
  }, [isUpdatingWallet]);

  return loading ? (
    <LoadingBox />
  ) : !loading && error !== "" ? (
    <ErrorBox />
  ) : (
    <>
      {role === "admin" && (
        <p className="font-semibold text-lg mb-3">Financials</p>
      )}
      <div className="w-full box-border flex flex-col gap-3 md:gap-6 md:flex-row ">
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
                    : 0}
                </p>
              </div>
              {role === "commuter" && (
                <PaystackIntegration
                  setIsUpdatingWallet={setIsUpdatingWallet}
                  currentWalletBalance={
                    walletInfo && walletInfo.length !== 0
                      ? walletInfo[0]?.balance
                      : 0
                  }
                />
              )}
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
                    Total Inflow
                  </>
                )}
              </p>
              <p className="font-semibold text-lg md:text-xl mt-1">
                NGN{" "}
                {role !== "admin" && walletInfo && walletInfo.length !== 0
                  ? role === "commuter"
                    ? walletInfo[0]?.outflow
                    : walletInfo[0]?.inflow
                  : fundAnalytics
                  ? fundAnalytics?.total_inflow
                  : 0}
              </p>
            </div>
            <div className="w-1/2 py-2.5 border-b-[0.5px] border-[#DFDFDF]">
              <p className="text-sm text-custom-black flex gap-1.5">
                {role === "commuter" ? (
                  `Trips Taken`
                ) : (
                  <>
                    <GoArrowUpRight className="text-[19px] text-[#EF2929]" />{" "}
                    Total Outflow
                  </>
                )}
              </p>
              <p className="font-semibold text-lg md:text-xl mt-1">
                {role !== "commuter" && "NGN"}{" "}
                {role !== "admin" && walletInfo && walletInfo.length !== 0
                  ? role === "commuter"
                    ? walletInfo[0]?.outflow / 200
                    : walletInfo[0]?.outflow
                  : fundAnalytics
                  ? fundAnalytics?.total_outflow
                  : 0}
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
              <div>
                {!driversWithdrawalAccount ||
                driversWithdrawalAccount?.length === 0 ? (
                  <p className="text-[#BFBFBF] py-3">Unavailable</p>
                ) : (
                  <>
                    <p className="font-semibold text-lg md:text-xl my-1">
                      {driversWithdrawalAccount[0]?.account_number}
                    </p>
                    <p className="text-xs text-custom-black truncate">
                      {driversWithdrawalAccount[0]?.bank}
                    </p>
                  </>
                )}
              </div>
            </div>
            <AddDriverAccountDetail setIsUpdatingWallet={setIsUpdatingWallet} />
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
              <p className="font-semibold text-lg md:text-xl mt-1">
                {commutersNumber}
              </p>
            </div>
            <div className="w-1/2 py-2.5 border-b-[0.5px] border-[#DFDFDF]">
              <p className="text-sm text-custom-black flex gap-1.5">
                Drivers Count
              </p>
              <p className="font-semibold text-lg md:text-xl mt-1">
                {driversNumber}
              </p>
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
