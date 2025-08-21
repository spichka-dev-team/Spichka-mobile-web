import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL!;
const ADMIN_TOKEN = process.env.NEXT_DIRECTUS_ANONYMOUS_USER_TOKEN!;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const path = searchParams.get("path");
  const query = searchParams.get("query") ?? "";

  if (!path) {
    return NextResponse.json(
      { error: "Missing path parameter in query" },
      { status: 400 }
    );
  }

  // Пропустим любые доп.параметры (limit, fields, sort и т.п.)
  const passthrough = new URLSearchParams(searchParams);
  passthrough.delete("path");
  passthrough.delete("query");

  if (query) {
    // Кладём в Directus-параметр `search`
    passthrough.set("search", query);
  }

  const fullUrl = `${API_URL}/${path}?${passthrough.toString()}`;
  // console.log(fullUrl);

  try {
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ADMIN_TOKEN}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch from Directus", details: `${error}` },
      { status: 500 }
    );
  }
}
