"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { LoginFormSchema } from "~/lib/validation-schema";

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
import { saveLocalState } from "~/lib/localStorage";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema)
  });

  const onSubmit = async (value: z.infer<typeof LoginFormSchema>) => {
    setLoading(true);
    setError("");

    try {
      const response: any = await axios.post(
        `https://${process.env.NEXT_PUBLIC_SUPABASE_REF}.supabase.co/auth/v1/token?grant_type=password`,
        {
          email: value.email,
          password: value.password
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
        const data = {
          access_token: response?.data?.access_token,
          expires_at: response?.data?.expires_at,
          expires_in: response?.data?.expires_in,
          refresh_token: response?.data?.refresh_token,
          user_metadata: response?.data?.user?.user_metadata
        };
        console.log("The data is: ", data);
        saveLocalState("taxicoUser", data);
        router.push("/dashboard");
      }
    } catch (error: any) {
      // setError("Something went wrong. Please try again later.");
      console.log(error);
      if (error?.response?.status === 400) {
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
        className="space-y-4">
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
                  placeholder="Your Email"
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
                  placeholder="Your Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && (
          <div className="text-sm font-medium text-[#EF2929] pl-3.5">
            {error}
          </div>
        )}
        <div className="pt-4">
          <Button
            className={`w-full font-medium rounded-3xl disabled:text-black text-white px-2.5 py-6 text-sm bg-custom-blue disabled:bg-[#F3F3F3] transition-all duration-300`}
            disabled={
              loading ||
              form.getValues("email") === undefined ||
              form.getValues("password") === undefined ||
              form.getValues("email") === "" ||
              form.getValues("password") === ""
            }
            type="submit">
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Log In"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
