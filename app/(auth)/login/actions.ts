"use server";

import { SignInFormSchema } from "@/lib/definitions";
import axios from "axios";
import { cookies } from "next/headers";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export type LoginState = {
  errors?: {
    email?: string[];
    password?: string[];
    general?: string[];
  };
  redirectTo?: string;
};

export async function login(
  prevState: LoginState | undefined,
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
    const response = await axios.post(`${apiUrl}/auth/login`, {
      email,
      password,
    });

    const { access_token, refresh_token, expires } = response.data.data;

    const cookieStore = await cookies();

    cookieStore.set("spichka_token", access_token, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: expires,
    });

    cookieStore.set("spichka_refresh", refresh_token, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // или сколько у тебя
    });

    // либо return redirect("/homepage")
    return {
      redirectTo: "/homepage",
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

    return {
      errors: {
        general: ["Серверная ошибка, попробуйте позже"],
      },
    };
  }
}
