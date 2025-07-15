"use client";

import { signup, SignUpState } from "./actions";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import Link from "next/link";

export function SignUpForm() {
  const [state, action, pending] = useActionState(signup, {} as SignUpState);
  const router = useRouter();

  useEffect(() => {
    async function setTokenAndRedirect() {
      if (state?.cookie?.value) {
        // Отправим токен на API для установки Set-Cookie
        await fetch("/api/auth/set-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: state.cookie.value }),
        });

        router.push(state.redirectTo || "/profile");
      }
    }

    setTokenAndRedirect();
  }, [router, state]);

  return (
    <form
      action={action}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md space-y-5"
    >
      <div>
        <label
          htmlFor="first_name"
          className="block text-sm font-medium text-gray-700"
        >
          Имя
        </label>
        <input
          id="first_name"
          name="first_name"
          className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
        />
        {state?.errors?.first_name && (
          <p className="mt-1 text-sm text-red-500">{state.errors.first_name}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="last_name"
          className="block text-sm font-medium text-gray-700"
        >
          Фамилия
        </label>
        <input
          id="last_name"
          name="last_name"
          className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
        />
        {state?.errors?.last_name && (
          <p className="mt-1 text-sm text-red-500">{state.errors.last_name}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Имя пользователя
        </label>
        <input
          id="username"
          name="username"
          className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
        />
        {state?.errors?.username && (
          <p className="mt-1 text-sm text-red-500">{state.errors.username}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
        />
        {state?.errors?.email && (
          <p className="mt-1 text-sm text-red-500">{state.errors.email}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Пароль
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
        />
        {state?.errors?.password && (
          <p className="mt-1 text-sm text-red-500">{state.errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-blue-600 text-white font-medium rounded-md py-2 px-4 hover:bg-blue-700 transition disabled:opacity-50"
      >
        {pending ? "Регистрация..." : "Зарегистрироваться"}
      </button>

      <p className="text-center text-sm text-gray-600">
        Уже зарегистрированы?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Войти
        </Link>
      </p>
    </form>
  );
}
