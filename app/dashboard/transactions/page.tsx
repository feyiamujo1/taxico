"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import ErrorBox from "~/components/dashboard/ErrorBox";
import LoadingBox from "~/components/dashboard/LoadingBox";
import ShortInformationContainer from "~/components/dashboard/ShortInformationContainer";
import TransactionTable from "~/components/dashboard/TransactionTable";
import { getSavedState } from "~/lib/localStorage";
import { TransactionsType } from "~/lib/types/DashboardTypes";

const TransactionsPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userInfo = getSavedState("taxicoUser");
  const role = userInfo?.user_metadata?.role || "";
  const [transactionTableInfo, setTransactionTableInfo] = useState<
    TransactionsType[] | null
  >();

  const getdashboardInfo = async () => {
    try {
      if (role !== "admin") {
        const response: any = await axios.get(
          `https://${process.env.NEXT_PUBLIC_SUPABASE_REF}.supabase.co/rest/v1/transactions?select=*&or=(receiver_id.eq.${userInfo?.user_metadata?.sub},sender_id.eq.${userInfo?.user_metadata?.sub})`,
          {
            headers: {
              "Content-Type": "application/json",
              apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
            }
          }
        );

        if (response && response?.status === 200) {
          console.log("Transaction Info -", response?.data);
          setTransactionTableInfo(response?.data);
        }
      } else {
        const response: any = await axios.get(
          `https://${process.env.NEXT_PUBLIC_SUPABASE_REF}.supabase.co/rest/v1/transaction_details?select=*`,
          {
            headers: {
              "Content-Type": "application/json",
              apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
            }
          }
        );
        if (response && response?.status === 200) {
          console.log("Transactions table info -", response?.data);
          setTransactionTableInfo(response?.data);
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
      {transactionTableInfo && transactionTableInfo?.length !== 0 ? (
        <TransactionTable data={transactionTableInfo} />
      ) : (
        <ShortInformationContainer type={"transactions"} />
      )}
    </>
  );
};

export default TransactionsPage;
