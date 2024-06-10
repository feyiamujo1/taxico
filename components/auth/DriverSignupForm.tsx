"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
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

export default function DriverSignUp() {
  const [loading, setLoading] = useState(false);
  const [fileItem, setFileItem] = useState<string | ArrayBuffer | null>(null);
  const [serverError, setServerError] = useState("");
  const router = useRouter();
  const form = useForm<z.infer<typeof DriverSignupFormSchema>>({
    resolver: zodResolver(DriverSignupFormSchema)
  });

  const onSubmit = async (value: z.infer<typeof DriverSignupFormSchema>) => {
    setLoading(true);
    setServerError("");

    try {
      const newUser = await (
        await fetch("/api/sanity/signUp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(value)
        })
      ).json();

      if (newUser?.error) {
        form.setError("email", {
          type: "custom",
          message: newUser.error
        });
        return;
      }

      const res = await signIn("sanity-login", {
        redirect: false,
        email: value.email,
        password: value.password
      });

      if (res?.error) {
        throw new Error(res.error);
      }

      router.push("/");
    } catch (error) {
      setServerError("Something went wrong. Please try again later.");
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
        <DragFileUpload fileItem={fileItem} setFileItem={setFileItem} />
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
                      className="focus:ring-1 focus:ring-white rounded-lg !bg-white border border-custom-ash px-2.5 h-12 md:w-full"
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
                      className="focus:ring-1 focus:ring-white rounded-lg !bg-white border border-custom-ash px-2.5 h-12 md:w-full"
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
              <FormLabel className="text-form-black text-sm">
                Government Id
              </FormLabel>
              <FormControl>
                <Input
                  className="focus:ring-1 focus:ring-white rounded-lg !bg-white border border-custom-ash px-2.5 h-12"
                  type="input"
                  readOnly
                  placeholder="Driver's License"
                  {...field}
                />
              </FormControl>
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
                  className="focus:ring-1 focus:ring-white rounded-lg !bg-white border border-custom-ash px-2.5 h-12"
                  type="email"
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
                  className="focus:ring-1 focus:ring-white rounded-lg !bg-white border border-custom-ash px-2.5 h-12"
                  type="email"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-form-black text-sm">
                Email Address
              </FormLabel>
              <FormControl>
                <Input
                  className="focus:ring-1 focus:ring-white rounded-lg !bg-white border border-custom-ash px-2.5 h-12"
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
                  className="focus:ring-1 focus:ring-white rounded-lg !bg-white border border-custom-ash px-2.5 h-12"
                  type="password"
                  placeholder="Your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {serverError && (
          <div className="text-sm font-medium text-red-500">{serverError}</div>
        )}
        <div className="pt-4">
          <Button
            className={`w-full font-medium rounded-3xl disabled:text-black text-white px-2.5 py-6 text-sm bg-custom-blue disabled:bg-[#F3F3F3] transition-all duration-300`}
            disabled={
              loading ||
              form.getValues("firstName") === undefined ||
              form.getValues("lastName") === undefined ||
              form.getValues("email") === undefined ||
              form.getValues("password") === undefined ||
              form.getValues("governmentId") === undefined ||
              form.getValues("licenseNumber") === undefined ||
              form.getValues("vehicleRegistrationNo") === undefined ||
              form.getValues("firstName") === "" ||
              form.getValues("lastName") === "" ||
              form.getValues("email") === "" ||
              form.getValues("password") === "" ||
              form.getValues("governmentId") === "" ||
              form.getValues("licenseNumber") === "" ||
              form.getValues("vehicleRegistrationNo") === ""
            }
            type="submit">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create account
          </Button>
        </div>
      </form>
    </Form>
  );
}
