/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import React from "react";
import { ArticleRenderer } from "@/components/widgets/ArticleRenderer";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CreatorResponse } from "@/components/shared/types/models";
import { AuthorHeader } from "@/components/widgets/AuthorHeader";

const apiUrl = process.env.API_URL;
const adminToken = process.env.NEXT_DIRECTUS_ANONYMOUS_USER_TOKEN;

type Block =
  | { type: "heading"; level: 1 | 2 | 3 | 4 | 5 | 6; text: string }
  | { type: "paragraph"; text: string }
  | {
      type: "image";
      url: string;
      alt: string;
      width?: number;
      height?: number;
    };

interface ArticlePageProps {
  params: Promise<{
    id: string;
    articleId: string;
  }>;
}

// конвертируем json от Directus в blocks для ArticleRenderer
function parseJsonToBlocks(json: any): Block[] {
  if (!json?.content) return [];

  return json.content
    .map((block: any): Block | null => {
      if (block.type === "paragraph") {
        const text = block.content?.map((t: any) => t.text).join("") ?? "";
        return text ? { type: "paragraph", text } : null;
      }
      if (block.type === "image") {
        console.log("Image block:", block);
        return {
          type: "image",
          url: block.attrs?.src,
          alt: block.attrs?.alt ?? "",
          width: block.attrs?.width ?? undefined,
          height: block.attrs?.height ?? undefined,
        };
      }
      if (block.type === "heading") {
        const text = block.content?.map((t: any) => t.text).join("") ?? "";
        return { type: "heading", level: block.attrs?.level ?? 2, text };
      }
      return null;
    })
    .filter(Boolean) as Block[];
}

async function getArticle(articleId: string) {
  const { data } = await axios.get(`${apiUrl}/items/Article/${articleId}`, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });

  return {
    blocks: parseJsonToBlocks(data.data.json),
    title: data.data.title,
    description: data.data.content?.slice(0, 150) ?? "",
  };
}

// SEO
export async function generateMetadata(
  props: ArticlePageProps
): Promise<Metadata> {
  const { articleId } = await props.params;
  const { title, description } = await getArticle(articleId);
  return {
    title,
    description,
  };
}

// сама страница
export default async function ArticlePage(props: ArticlePageProps) {
  const { id, articleId } = await props.params;

  try {
    // сначала автор
    const { data }: CreatorResponse = await axios.get(
      `${apiUrl}/users/${id}?fields=*,gallery.*`,
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    // потом сама статья
    const { blocks } = await getArticle(articleId);

    return (
      <main className="min-h-screen container mx-auto px-4 py-20 max-w-3xl">
        <AuthorHeader author={data} />
        <ArticleRenderer blocks={blocks} />
      </main>
    );
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return notFound();
    }

    throw error;
  }
}
