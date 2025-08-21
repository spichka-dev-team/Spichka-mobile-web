"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import Link from "next/link";
import styles from "./styles.module.scss";
import axios from "axios";

export function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isValid =
    email.trim() !== "" && password.length >= 9 && password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, {
        email,
        password,
      });

      setSuccessMessage(
        "Проверьте почту — туда отправлена ссылка для подтверждения."
      );
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.errors?.[0]?.message || "Ошибка регистрации"
      );
    } finally {
      setPending(false);
    }
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
        {errorMessage && (
          <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
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

      {successMessage && (
        <p className="text-sm text-green-500">{successMessage}</p>
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
