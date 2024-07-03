"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import ErrorBox from "~/components/dashboard/ErrorBox";
import LoadingBox from "~/components/dashboard/LoadingBox";
import { errorToast } from "~/components/dashboard/ToastsProvider";
import UsersTable from "~/components/dashboard/UsersTable";
import { usersInfoType } from "~/lib/types/DashboardTypes";

const UserAccountsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [commutersInfo, setCommutersInfo] = useState<usersInfoType[]>([]);
  const [error, setError] = useState("");

  const getUsersInfo = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response: any = await axios.get(
        `https://${process.env.NEXT_PUBLIC_SUPABASE_REF}.supabase.co/rest/v1/users?select=*`,
        {
          headers: {
            "Content-Type": "application/json",
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
          }
        }
      );
      if (response && response?.status === 200) {
        console.log("Commuters Info -", response?.data);
        setCommutersInfo(response?.data);
      }
    } catch (error: any) {
      console.log(error);
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsersInfo();
  }, []);

  return isLoading ? (
    <LoadingBox />
  ) : !isLoading && error !== "" ? (
    <ErrorBox />
  ) : (
    <>
      <UsersTable type={"Users"} data={commutersInfo} />
    </>
  )
};

export default UserAccountsPage;
