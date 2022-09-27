import * as z from "zod";

export const loginSchema = z.object({
  userName: z.string().min(2),
  password: z.string().min(6),
});

export const createUserSchema = loginSchema
  .extend({
    email: z.string().email().min(2),
    name: z.string().min(2),
    repeatPassword: z.string().min(6),
  })
  .superRefine(({ password, repeatPassword }, ctx) => {
    if (password !== repeatPassword) {
      ctx.addIssue({
        code: "custom",
        message: `The password did't match`,
        path: ["repeatPassword"],
      });
    }
  });
