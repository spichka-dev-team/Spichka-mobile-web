"use client";

import { signup, SignUpState } from "@/app/(auth)/signup/actions";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { startTransition } from "react";
import Link from "next/link";

import styles from "./styles.module.scss";

export function SignUpForm() {
  const [state, action, pending] = useActionState(signup, {} as SignUpState);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isValid =
    email.trim() !== "" && password.length >= 9 && password === confirmPassword;

  useEffect(() => {
    async function setTokenAndRedirect() {
      if (state?.cookie?.value) {
        await fetch("/api/auth/set-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: state.cookie.value }),
        });
        router.push("/profile");
      }
    }
    setTokenAndRedirect();
  }, [router, state]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    startTransition(() => {
      action(formData);
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-[320px] w-full px-2 text-white rounded-2xl space-y-4"
    >
      <div>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="введи email"
          className={cn(
            styles.input,
            "mt-1 w-full rounded-full px-3 py-3 focus:outline-none focus:ring bg-white/10 backdrop-blur-sm"
          )}
        />
        {state?.errors?.email && (
          <p className="mt-1 text-sm text-red-500">{state.errors.email}</p>
        )}
      </div>

      <div className="space-y-4">
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
        <input
          id="confirmPassword"
          name="confirmPassword"
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="подтверди пароль"
          className={cn(
            styles.input,
            "mt-1 w-full rounded-full px-3 py-3 focus:outline-none focus:ring bg-white/10 backdrop-blur-sm"
          )}
        />
        {password !== confirmPassword && confirmPassword && (
          <p className="mt-1 text-sm text-red-500">Пароли не совпадают</p>
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
      {state?.message && (
        <p className="text-sm text-green-500">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={!isValid || pending}
        className={cn(
          "w-full h-12 bg-white text-black rounded-full py-2 transition disabled:opacity-50",
          {
            "hover:bg-white/70": isValid && !pending,
          }
        )}
      >
        {pending ? "проверка..." : "зарегистрироваться"}
      </button>

      <div className="flex items-center">
        <div className="w-full h-[1px] bg-white/50"></div>
        <p className="font-geologica text-sm mx-2">или</p>
        <div className="w-full h-[1px] bg-white/50"></div>
      </div>

      <button
        type="button"
        className="w-full h-12 bg-white-glass backdrop-blur-sm text-white rounded-full py-2 transition pl-5"
      >
        <Link
          href="/login"
          className="flex items-center gap-2 font-geologica text-sm"
        >
          войдите в существующий аккаунт
        </Link>
      </button>

      <p className="font-geologica text-xs text-center text-white/50">
        нажав зарегистрироваться, вы соглашаетесь с нашими Условиями
        предоставления услуг
      </p>
    </form>
  );
}
