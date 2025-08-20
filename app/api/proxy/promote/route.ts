import { NextResponse } from "next/server";
import axios from "axios";

import { apiUrl } from "@/lib/apiUrl";

const adminToken = process.env.NEXT_DIRECTUS_ANONYMOUS_USER_TOKEN;

// 🔹 Получение списка Promote
export async function GET() {
  try {
    const directusRes = await axios.get(
      `${apiUrl}/items/Promote?fields=*,article.*,event.*`,
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    return NextResponse.json(directusRes.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Directus error:", error.response?.data || error.message);
    } else {
      console.error("Unknown error:", error);
    }
    return NextResponse.json(
      { error: "Failed to fetch Promote" },
      { status: 500 }
    );
  }
}
