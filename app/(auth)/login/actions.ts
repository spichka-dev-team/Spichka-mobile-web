"use server";

import { SignInFormSchema } from "@/lib/definitions";
import axios from "axios";

export type LoginState = {
  errors?: {
    email?: string[];
    password?: string[];
    general?: string[];
  };
  redirectTo?: string;
  cookie?: {
    name: string;
    value: string;
  };
};

export async function login(
  state: LoginState | undefined,
  formData: FormData
): Promise<LoginState> {
  // 1. Validate
  const result = SignInFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }
  const { email, password } = result.data;

  try {
    // 2. Запрос на API
    const { data } = await axios.post(
      "https://vencera.tech/spichka/api/auth/login",
      { email, password }
    );

    // 3. Пишем cookie + редирект
    return {
      redirectTo: "/profile",
      cookie: {
        name: "spichka_token",
        value: data.access_token,
      },
    };
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      const status = err.response.status;
      if (status === 401) {
        return { errors: { password: ["Неверный email или пароль"] } };
      }
      if (status === 400) {
        return { errors: { general: ["Неверный запрос"] } };
      }
    }
    return { errors: { general: ["Серверная ошибка, попробуйте позже"] } };
  }
}
