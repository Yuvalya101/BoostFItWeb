import z from "zod";

export const UserRegistrationValidationScheme = z.object({
  email: z.string().email({ message: "Invalid email address. Please provide a valid email." }),
  password: z.string().min(6, "Password must be atleast 6 characters long"),
  name: z.string(),
});

export const UserLoginValidationScheme = z.object({
  email: z.string().email({ message: "Invalid email address. Please provide a valid email." }),
  password: z.string().min(6, "Password must be atleast 6 characters long"),
});

export type UserRegistration = z.infer<typeof UserRegistrationValidationScheme>;
export type UserLogin = z.infer<typeof UserLoginValidationScheme>;
