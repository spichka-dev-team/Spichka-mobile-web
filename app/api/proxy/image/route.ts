import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const apiUrl = process.env.API_URL;
const adminToken = process.env.NEXT_DIRECTUS_ADMIN_TOKEN;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const assetId = searchParams.get("id");

  if (!assetId) {
    return new NextResponse("Missing asset id", { status: 400 });
  }

  try {
    const imageRes = await axios.get(`${apiUrl}/assets/${assetId}`, {
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
