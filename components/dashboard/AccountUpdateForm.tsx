"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { SignupFormSchema } from "~/lib/validation-schema";

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

export default function AccountUpdateForm() {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const router = useRouter();
  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema)
  });

  const onSubmit = async (value: z.infer<typeof SignupFormSchema>) => {
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
        <FormField
          control={form.control}
          name="profilePicture"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-form-black md:text-lg font-medium !pb-2">
                Profile Picture
              </FormLabel>
              <FormControl>
                <Input
                  className="focus:ring-1 focus:ring-white rounded-lg border border-custom-ash px-2.5 h-12 bg-custom-ash border-dashed !mt-4"
                  type="name"
                  placeholder="Drop profile picture or browse"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="md:text-lg font-medium text-form-black pt-2">Account Details</p>
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
        {serverError && (
          <div className="text-sm font-medium text-red-500">{serverError}</div>
        )}
        <div className="pt-4 space-y-4">
          <Button
            className={`w-full font-medium rounded-3xl hover:text-black hover:bg-[#F3F3F3] px-2.5 py-6 text-sm bg-custom-blue transition-all duration-300 text-white `}
            disabled={loading}
            type="submit">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
          <Button
            className={`w-full font-medium rounded-3xl text-black bg-[#F3F3F3] px-2.5 py-6 text-sm hover:bg-custom-blue transition-all duration-300 hover:text-white`}
            disabled={loading}
            type="submit">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete Account
          </Button>

        </div>
      </form>
    </Form>
  );
}
