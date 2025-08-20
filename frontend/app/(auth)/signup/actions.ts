"use server";

import { SignUpFormSchema } from "@/lib/definitions";
import axios from "axios";

import { apiUrl } from "@/lib/apiUrl";

type SignUpErrors = {
  email?: string[];
  password?: string[];
  general?: string[];
};

export type SignUpState = {
  errors?: SignUpErrors;
  cookie?: {
    name: string;
    value: string;
  };
  message?: string;
};

export async function signup(
  state: SignUpState | undefined,
  formData: FormData
): Promise<SignUpState> {
  const validationResult = SignUpFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  console.log("Validation Result:", validationResult);

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validationResult.data;

  try {
    const response = await axios.post(`${apiUrl}/users/register`, {
      email,
      password,
    });

    console.log("Response status:", response.status);

    // Обработка случая 204: подтверждение по почте
    if (response.status === 204) {
      return {
        message: "Подтвердите свою почту",
      };
    }

    // Ожидаемый случай с access_token
    const { access_token } = response.data;

    return {
      cookie: {
        name: "spichka_token",
        value: access_token,
      },
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axios Error:", error.response?.data);

      if (error.response?.data?.error === "ERROR-REGISTERED-USER") {
        return {
          errors: {
            general: ["Пользователь с таким email уже существует"],
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
