"use server";

import { SignInFormSchema } from "@/lib/definitions";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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
  const result = SignInFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }
  const { email, password } = result.data;

  try {
    const exist = await axios.request({
      url: `${apiUrl}/users/exist-by-email`,
      method: "GET",
      headers: { "Content-Type": "application/json" },
      data: { email },
    });
    console.log(exist.data);

    const { data } = await axios.post(`${apiUrl}/users/login`, {
      email,
      password,
    });

    console.log("Login successful:", data.access_token);

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
      if (status === 500) {
        return { errors: { password: ["Неверный email или пароль"] } };
      }
      if (status === 400) {
        return { errors: { general: ["Неверный запрос"] } };
      }
    }
    return { errors: { general: ["Серверная ошибка, попробуйте позже"] } };
  }
}
