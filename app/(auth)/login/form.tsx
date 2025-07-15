"use client";

import { login, LoginState } from "./actions";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import Link from "next/link";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, {} as LoginState);
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
      className="max-w-md mx-auto mt-10 p-6 bg-white text-black rounded-2xl shadow space-y-5"
    >
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
        />
        {state?.errors?.email && (
          <p className="mt-1 text-sm text-red-500">{state.errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Пароль
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
        />
        {state?.errors?.password && (
          <p className="mt-1 text-sm text-red-500">{state.errors.password}</p>
        )}
      </div>

      {state?.errors?.general && (
        <p className="text-sm text-red-500">{state.errors.general}</p>
      )}

      {state?.cookie?.value && (
        <div className="text-green-600 font-bold">
          Токен получен: {state.cookie?.value}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition disabled:opacity-50"
      >
        {pending ? "Входим..." : "Войти"}
      </button>

      <p className="text-center text-sm text-gray-600">
        Ещё не зарегистрированы?{" "}
        <Link href="/signup" className="text-blue-600 hover:underline">
          Создайте аккаунт
        </Link>
      </p>
    </form>
  );
}
