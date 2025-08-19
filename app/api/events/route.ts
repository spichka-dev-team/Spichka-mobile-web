import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

import { apiUrl } from "@/lib/apiUrl";
const adminToken = process.env.NEXT_DIRECTUS_ANONYMOUS_USER_TOKEN;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path");

  if (!path) {
    return NextResponse.json(
      { error: "Missing path parameter" },
      { status: 400 }
    );
  }

  // собираем все параметры, кроме path
  const params: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    if (key !== "path") {
      params[key] = value;
    }
  });

  try {
    const directusRes = await axios.get(`${apiUrl}/${path}`, {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
      params,
    });

    return NextResponse.json(directusRes.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Directus error:", error.response?.data || error.message);
    } else {
      console.error("Unknown error:", error);
    }
    return NextResponse.json(
      { error: "Failed to fetch from Directus" },
      { status: 500 }
    );
  }
}
