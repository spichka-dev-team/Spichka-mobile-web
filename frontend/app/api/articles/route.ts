import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userFilter =
      searchParams.get("user") || "e69aaf94-9d18-4df2-9d5b-a384239bb422";

    const apiUrl =
      "http://185.47.167.116:8055/items/Article?" +
      new URLSearchParams({
        "filter[user_created][_eq]": userFilter,
        "filter[status][_eq]": "published",
      });

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_DIRECTUS_ANONYMOUS_USER_TOKEN}`,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Directus error response:", text);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
