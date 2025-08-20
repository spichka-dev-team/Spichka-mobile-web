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

// моковые данные
async function getArticle(articleId: string): Promise<{
  blocks: Block[];
  title: string;
  description: string;
}> {
  const mockBlocks: Block[] = [
    {
      type: "heading",
      level: 1,
      text: "The Future of Web Development",
    },
    {
      type: "paragraph",
      text: "Web development continues to evolve at a rapid pace...",
    },
    {
      type: "heading",
      level: 2,
      text: "Modern JavaScript Frameworks",
    },
    {
      type: "paragraph",
      text: "React, Vue, and Angular continue to dominate...",
    },
    {
      type: "image",
      url: "/placeholder.svg?height=400&width=800",
      alt: "Modern web development workspace showing code on multiple monitors",
      width: 800,
      height: 400,
    },
  ];

  return {
    blocks: mockBlocks,
    title: `Article ${articleId} - The Future of Web Development`,
    description:
      "Exploring current trends and future directions in web development...",
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
  const { blocks } = await getArticle(articleId);

  try {
    const { data }: CreatorResponse = await axios.get(
      `${apiUrl}/users/${id}?fields=*,gallery.*`,
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );
    console.log(data.data);

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
