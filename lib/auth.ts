/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { JWT } from "next-auth/jwt";

const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    expiresIn?: number;
    accessTokenExpiry?: number | undefined | unknown;
    error?: string;
  }

  interface User {
    id?: string;
    email?: string;
    accessToken?: string;
    refreshToken?: string;
    expiresIn?: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    user?: { id?: string; email?: string };
    error?: string;
  }
}

async function refreshAccessToken(tokenObject: any) {
  try {
    console.log("♻️ Запрос на обновление токена");
    console.log("Текущий refreshToken:", tokenObject.refreshToken);

    const tokenResponse = await axios.post(`${apiUrl}/auth/refresh`, {
      refresh_token: tokenObject.refreshToken,
    });

    console.log("✅ Ответ от /auth/refresh:", tokenResponse.data);

    return {
      ...tokenObject,
      accessToken: tokenResponse.data.data.access_token,
      accessTokenExpiry: Date.now() + tokenResponse.data.data.expires,
      refreshToken:
        tokenResponse.data.data.refresh_token ?? tokenObject.refreshToken,
    };
  } catch (error) {
    console.error("❌ Ошибка при обновлении токена", error);
    return {
      ...tokenObject,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined
      ) {
        console.log(credentials);
        if (!credentials) return null;
        try {
          const user = await axios.post(`${apiUrl}/auth/login`, {
            password: credentials.password,
            email: credentials.email,
          });

          console.log(user.data.data);

          if (user.data.data.access_token) {
            return {
              id: user.data.data.id ?? "",
              email: credentials.email,
              accessToken: user.data.data.access_token,
              expiresIn: user.data.data.expires,
              refreshToken: user.data.data.refresh_token,
            };
          }

          return null;
        } catch (e: any) {
          throw new Error(e?.message || "Authorization error");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.accessTokenExpiry = Date.now() + user.expiresIn!;
        token.refreshToken = user.refreshToken;

        console.log("🔑 Логин: accessToken:", token.accessToken);
        console.log("🔄 Логин: refreshToken:", token.refreshToken);
      }

      const shouldRefreshTime = Math.round(
        (token.accessTokenExpiry as number) - 60 * 1000 - Date.now()
      );

      if (shouldRefreshTime > 0) {
        console.log("⏩ Токен ещё жив, рефреш не нужен");
        return Promise.resolve(token);
      }

      console.log("⚠️ Токен просрочен или скоро истечёт, делаем рефреш...");
      token = await refreshAccessToken(token);

      console.log("🔄 После рефреша: refreshToken:", token.refreshToken);
      console.log("🔄 После рефреша: accessToken:", token.accessToken);

      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.accessTokenExpiry = token.accessTokenExpiry;
      session.refreshToken = token.refreshToken;
      session.error = token.error;

      return Promise.resolve(session);
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
