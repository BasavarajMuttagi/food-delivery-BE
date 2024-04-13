import { z } from "zod";

const userLoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "password cannot be less than 8 digits" })
    .max(10, { message: "password cannot be more than 10 digits" }),
});

type userLoginType = z.infer<typeof userLoginSchema>;

const userSignUpSchema = z.object({
  fullname: z.string().min(3),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "password cannot be less than 8 digits" })
    .max(10, { message: "password cannot be more than 10 digits" }),
  confirmpassword: z
    .string()
    .min(8, { message: "password cannot be less than 8 digits" })
    .max(10, { message: "password cannot be more than 10 digits" }),
  address: z.string().min(3).max(30),
});

type userSignUpType = z.infer<typeof userSignUpSchema>;

export { userLoginSchema, userSignUpSchema, userLoginType, userSignUpType };
