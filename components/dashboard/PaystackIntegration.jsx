import { PaystackConsumer } from "react-paystack";
import { FiPlus } from "react-icons/fi";
import { getSavedState } from "~/lib/localStorage";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as Dialog from "@radix-ui/react-dialog";
import { HiOutlineX } from "react-icons/hi";
import React, { useState } from "react";
import axios from "axios";
import { errorToast, successToast } from "./ToastsProvider";
import { CheckCircle, LoaderCircle } from "lucide-react";

const PaystackIntegration = ({ setIsUpdatingWallet, currentWalletBalance }) => {
  console.log("My current wallet history: ", currentWalletBalance);
  const [open, setOpen] = useState(false);
  const userInfo = getSavedState("taxicoUser") || "";
  const [inComingFund, setIncomingFund] = useState();
  const [isLoading, setIsLoading] = useState("");

  const updateWalletInfo = async () => {
    setIsLoading("updating");
    setOpen(true);
    console.log(userInfo?.user_metadata?.sub);

    console.log(
      "Funded to be updated",
      parseFloat(currentWalletBalance + inComingFund || 0).toFixed(2)
    );

    try {
      const response = await axios.patch(
        `https://${process.env.NEXT_PUBLIC_SUPABASE_REF}.supabase.co/rest/v1/wallets?id=eq.${userInfo?.user_metadata?.sub}`,
        {
          inflow: parseFloat(currentWalletBalance + inComingFund || 0).toFixed(
            1
          ),
          balance: parseFloat(currentWalletBalance + inComingFund || 0).toFixed(
            1
          )
        },
        {
          headers: {
            "Content-Type": "application/json",
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
          }
        }
      );
      console.log(response);
      if (response && response?.status === 204) {
        console.log("Wallet topped up -", response);
        successToast("Account funded successfully!");
        setIsUpdatingWallet(true);
        console.log("successful");
        setIncomingFund();
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      errorToast("Something went wrong please try again!");
    } finally {
      setIsLoading("");
    }
  };

  // you can call this function anything
  const handleSuccess = reference => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log("Here now!");
    console.log(reference);
    updateWalletInfo();
  };

  // you can call this function anything
  const handleClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("Here now!");
    console.log("closed");
    setIncomingFund();
    setIsLoading("");
    setOpen(false);
  };

  const handleChange = event => {
    setIncomingFund(event.target.value);
  };

  const config = {
    reference: new Date().getTime().toString(),
    email: userInfo.user_metadata?.email,
    amount: inComingFund * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: "pk_test_0061b5ba23303906e2f24fcc7801d3f46e4859ba",
    metadata: {
      custom_fields: [
        {
          display_name: "description",
          variable_name: "description",
          value: "Funding Wallet"
        }
        // To pass extra metadata, add an object with the same fields as above
      ]
    }
  };

  const componentProps = {
    ...config,
    text: "Continue",
    onSuccess: reference => handleSuccess(reference),
    onClose: handleClose
  };

  // const initializePayment = usePaystackPayment(config);

  // const handleSubmit = event => {
  //   // event.preventDefault();
  //   // initializePayment(onSuccess, onClose);
  // };

  return isLoading === "" ? (
    <Dialog.Root open={open} onOpenChange={setOpen} defaultOpen={open}>
      <Dialog.Trigger asChild>
        <button
          onClick={() => setOpen(true)}
          className="w-fit h-fit text-nowrap whitespace-nowrap flex items-center gap-1.5 text-custom-blue hover:text-grey-2 text-sm cursor-pointer">
          <FiPlus />
          Fund Wallet
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-[rgba(0,0,0,0.3)] backdrop-blur-sm !pointer-events-none" />
        <Dialog.Content className={`DialogContent`}>
          <div className="">
            <div className="bg-white px-3 py-4 md:px-6 md:py-8 space-y-4 md:space-y-6">
              <Dialog.Close asChild>
                <button
                  className="text-2xl hover:text-red-500 duration-300 float-right"
                  aria-label="Close">
                  <HiOutlineX />
                </button>
              </Dialog.Close>
              <Dialog.Title className="text-[#2B2B2B] font-medium text-lg md:text-xl">
                {isLoading ? "" : "Enter amount to fund wallet"}
              </Dialog.Title>
              <div className="">
                <p className="text-sm md:text-base text-[#bfbfbf] mt-1.5">
                  Ensure to fund your wallet with enough money for your trips
                </p>
              </div>
              <form className="space-y-4 md:space-y-6">
                <input
                  type="number"
                  min={100}
                  onChange={handleChange}
                  value={inComingFund}
                  placeholder="Minimum is NGN 100"
                  required
                  className="border outline-none w-full h-[44px] rounded-[8px] px-4 placeholder:text-[#bfbfbf]"
                />
                <div className="w-full flex flex-col items-center">
                  {inComingFund && inComingFund >= 100 ? (
                    <PaystackConsumer {...componentProps}>
                      {({ initializePayment }) => (
                        <button
                          type="submit"
                          className="w-full py-3 px-6 rounded-3xl text-sm 2xl:text-base bg-custom-blue text-white "
                          onClick={event => {
                            event.preventDefault();

                            console.log("hello");
                            if (inComingFund >= 100) {
                              console.log("wondering");
                              setOpen(false);
                              initializePayment(handleSuccess, handleClose);
                            }
                          }}>
                          Continue
                        </button>
                      )}
                    </PaystackConsumer>
                  ) : (
                    <button
                      type="submit"
                      onClick={e => {
                        e.preventDefault();
                        console.log("its me");
                      }}
                      className="w-full py-3 px-6 rounded-3xl text-sm 2xl:text-base bg-custom-blue text-white ">
                      Continue
                    </button>
                  )}
                  <Dialog.Close className="w-fit mx-auto text-center mt-3 text-sm 2xl:text-base text-[#666666] hover:text-custom-blue">
                    Cancel
                  </Dialog.Close>
                </div>
              </form>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  ) : (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger
        asChild
        className="w-fit h-fit text-nowrap whitespace-nowrap flex items-center gap-1.5 text-custom-blue hover:text-grey-2 text-sm cursor-pointer">
        <span>
          <FiPlus />
          Fund Wallet
        </span>
      </AlertDialog.Trigger>
      <AlertDialog.Portal className="">
        <AlertDialog.Overlay className="DialogOverlayTwo !bg-[rgba(0,0,0,0.6)] !backdrop-blur-sm " />
        <AlertDialog.Content className="AlertDialogContent">
          <AlertDialog.Title className="AlertDialogTitle"></AlertDialog.Title>
          <AlertDialog.Description className="AlertDialogDescription text-sm md:text-base text-custom-black mt-1.5 mb-16  flex flex-col justify-center gap-2 items-center h-full">
            {isLoading === "updating" ? (
              <>
                <LoaderCircle className=" animate-spin text-custom-blue text-2xl" />
                <p className="text-custom-blue ">
                  {" "}
                  Funding wallet please wait...
                </p>
              </>
            ) : (
              <>
                <CheckCircle className="text-custom-blue text-2xl" />
                <p className="text-custom-blue ">
                  {" "}
                  Wallet funded successfully! Redirecting...
                </p>
              </>
            )}
          </AlertDialog.Description>
          <div style={{ display: "flex", flexDirection: "column-reverse" }}>
            {isLoading !== "loading" && (
              <AlertDialog.Cancel asChild>
                <button
                  className=""
                  onClick={() => {
                    setOpen(false);
                    setIsLoading("");
                    setIncomingFund();
                  }}>
                  Cancel
                </button>
              </AlertDialog.Cancel>
            )}
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default PaystackIntegration;
