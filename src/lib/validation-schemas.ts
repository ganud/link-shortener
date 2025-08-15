import { z } from "zod";

const loginFormSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

const registerFormSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
  confirmPassword: z.string().min(1),
});

export { loginFormSchema, registerFormSchema };
