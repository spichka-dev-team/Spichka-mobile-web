// app/api/proxy/route.ts
import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL;
const ADMIN_TOKEN = process.env.NEXT_DIRECTUS_ADMIN_TOKEN;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path");
  console.log(
    `${API_URL}/${path}?${searchParams.toString().replace(`path=${path}&`, "")}`
  );

  if (!path) {
    return NextResponse.json(
      { error: "Missing path parameter in query" },
      { status: 400 }
    );
  }

  const fullUrl = `${API_URL}/${path}?${searchParams
    .toString()
    .replace(`path=${path}&`, "")}`;

  try {
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ADMIN_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch from Directus", details: error },
      { status: 500 }
    );
  }
}
