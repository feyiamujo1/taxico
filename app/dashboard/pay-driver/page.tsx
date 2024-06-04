"use client";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { HiMiniArrowLongLeft } from "react-icons/hi2";

const page = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState(1);
  const [textInput, setTextInput] = useState("");
  return (
    <div className=" px-3 py-4 md:px-6 md:py-8 space-y-4 md:space-y-6">
      <div className="flex gap-3 md:gap-4 items-center">
        <HiMiniArrowLongLeft className="text-2xl md:text-3xl" />
        <Image src={"/icon.png"} height={26} width={106} alt="logo" />
      </div>
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
          <input
            type={stage === 1 ? "text" : "number"}
            name="textInput"
            required
            placeholder={stage === 1 ? "Enter recipient" : ""}
            value={stage === 1 ? textInput : textInput || 1}
            onChange={e => setTextInput(e.target.value)}
            min={stage !== 1 ? 1 : undefined}
            className="w-full text-sm focus:ring-1 focus:ring-white rounded-lg !bg-white border border-custom-ash px-2.5 h-12"
          />
        </div>
        <div className="px-2.5 h-12 border border-custom-ash bg-[#f5f5f5] rounded-lg flex items-center justify-between text-[13px]">
          <p className="text-[#BFBFBF]">{stage === 1 ? "Name" : "Amount"}</p>
          <p className="text-form-black font-medium">
            {stage === 1
              ? "Samuel Ajibade"
              : !textInput
              ? 200
              : parseInt(textInput) * 200}
          </p>
        </div>
        <div className="w-full flex flex-col items-center">
          {error && (
            <div className="text-sm font-medium text-[#EF2929]">{error}</div>
          )}
          <button
            className={`w-full font-medium rounded-3xl text-black bg-[#F3F3F3] px-2.5 py-3 text-sm hover:bg-custom-blue transition-all duration-300 hover:text-white`}
            disabled={loading}
            type="submit">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {stage === 1 ? "Continue" : "Pay from Wallet"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
