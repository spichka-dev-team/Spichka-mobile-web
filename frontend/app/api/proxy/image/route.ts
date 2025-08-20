import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

import { apiUrl } from "@/lib/apiUrl";
const adminToken = process.env.NEXT_DIRECTUS_ANONYMOUS_USER_TOKEN;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const assetId = searchParams.get("id");
  const width = searchParams.get("width");
  const height = searchParams.get("height");

  if (!assetId) {
    return new NextResponse("Missing asset id", { status: 400 });
  }

  try {
    const query = new URLSearchParams();
    if (width) query.append("width", width);
    if (height) query.append("height", height);

    const directusUrl = `${apiUrl}/assets/${assetId}${
      query.toString() ? `?${query.toString()}` : ""
    }`;
    console.log(directusUrl);

    const imageRes = await axios.get(directusUrl, {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
      responseType: "arraybuffer",
    });

    const contentType = imageRes.headers["content-type"];
    return new NextResponse(imageRes.data, {
      status: 200,
      headers: {
        "Content-Type": contentType,
      },
    });
  } catch (err) {
    console.error("Failed to fetch image:", err);
    return new NextResponse("Error fetching image", { status: 500 });
  }
}
