/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import type { JWT } from "next-auth/jwt";

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
    user?: {
      id?: string;
      email?: string;
      name?: string;
      avatar?: string;
      role?: string;
    };
    error?: string;
  }
}

async function refreshAccessToken(tokenObject: any) {
  try {
    console.log("♻️ Запрос на обновление токена");
    console.log(
      "Текущий refreshToken:",
      tokenObject.refreshToken?.substring(0, 20) + "..."
    );

    const tokenResponse = await axios.post(`${apiUrl}/auth/refresh`, {
      refresh_token: tokenObject.refreshToken,
    });

    console.log("✅ Ответ от /auth/refresh получен");
    console.log(
      "Новый access_token:",
      tokenResponse.data.data.access_token?.substring(0, 20) + "..."
    );
    console.log(
      "Новый refresh_token:",
      tokenResponse.data.data.refresh_token?.substring(0, 20) + "..."
    );

    const updatedToken = {
      ...tokenObject,
      accessToken: tokenResponse.data.data.access_token,
      accessTokenExpiry: Date.now() + tokenResponse.data.data.expires,
      refreshToken:
        tokenResponse.data.data.refresh_token ?? tokenObject.refreshToken,
      error: undefined,
    };

    console.log("🔄 Токен успешно обновлен");
    return updatedToken;
  } catch (error: any) {
    console.error(
      "❌ Ошибка при обновлении токена:",
      error.response?.data || error.message
    );
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
        token.accessTokenExpiry = Date.now() + user.expiresIn;
        token.refreshToken = user.refreshToken;

        console.log("🔑 Логин: Токены сохранены");

        try {
          const meResponse = await axios.get(`${apiUrl}/users/me`, {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          });

          token.user = {
            id: meResponse.data.data.id,
            email: meResponse.data.data.email,
            name: meResponse.data.data.name,
            avatar: meResponse.data.data.avatar,
            role: meResponse.data.data.role,
          };
        } catch (err) {
          console.error("❌ Ошибка при получении данных /users/me:", err);
        }
      }

      if (token.error === "RefreshAccessTokenError") {
        console.log(
          "❌ Ошибка рефреша токена, требуется повторная авторизация"
        );
        return token;
      }

      const shouldRefreshTime = Math.round(
        (token.accessTokenExpiry as number) - 2 * 60 * 1000 - Date.now()
      );

      if (shouldRefreshTime > 0) {
        return Promise.resolve(token);
      }

      console.log("⚠️ Токен истекает, выполняем обновление...");
      const refreshedToken = await refreshAccessToken(token);

      if (refreshedToken.error) {
        console.log("❌ Не удалось обновить токен");
      } else {
        console.log("✅ Токен успешно обновлен");
      }

      return refreshedToken;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.accessTokenExpiry = token.accessTokenExpiry;
      session.refreshToken = token.refreshToken;
      session.error = token.error;

      if (token.user) {
        session.user = {
          ...session.user, // email может прийти от next-auth
          ...token.user, // наши кастомные поля (name, avatar, role)
        };
      }

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
