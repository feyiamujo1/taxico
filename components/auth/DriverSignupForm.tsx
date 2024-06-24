"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { createClient } from "~/utils/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "~/components/ui/select";

import * as z from "zod";

import { DriverSignupFormSchema } from "~/lib/validation-schema";

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
import DragFileUpload from "./DragFileUpload";
import axios from "axios";

export default function DriverSignUp() {
  const [loading, setLoading] = useState(false);
  const currentRoute = usePathname();
  const supabase = createClient();
  const [fileItem, setFileItem] = useState<ArrayBuffer | File | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();
  const form = useForm<z.infer<typeof DriverSignupFormSchema>>({
    resolver: zodResolver(DriverSignupFormSchema)
  });

  const onSubmit = async (value: z.infer<typeof DriverSignupFormSchema>) => {
    setLoading(true);
    setError("");

    try {
      if (fileItem) {
        console.log(fileItem);
        // Send the image to bucket
        const { data: profilePictureUrl, error: serverError } =
          await supabase.storage
            .from("images")
            .upload(`${form.getValues("tag")}.png`, fileItem);
        // Then do the signup proper
        if (profilePictureUrl) {
          console.log(profilePictureUrl);
          const image_url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${profilePictureUrl?.path}`;
          console.log(image_url);
          const response = await axios.post(
            `https://${process.env.NEXT_PUBLIC_SUPABASE_REF}.supabase.co/auth/v1/signup`,
            {
              email: value.email,
              password: value.password,
              data: {
                role: "driver",
                first_name: value.firstName,
                last_name: value.lastName,
                tag: value.tag,
                driver_license_number: value.licenseNumber,
                vehicle_registration_number: value.vehicleRegistrationNo,
                profile_picture: image_url
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
            router.push("/login");
          }
        } else {
          throw new Error(serverError.message);
        }
      } else {
        setError("User profile picture missing");
        setLoading(false);
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
        <DragFileUpload
          setFileItem={setFileItem}
          error={error}
          setError={setError}
        />
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
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="governmentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Government Id</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select identity type" />
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
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tag"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-form-black text-sm">Tag</FormLabel>
              <FormControl>
                <Input
                  className="focus:ring-1 focus:ring-white rounded-lg !bg-white border border-custom-ash focus:border-custom-blue px-2.5 h-12 lowercase"
                  type="text"
                  placeholder="Your Tag"
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
                  className="focus:ring-1 focus:ring-white rounded-lg !bg-white border border-custom-ash focus:border-custom-blue px-2.5 h-12"
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
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

            {currentRoute.includes("/account")
              ? "Save Changes"
              : "Create account"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
