"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "~/components/ui/select";

import * as z from "zod";

import {
  AccountUpdateFormSchema,
} from "~/lib/validation-schema";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form";
import { Input } from "../ui/input";
import axios from "axios";
import { getSavedState, saveLocalState } from "~/lib/localStorage";
import { usersInfoType } from "~/lib/types/DashboardTypes";
import { successToast } from "../dashboard/ToastsProvider";

export default function EditAccount() {
  const userInfo = getSavedState("taxicoUser") || "Loading";
  const role = userInfo?.user_metadata?.role;
  console.log(userInfo);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof AccountUpdateFormSchema>>({
    resolver: zodResolver(AccountUpdateFormSchema)
  });

  const [myInfo, setMyInfo] = useState<usersInfoType>();

  const getUsersInfo = async () => {
    setError("");
    try {
      const response: any = await axios.get(
        `https://${process.env.NEXT_PUBLIC_SUPABASE_REF}.supabase.co/rest/v1/users?select=*&id=eq.${userInfo?.user_metadata?.sub}`,
        {
          headers: {
            "Content-Type": "application/json",
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
          }
        }
      );
      if (response && response?.status === 200) {
        console.log("Commuters Info -", response?.data);
        setMyInfo(response?.data[0]);
      }
    } catch (error: any) {
      console.log(error);
      setError("Something went wrong. Please try again later.");
    }
  };

  useEffect(() => {
    getUsersInfo();
  }, []);

  const onSubmit = async (value: z.infer<typeof AccountUpdateFormSchema>) => {
    // setLoading(true);
    setError("");

    const newValues = {
      email: myInfo?.email,
      password: value.password,
      data: {
        role: myInfo?.role,
        first_name:
          value.firstName === " " || value.firstName === " "
            ? myInfo?.first_name
            : value.firstName,
        last_name:
          value.lastName === " " || value.lastName === " "
            ? myInfo?.last_name
            : value.lastName,
        tag: myInfo?.tag,
        driver_license_number:
          value.licenseNumber === " " || value.licenseNumber === " "
            ? myInfo?.driver_license_number
            : value.licenseNumber,
        vehicle_registration_number:
          value.vehicleRegistrationNo === " " ||
          value.vehicleRegistrationNo === " "
            ? myInfo?.vehicle_registration_number
            : value.vehicleRegistrationNo,
        profile_picture: ""
      }
    };

    console.log(newValues);

    try {
      const response = await axios.post(
        `https://${process.env.NEXT_PUBLIC_SUPABASE_REF}.supabase.co/auth/v1/signup`,
        {
          email: myInfo?.email,
          password: value.password,
          data: {
            role: myInfo?.role,
            first_name:
              value.firstName === " " || value.firstName === " "
                ? myInfo?.first_name
                : value.firstName,
            last_name:
              value.lastName === " " || value.lastName === " "
                ? myInfo?.last_name
                : value.lastName,
            tag: myInfo?.tag,
            driver_license_number:
              value.licenseNumber === " " || value.licenseNumber === " "
                ? myInfo?.driver_license_number
                : value.licenseNumber,
            vehicle_registration_number:
              value.vehicleRegistrationNo === " " ||
              value.vehicleRegistrationNo === " "
                ? myInfo?.vehicle_registration_number
                : value.vehicleRegistrationNo,
            profile_picture: ""
          }
        },
        {
          headers: {
            "Content-Type": "application/json",
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
          }
        }
      );

      if (response && response?.status === 200) {
        console.log(response);
        successToast("Account details updated successfully!");
        const data = {
          access_token: response?.data?.access_token,
          expires_at: response?.data?.expires_at,
          expires_in: response?.data?.expires_in,
          refresh_token: response?.data?.refresh_token,
          user_metadata: response?.data?.user?.user_metadata
        };
        console.log("The data is: ", data);
        saveLocalState("taxicoUser", data);
      }
    } catch (error: any) {
      // setError("Something went wrong. Please try again later.");
      console.log(error);
      if (error?.response?.status === 404) {
        setError("User not found!");
      } else if (error?.response?.status === 401) {
        setError("Invalid email or password!");
      } else if (error?.response?.status === 422) {
        setError(error.response.data.msg.replace(/,/g, ""));
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        method="post"
        className="space-y-3">
        {/* <DragFileUpload
          setFileItem={setFileItem}
          error={error}
          setError={setError}
        /> */}
        <div className="flex flex-col md:flex-row justify-between gap-3">
          <div className="md:w-1/2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-form-black text-sm">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="focus:ring-1 focus:ring-white rounded-lg !bg-white border border-custom-ash focus:border-custom-blue px-2.5 h-12 md:w-full"
                      type="text"
                      placeholder="Your firstname"
                      defaultValue={myInfo?.first_name}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="md:w-1/2">
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-form-black text-sm">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="focus:ring-1 focus:ring-white rounded-lg !bg-white border border-custom-ash focus:border-custom-blue px-2.5 h-12 md:w-full"
                      type="text"
                      placeholder="Your lastname"
                      defaultValue={myInfo?.last_name}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        {role === "driver" && (
          <>
            <FormField
              control={form.control}
              name="governmentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Government Id</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={"Driver's License"}
                          placeholder="Select identity type"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      <SelectItem value="Driver's License">
                        Driver&apos;s License
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="licenseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-form-black text-sm">
                    License Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="focus:ring-1 focus:ring-white rounded-lg !bg-white border border-custom-ash focus:border-custom-blue px-2.5 h-12"
                      type="text"
                      placeholder="Your license number"
                      defaultValue={myInfo?.driver_license_number}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vehicleRegistrationNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-form-black text-sm">
                    Vehicle Registration No
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="focus:ring-1 focus:ring-white rounded-lg !bg-white border border-custom-ash focus:border-custom-blue px-2.5 h-12"
                      type="text"
                      placeholder="Your registration number"
                      defaultValue={myInfo?.vehicle_registration_number}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <FormField
          control={form.control}
          name="tag"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-form-black text-sm">Tag</FormLabel>
              <FormControl>
                <Input
                  disabled
                  className="focus:ring-1 focus:ring-white rounded-lg !bg-white border border-custom-ash focus:border-custom-blue px-2.5 h-12 lowercase pointer-events-none"
                  type="text"
                  placeholder="Your Tag"
                  defaultValue={myInfo?.tag}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-form-black text-sm">
                Email Address
              </FormLabel>
              <FormControl>
                <Input
                  disabled
                  className="focus:ring-1 focus:ring-white rounded-lg !bg-white border border-custom-ash focus:border-custom-blue px-2.5 h-12 pointer-events-none"
                  defaultValue={myInfo?.email}
                  type="email"
                  placeholder="Your email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-form-black text-sm">
                Password
              </FormLabel>
              <FormControl>
                <Input
                  className="focus:ring-1 focus:ring-white rounded-lg !bg-white border border-custom-ash focus:border-custom-blue px-2.5 h-12"
                  type="password"
                  placeholder="Your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && error !== "User profile picture missing" && (
          <div className="text-sm text-[#EF2929] pl-3.5">{error}</div>
        )}
        <div className="pt-4">
          <Button
            className={`w-full font-medium rounded-3xl disabled:text-black text-white px-2.5 py-6 text-sm bg-custom-blue disabled:bg-[#F3F3F3] transition-all duration-300`}
            // disabled={
            // loading ||
            // form.getValues("firstName") === undefined ||
            // form.getValues("lastName") === undefined ||
            // form.getValues("email") === undefined ||
            // form.getValues("password") === undefined ||
            // form.getValues("governmentId") === undefined ||
            // form.getValues("licenseNumber") === undefined ||
            // form.getValues("vehicleRegistrationNo") === undefined ||
            // form.getValues("firstName") === "" ||
            // form.getValues("lastName") === "" ||
            // form.getValues("email") === "" ||
            // form.getValues("password") === "" ||
            // form.getValues("governmentId") === "" ||
            // form.getValues("licenseNumber") === "" ||
            // form.getValues("vehicleRegistrationNo") === ""
            // }
            type="submit">
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
