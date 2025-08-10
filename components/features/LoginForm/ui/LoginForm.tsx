"use client";

import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Plus } from "lucide-react";
import styles from "./styles.module.scss";

export function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const isValid = email.trim() !== "" && password.length >= 9;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setPending(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/homepage",
    });

    setPending(false);

    if (result?.error) {
      setError("Неверный email или пароль");
    } else {
      router.push("/homepage");
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
          placeholder="введи email или имя пользователя"
          className={cn(
            styles.input,
            "mt-1 w-full rounded-full px-3 py-3 focus:outline-none focus:ring bg-white/10 backdrop-blur-sm"
          )}
        />
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

      {error && <p className="text-sm text-red-500">{error}</p>}

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

      <Link
        href="/signup"
        className={cn(
          "w-full h-12 bg-white-glass backdrop-blur-sm text-white rounded-full py-2 flex items-center justify-center gap-2 font-geologica text-sm"
        )}
      >
        <Plus className="w-5 h-5" />
        Создайте новый аккаунт
      </Link>

      <p className="font-geologica text-xs text-center text-white/50">
        нажав продолжить, вы соглашаетесь с нашими Условиями предоставления
        услуг
      </p>
    </form>
  );
}
