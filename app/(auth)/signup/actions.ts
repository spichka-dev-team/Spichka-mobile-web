"use server";

import { SignUpFormSchema } from "@/lib/definitions";
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

type SignUpErrors = {
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
  const validationResult = SignUpFormSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  console.log("Validation Result:", validationResult);

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { username, email, password } = validationResult.data;

  // 2. Create user

  try {
    const response = await axios.post(`${apiUrl}/users/register`, {
      username,
      email,
      password,
    });

    const { access_token } = response.data;

    return {
      redirectTo: "/profile",
      cookie: {
        name: "spichka_token",
        value: access_token,
      },
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axios Error:", error.response?.data);
      if (error.response?.data.error === "ERROR-REGISTERED-USER") {
        return {
          errors: {
            general: ["Пользователь с таким email или username уже существует"],
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
