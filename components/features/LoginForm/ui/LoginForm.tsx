"use client";

import { login, LoginState } from "@/app/(auth)/login/actions";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import Link from "next/link";

import { Plus } from "lucide-react";
import styles from "./styles.module.scss";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, {} as LoginState);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isValid = email.trim() !== "" && password.length >= 9;

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
      className="max-w-[320px] w-full px-2 text-white rounded-2xl space-y-4"
    >
      <div>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="введи email или имя пользователя"
          className={cn(
            styles.input,
            "mt-1 w-full rounded-full px-3 py-3 focus:outline-none focus:ring bg-white/10 backdrop-blur-sm"
          )}
        />
        {state?.errors?.email && (
          <p className="mt-1 text-sm text-red-500">{state.errors.email}</p>
        )}
      </div>

      <div>
        <input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="введи пароль"
          className={cn(
            styles.input,
            "mt-1 w-full rounded-full px-3 py-3 focus:outline-none focus:ring bg-white/10 backdrop-blur-sm"
          )}
        />
        {state?.errors?.password && (
          <p className="mt-1 text-sm text-red-500">{state.errors.password}</p>
        )}
      </div>

      <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
        <input
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword((prev) => !prev)}
          className="appearance-none flex items-center justify-center w-[18px] h-[18px] bg-white/10 backdrop-blur-sm rounded-full checked:before:content-[''] checked:before:block checked:before:w-2.5 checked:before:h-2.5 checked:before:bg-white checked:before:rounded-full transition-all"
        />
        Показать пароль
      </label>

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
        disabled={!isValid || pending}
        className={cn(
          "w-full h-12 bg-white text-black rounded-full py-2  transition disabled:opacity-50",
          {
            "hover:bg-white/70": isValid && !pending,
          }
        )}
      >
        {pending ? "Входим..." : "Войти"}
      </button>

      <div className="flex items-center">
        <div className="w-full h-[1px] bg-white/50"></div>
        <p className="font-geologica text-sm mx-2">или</p>
        <div className="w-full h-[1px] bg-white/50"></div>
      </div>

      <button
        type="submit"
        className={cn(
          "w-full h-12 bg-white-glass backdrop-blur-sm text-white rounded-full py-2  transition pl-5"
        )}
      >
        <Link
          href="/signup"
          className="flex items-center gap-2 font-geologica text-sm"
        >
          <Plus className="w-5 h-5" />
          Создайте новый аккаунт
        </Link>
      </button>

      <p className="font-geologica text-xs text-center text-white/50">
        нажав продолжить, вы соглашаетесь с нашими Условиями предоставления
        услуг
      </p>
    </form>
  );
}
