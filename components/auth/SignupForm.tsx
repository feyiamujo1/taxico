"use client";

import { createClient } from "~/utils/supabase/client";

import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
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
import { revalidatePath } from "next/cache";

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema)
  });

  const onSubmit = async (value: z.infer<typeof SignupFormSchema>) => {
    const supabase = createClient();
    setLoading(true);
    setServerError("");

    const data = value;

    const { error } = await supabase.auth.signUp(data);

    if (error) {
      setServerError(error.message);
      setLoading(false);
    } else {
      setServerError("");
      setLoading(false);
      revalidatePath("/", "layout");
      redirect("/dashboard")
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        method="post"
        className="space-y-3">
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
          name="tag"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-form-black text-sm">
                Tag
              </FormLabel>
              <FormControl>
                <Input
                  className="focus:ring-1 focus:ring-white rounded-lg !bg-white border border-custom-ash focus:border-custom-blue px-2.5 h-12"
                  type="tag"
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
              form.getValues("firstName") === "" ||
              form.getValues("lastName") === "" ||
              form.getValues("email") === "" ||
              form.getValues("password") === ""
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
