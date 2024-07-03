"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import ErrorBox from "~/components/dashboard/ErrorBox";
import LoadingBox from "~/components/dashboard/LoadingBox";
import UsersTable from "~/components/dashboard/UsersTable";
import { usersInfoType } from "~/lib/types/DashboardTypes";

const DriversPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [driversInfo, setDriversInfo] = useState<usersInfoType[]>([]);
  const [error, setError] = useState("")

  const getCommutersInfo = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response: any = await axios.get(
        `https://${process.env.NEXT_PUBLIC_SUPABASE_REF}.supabase.co/rest/v1/users?select=*&role=eq.driver`,
        {
          headers: {
            "Content-Type": "application/json",
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
          }
        }
      );
      if (response && response?.status === 200) {
        console.log("Drivers info -", response?.data);
        setDriversInfo(response?.data);
      }
    } catch (error: any) {
      console.log(error);
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCommutersInfo();
  }, []);
  return isLoading ? (
    <LoadingBox />
  ) : !isLoading && error !== "" ? (
    <ErrorBox />
  ) : (
    <>
      <UsersTable type={"Driver"} data={driversInfo} />
    </>
  )
};

export default DriversPage;
