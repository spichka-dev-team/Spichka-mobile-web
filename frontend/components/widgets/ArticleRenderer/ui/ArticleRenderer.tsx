import Image from "next/image";
import type { JSX } from "react";

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

interface ArticleRendererProps {
  blocks: Block[];
}

export function ArticleRenderer({ blocks }: ArticleRendererProps) {
  return (
    <article className="prose prose-lg max-w-none">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            const HeadingTag = `h${block.level}` as keyof JSX.IntrinsicElements;
            return (
              <HeadingTag
                key={index}
                className={`
                  font-bold text-white leading-tight mb-4
                  ${block.level === 1 ? "text-4xl md:text-5xl mb-6" : ""}
                  ${block.level === 2 ? "text-3xl md:text-4xl mb-5" : ""}
                  ${block.level === 3 ? "text-2xl md:text-3xl mb-4" : ""}
                  ${block.level === 4 ? "text-xl md:text-2xl mb-3" : ""}
                  ${block.level === 5 ? "text-lg md:text-xl mb-3" : ""}
                  ${block.level === 6 ? "text-base md:text-lg mb-2" : ""}
                `}
              >
                {block.text}
              </HeadingTag>
            );

          case "paragraph":
            return (
              <p
                key={index}
                className="text-white leading-relaxed mb-4 text-base md:text-lg"
              >
                {block.text}
              </p>
            );

          case "image":
            return (
              <div key={index} className="my-8">
                <Image
                  src={block.url || "/placeholder.svg"}
                  alt={block.alt}
                  width={block.width || 800}
                  height={block.height || 600}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  className="rounded-lg shadow-sm border border-gray-200"
                />
              </div>
            );

          default:
            return null;
        }
      })}
    </article>
  );
}
