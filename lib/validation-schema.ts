import { z } from "zod";

// Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, {
      message: "Password must be a minimum of 8 characters"
    })
    .regex(passwordValidation, {
      message:
        "Password must be a contain both uppercase and lowercase letters with numbers and special characters"
    })
});

export const SignupFormSchema = z.object({
  firstName: z.string().min(1, { message: "Name can not be empty" }),
  lastName: z.string().min(1, { message: "Name can not be empty" }),
  tag: z
    .string()
    .min(3, { message: "Must be 3 or more characters long" })
    .max(10, { message: "Must be maximum of 11 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, {
      message: "Password must be a minimum of 8 characters"
    })
    .regex(passwordValidation, {
      message:
        "Password must be a contain both uppercase and lowercase letters with numbers and special characters"
    })
});

export const DriverSignupFormSchema = z.object({
  firstName: z.string().min(1, { message: "Name can not be empty" }),
  lastName: z.string().min(1, { message: "Name can not be empty" }),
  tag: z
    .string()
    .min(3, { message: "Must be 3 or more characters long" })
    .max(10, { message: "Must be maximum of 11 characters" }),
  governmentId: z.string().min(1, { message: "Name can not be empty" }),
  licenseNumber: z.string().min(1, { message: "Name can not be empty" }),
  vehicleRegistrationNo: z
    .string()
    .min(1, { message: "Name can not be empty" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, {
      message: "Password must be a minimum of 8 characters"
    })
    .regex(passwordValidation, {
      message:
        "Password must be a contain both uppercase and lowercase letters with numbers and special characters"
    })
});

export const AccountUpdateFormSchema = z.object({
  firstName: z.string().min(1, { message: "Name can not be empty" }).optional(),
  lastName: z.string().min(1, { message: "Name can not be empty" }).optional(),
  governmentId: z
    .string()
    .min(1, { message: "Name can not be empty" })
    .optional(),
  licenseNumber: z
    .string()
    .min(1, { message: "Name can not be empty" })
    .optional(),
  tag: z
    .string()
    .min(3, { message: "Must be 3 or more characters long" })
    .max(10, { message: "Must be maximum of 11 characters" })
    .optional(),
  vehicleRegistrationNo: z
    .string()
    .min(1, { message: "Name can not be empty" })
    .optional(),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .optional(),
  password: z
    .string()
    .min(8, {
      message: "Password must be a minimum of 8 characters"
    })
    .regex(passwordValidation, {
      message:
        "Password must be a contain both uppercase and lowercase letters with numbers and special characters"
    })
});

export const ForgotPasswordFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" })
});

export const NewPasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(8, {
        message: "Password must be a minimum of 8 characters"
      })
      .regex(passwordValidation, {
        message:
          "Password must be a contain both uppercase and lowercase letters with numbers and special characters"
      }),
    confirm_password: z
      .string()
      .min(8, {
        message: "Password must be a minimum of 8 characters"
      })
      .regex(passwordValidation, {
        message:
          "Password must be a contain both uppercase and lowercase letters with numbers and special characters"
      })
  })
  .refine(data => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match"
  });
