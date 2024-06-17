"use client"
import { usePaystackPayment } from "react-paystack";
import { FiPlus } from "react-icons/fi";

const PaystackIntegration = () => {
  const config = {
    reference: new Date().getTime().toString(),
    email: "user@example.com",
    amount: 20000, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: "pk_test_dsdfghuytfd2345678gvxxxxxxxxxx"
  };

  // you can call this function anything
  const onSuccess = reference => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const initializePayment = usePaystackPayment(config);
  return (
    <button
      onClick={() => {
        initializePayment(onSuccess, onClose);
      }}
      className="w-fit h-fit text-nowrap whitespace-nowrap flex items-center gap-1.5 text-custom-blue hover:text-grey-2 text-sm">
      <FiPlus />
      Fund Wallet
    </button>
  );
};

export default PaystackIntegration;
