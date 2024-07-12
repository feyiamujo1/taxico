import React, { useEffect, useState } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { HiOutlineChevronRight } from "react-icons/hi2";
import axios from "axios";

import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { getSavedState } from "~/lib/localStorage";
import { errorToast, successToast } from "./ToastsProvider";

export interface BankListType {
  name: string;
  slud: string;
  code: string;
  ussd: string;
  logo: string;
}

const AddDriverAccountDetail = ({
  setIsUpdatingWallet
}: {
  setIsUpdatingWallet: Function;
}) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bankList, setBankList] = useState<BankListType[]>();
  const [formValues, setFormValues] = useState({
    bank: "",
    accountNumber: ""
  });
  const userInfo = getSavedState("taxicoUser") || "";

  const getBankList = async () => {
    setIsLoading(true);
    try {
      const response: any = await axios.get(
        `https://nigerianbanks.xyz`
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //     apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        //   }
        // }
      );
      if (response && response?.status === 200) {
        setBankList(response?.data);
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateAccountDetailInfo = async () => {
    setIsLoading(true);
    setOpen(true);
    console.log(userInfo?.user_metadata?.sub);
    console.log({
      bank_name: formValues.bank,
      bank_code: "dummy",
      account_number: formValues.accountNumber,
      user: userInfo?.user_metadata?.sub || ""
    });

    try {
      const response = await axios.post(
        `https://${process.env.NEXT_PUBLIC_SUPABASE_REF}.supabase.co/rest/v1/bank_account_details`,
        {
          bank_name: formValues.bank,
          bank_code: "dummy",
          account_number: formValues.accountNumber,
          user: userInfo?.user_metadata?.sub || ""
        },
        {
          headers: {
            "Content-Type": "application/json",
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
          }
        }
      );
      console.log(response);
      if (response && response?.status === 201) {
        console.log("Details added -", response);
        successToast("Withdraw account details added successfully!");
        console.log("successful");
        setIsUpdatingWallet(true)
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      errorToast("Something went wrong please try again!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBankList();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    console.log(formValues);
    updateAccountDetailInfo();
  };

  return (
    <AlertDialog.Root open={open}>
      <AlertDialog.Trigger asChild>
        <button
          onClick={() => setOpen(true)}
          className="w-full flex justify-between items-center py-4 border-b-[0.5px] border-[#DFDFDF] hover:bg-[#f0f1f3] transition-all duration-300">
          <p className="text-sm text-custom-black">Add new account</p>
          <HiOutlineChevronRight />
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="AlertDialogOverlay" />
        <AlertDialog.Content className="AlertDialogContent">
          <AlertDialog.Title className="AlertDialogTitle text-[#2B2B2B] font-medium text-lg md:text-xl">
            Enter account details
          </AlertDialog.Title>
          <AlertDialog.Description className="AlertDialogDescription text-sm md:text-base text-[#bfbfbf] mt-1.5">
            Ensure to enter your correct bank details
          </AlertDialog.Description>
          <div>
            {/* <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                method="post"
                className="space-y-3">
                <FormField
                  control={form.control}
                  name="bank"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank</FormLabel>
                      <br />
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="focus:ring-1 focus:ring-white rounded-lg !bg-white border border-custom-ash focus:border-custom-blue px-2.5 h-12 md:w-full text-left">
                            <SelectValue placeholder="Select bank" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white h-[300px] py-2 px-2 w-full overflow-y-scroll">
                          {bankList?.map((bank, id) => (
                            <SelectItem
                              key={id}
                              className="flex gap-2 items-center py-2 px-3 w-full border-b text-sm cursor-pointer hover:bg-[#f0f1f3]"
                              value={bank?.name}>
                              <Image
                                src={bank?.logo}
                                width={20}
                                height={20}
                                alt="bank icon"
                                className="rounded-full"
                              />{" "}
                              {bank?.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="accountNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-form-black text-sm">
                        Account Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="focus:ring-1 focus:ring-white rounded-lg !bg-white border border-custom-ash focus:border-custom-blue px-2.5 h-12 md:w-full"
                          type="text"
                          placeholder="Enter your account number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  className={`w-full font-medium rounded-3xl disabled:text-black text-white px-2.5 py-6 text-sm bg-custom-blue disabled:bg-[#F3F3F3] transition-all duration-300`}
                  // }
                  type="submit">
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Save
                </Button>
              </form>
            </Form> */}
            <form onSubmit={onSubmit} method="post" className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-1">Bank</label>
                <br />
                <select
                  name="bank"
                  value={formValues.bank}
                  onChange={handleChange}
                  required
                  className="focus:ring-1 focus:ring-white rounded-lg bg-white border border-custom-ash focus:border-custom-blue px-2.5 h-12 w-full text-left">
                  <option value="" disabled>
                    Select bank
                  </option>
                  {bankList?.map((bank, id) => (
                    <option key={id} value={bank?.name}>
                      {bank?.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1">
                  Account Number
                </label>
                <input
                  type="text"
                  name="accountNumber"
                  required
                  placeholder="Enter your account number"
                  value={formValues.accountNumber}
                  onChange={handleChange}
                  min={10}
                  className="focus:ring-1 focus:ring-white rounded-lg bg-white border border-custom-ash focus:border-custom-blue px-2.5 h-12 w-full"
                />
              </div>
              <Button
                className={`w-full font-medium rounded-3xl disabled:text-black text-white px-2.5 py-6 text-sm bg-custom-blue disabled:bg-[#F3F3F3] transition-all duration-300`}
                disabled={isLoading}
                type="submit">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Save"
                )}
              </Button>
            </form>
            <div className="mt-4 w-full text-center">
              <AlertDialog.Cancel onClick={() => setOpen(false)} asChild>
                <button
                  onClick={() => {
                    setOpen(false);
                    setIsLoading(false);
                  }}
                  className="Button mauve">
                  Cancel
                </button>
              </AlertDialog.Cancel>
            </div>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default AddDriverAccountDetail;
