"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import ErrorBox from "~/components/dashboard/ErrorBox";
import LoadingBox from "~/components/dashboard/LoadingBox";
import ShortInformationContainer from "~/components/dashboard/ShortInformationContainer";
import TransactionTable from "~/components/dashboard/TransactionTable";
import { getSavedState } from "~/lib/localStorage";
import { TransactionsType } from "~/lib/types/DashboardTypes";

const TransactionsPage = () => {
  const TransactionData = [
    {
      id: 0,
      created_at: "22 May 2024, 20:05:54",
      amount: "200",
      type: "Funding",
      description: "From Paystack",
      status: "Completed"
    },
    {
      id: 1,
      created_at: "22 May 2024, 20:05:54",
      amount: "200",
      type: "Transfer",
      description: "To Driver",
      status: "Completed"
    },
    {
      id: 2,
      created_at: "22 May 2024, 20:05:54",
      amount: "200",
      type: "Funding",
      description: "From Paystack",
      status: "Completed"
    },
    {
      id: 3,
      created_at: "22 May 2024, 20:05:54",
      amount: "200",
      type: "Transfer",
      description: "To Driver",
      status: "Completed"
    },
    {
      id: 4,
      created_at: "22 May 2024, 20:05:54",
      amount: "200",
      type: "Transfer",
      description: "To Driver",
      status: "Completed"
    },
    {
      id: 5,
      created_at: "22 May 2024, 20:05:54",
      amount: "200",
      type: "Funding",
      description: "From Paystack",
      status: "Completed"
    },
    {
      id: 6,
      created_at: "22 May 2024, 20:05:54",
      amount: "200",
      type: "Funding",
      description: "From Paystack",
      status: "Completed"
    },
    {
      id: 7,
      created_at: "22 May 2024, 20:05:54",
      amount: "200",
      type: "Transfer",
      description: "To Driver",
      status: "Completed"
    },
    {
      id: 8,
      created_at: "22 May 2024, 20:05:54",
      amount: "200",
      type: "Funding",
      description: "From Paystack",
      status: "Completed"
    }
  ];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userInfo = getSavedState("taxicoUser");
  const [transactionTableInfo, setTransactionTableInfo] = useState<
    TransactionsType[] | null
  >();

  const getdashboardInfo = async () => {
    try {
      const response: any = await axios.get(
        `https://${process.env.NEXT_PUBLIC_SUPABASE_REF}.supabase.co/rest/v1/transactions?select=*&id=eq.${userInfo?.user_metadata?.sub}`,
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
  return (loading ? (
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
    </>)
  );
};

export default TransactionsPage;
