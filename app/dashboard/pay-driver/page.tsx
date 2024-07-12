"use client";

import axios from "axios";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiMiniArrowLongLeft } from "react-icons/hi2";
import { errorToast, successToast } from "~/components/dashboard/ToastsProvider";
import { getSavedState } from "~/lib/localStorage";

interface DriverInfoType {
  created_at: string;
  driver_license_number: string;
  email: string;
  first_name: string;
  id: string;
  last_name: string;
  profile_picture: string;
  role: string;
  tag: string;
  updated_at: string;
  vehicle_registration_number: string;
}

const PayDriverPage = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState(1);
  const [textInput, setTextInput] = useState("");
  const [ticketNumber, setTicketNumber] = useState(1);
  const [driversInfo, setDriversInfo] = useState<DriverInfoType | null>(null);
  const userInfo = getSavedState("taxicoUser") || "";

  const getDriversInfo = async () => {
    setLoading(true);
    console.log(textInput);

    try {
      const response = await axios.get(
        `https://${process.env.NEXT_PUBLIC_SUPABASE_REF}.supabase.co/rest/v1/users?tag=eq.${textInput}`,
        {
          headers: {
            "Content-Type": "application/json",
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
          }
        }
      );
      console.log(response);
      if (response && response?.status === 200) {
        console.log("driver data is ", response);
        setDriversInfo(response.data[0]);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      errorToast("Something went wrong please try again later!");
    } finally {
      setLoading(false);
    }
  };

  const payDriver = async () => {
    setLoading(true);
    console.log(userInfo);
    console.log(driversInfo?.id)
    console.log((ticketNumber * 200).toFixed(1))

    try {
      const response = await axios.post(
        `https://${process.env.NEXT_PUBLIC_SUPABASE_REF}.supabase.co/rest/v1/transactions`,
        {
          sender_id: userInfo?.user_metadata?.sub || "",
          receiver_id: driversInfo?.id,
          amount: (ticketNumber * 200).toFixed(1),
          type: "Transfer",
        },
        {
          headers: {
            "Content-Type": "application/json",
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          }
        }
      );
      console.log(response);
      if (response && response?.status === 201) {
        console.log("Driver successfully paid ", response);
        console.log("successful");
        successToast("Successfully paid driver")
        setDriversInfo(response.data[0]);
        setStage(1);
        setDriversInfo(null);
        setTicketNumber(1);
        setLoading(false);
        // redirect("/dashboard");
      }
    } catch (error) {
      console.log(error);
      errorToast("Something went wrong please try again!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (stage === 1 && textInput.length > 3) {
      console.log(textInput);
      getDriversInfo();
    }
  }, [textInput]);

  const handleSubmission = async () => {
    if (stage === 1) {
      setStage(2);
    } else {
      payDriver();
    }
  };
  return (
    <div className=" px-3 py-4 md:px-6 md:py-8 space-y-4 md:space-y-6">
      <Link href={"/dashboard"} className="flex gap-3 md:gap-4 items-center">
        <HiMiniArrowLongLeft className="text-2xl md:text-3xl" />
        <Image src={"/logo.png"} height={26} width={106} alt="logo" />
      </Link>
      <div className="pt-[90px]">
        <h2 className="text-[#2B2B2B] font-medium text-xl md:text-[28px] text-center">
          Send money to a driver
        </h2>
        <p className="text-sm md:text-base text-[#525252] text-center mt-2">
          {stage === 1
            ? "Enter taxicotag of the driver"
            : "Pay for tickets with your wallet"}
        </p>
      </div>
      <div className="bg-white max-w-[400px] mx-auto border rounded-[24px] px-3 py-4 md:px-6 md:py-5 space-y-5">
        <div>
          <p className="mb-1">
            <label
              htmlFor="driverTag"
              className="text-form-black text-sm mb-1 font-medium">
              {stage === 1 ? "Enter Taxicotag" : "Number of Tickets"}
            </label>
          </p>
          {stage === 1 ? (
            <input
              type={"text"}
              name="textInput"
              required
              placeholder={"Enter recipient"}
              value={stage === 1 ? textInput : textInput || 1}
              onChange={e => setTextInput(e.target.value.toLowerCase())}
              className={`w-full text-sm focus:border-custom-blue focus:outline-none focus:ring-1 focus:ring-white rounded-lg !bg-white border border-custom-ash px-2.5 h-12`}
            />
          ) : (
            <input
              type="number"
              name="ticketNumber"
              required
              placeholder={"Number of tickets do you want to pay for"}
              value={ticketNumber}
              onChange={e => setTicketNumber(parseInt(e.target.value))}
              min={1}
              className={`w-full text-sm focus:border-custom-blue focus:outline-none focus:ring-1 focus:ring-white rounded-lg !bg-white border border-custom-ash px-2.5 h-12`}
            />
          )}
        </div>
        <div className="px-2.5 h-12 border border-custom-ash bg-[#f5f5f5] rounded-lg flex items-center justify-between text-[13px]">
          <p className="text-[#BFBFBF]">{stage === 1 ? "Name" : "Amount"}</p>
          <p className="text-form-black font-medium">
            {stage === 1
              ? driversInfo
                ? driversInfo?.first_name + " " + driversInfo?.last_name
                : ""
              : ticketNumber * 200}
          </p>
        </div>
        <div className="w-full flex flex-col items-center">
          {error && (
            <div className="text-sm font-medium text-[#EF2929]">{error}</div>
          )}
          <button
            onClick={handleSubmission}
            className={`w-full text-center font-medium rounded-3xl bg-custom-blue text-white disabled:text-black disabled:bg-[#F3F3F3] px-2.5 py-3 text-sm hover:bg-custom-blue transition-all duration-300 hover:text-white `}
            disabled={loading || !driversInfo}>
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin mx-auto" />
            ) : stage === 1 ? (
              "Continue"
            ) : (
              "Pay from Wallet"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayDriverPage;
