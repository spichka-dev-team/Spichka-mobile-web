"use server";

import { SignUpFormSchema } from "@/lib/definitions";
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

type SignUpErrors = {
  first_name?: string[];
  last_name?: string[];
  username?: string[];
  email?: string[];
  password?: string[];
  general?: string[];
};

export type SignUpState = {
  errors?: SignUpErrors;
  redirectTo?: string;
  cookie?: {
    name: string;
    value: string;
  };
};

export async function signup(
  state: SignUpState | undefined,
  formData: FormData
): Promise<SignUpState> {
  // 1. Validate fields
  const validationResult = SignUpFormSchema.safeParse({
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { first_name, last_name, username, email, password } =
    validationResult.data;

  // 2. Create user

  try {
    // 2. Отправка данных на внешний API
    const response = await axios.post(
      "https://vencera.tech/spichka/api/auth/register",
      {
        first_name,
        last_name,
        username,
        email,
        password,
      }
    );

    // 3. Обработка успешного ответа
    const { access_token } = response.data;

    return {
      redirectTo: "/profile",
      cookie: {
        name: "spichka_token",
        value: access_token,
      },
    };
  } catch (error: unknown) {
    // 4. Обработка ошибок
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 409) {
        return {
          errors: {
            email: ["Пользователь с таким email или username уже существует"],
          },
        };
      }

      if (error.response?.status === 400) {
        return {
          errors: {
            general: ["Неверные данные. Проверьте форму."],
          },
        };
      }
    }

    return {
      errors: {
        general: ["Произошла неизвестная ошибка. Попробуйте позже."],
      },
    };
  }
}
