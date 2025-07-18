"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TitleLinkProps {
  /** Добавочный путь, например 'gallery' */
  to: string;
  title: string;
  className?: string;
}

export const TitleLink: React.FC<TitleLinkProps> = ({
  to,
  title,
  className,
}) => {
  const pathname = usePathname();

  const fullPath =
    pathname.endsWith("/") || to.startsWith("/")
      ? `${pathname}${to}`
      : `${pathname}/${to}`;

  return (
    <Link
      href={fullPath}
      className={cn("w-full flex items-center gap-2", className)}
    >
      <h3 className="max-w-[80vw] font-unbounded font-normal text-xl">
        {title}
      </h3>
      <div className="bg-[rgba(255,255,255,0.15)] rounded-full p-1">
        <ChevronRight className="w-4 h-4" />
      </div>
    </Link>
  );
};
