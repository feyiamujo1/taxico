import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(5, { message: "Must be 5 or more characters long" }),
});

export const SignupFormSchema = z.object({
  firstName: z.string().min(1, { message: "Name can not be empty" }),
  lastName: z.string().min(1, { message: "Name can not be empty" }),
  profilePicture: z.string().min(1, { message: "Name can not be empty" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(5, { message: "Must be 5 or more characters long" }),
});

export const DriverSignupFormSchema = z.object({
  firstName: z.string().min(1, { message: "Name can not be empty" }),
  lastName: z.string().min(1, { message: "Name can not be empty" }),
  governmentId: z.string().min(1, { message: "Name can not be empty" }),
  licenseNumber: z.string().min(1, { message: "Name can not be empty" }),
  vehicleRegistrationNo: z.string().min(1, { message: "Vehicle registration number incomplete" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(5, { message: "Must be 5 or more characters long" }),
});

export const ForgotPasswordFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export const NewPasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(5, { message: "Must be 5 or more characters long" }),
    confirm_password: z
      .string()
      .min(5, { message: "Must be 5 or more characters long" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match",
  });
