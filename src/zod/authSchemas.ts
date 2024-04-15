import z from "zod";
const userLoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "password cannot be less than 8 digits" })
    .max(10, { message: "password cannot be more than 10 digits" }),
});

type userLoginType = z.infer<typeof userLoginSchema>;

const userSignUpSchema = z
  .object({
    fullname: z.string().min(3).max(50),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "password cannot be less than 8 digits" })
      .max(10, { message: "password cannot be more than 10 digits" }),
    confirmpassword: z
      .string()
      .min(8, { message: "password cannot be less than 8 digits" })
      .max(10, { message: "password cannot be more than 10 digits" }),
    phone: z.string().min(10).max(13),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    address: z.string(),
  })

type userSignUpType = z.infer<typeof userSignUpSchema>;

export { userLoginSchema, userSignUpSchema };
export type { userLoginType, userSignUpType };
