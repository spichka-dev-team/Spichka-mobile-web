import { z } from "zod";

export const SignUpFormSchema = z.object({
  email: z.string().email("Неверный email"),
  password: z.string().min(6, "Пароль минимум 6 символов"),
});

export const SignInFormSchema = z.object({
  email: z.string().email({ message: "Неверный email" }),
  password: z.string().min(1, { message: "Введите пароль" }),
});

// Тип автоматически выводится из схемы:
export type SignUpFormValues = z.infer<typeof SignUpFormSchema>;
export type SignInFormValues = z.infer<typeof SignInFormSchema>;
