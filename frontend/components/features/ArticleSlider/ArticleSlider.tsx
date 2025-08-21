"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shared/ui/Card";
import { Button } from "@/components/shared/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Article {
  id: string;
  title: string;
  content?: string;
  date_created: string;
  user_created: string;
  status: string;
}

interface ArticleSliderProps {
  className?: string;
}

export const ArticleSlider: React.FC<ArticleSliderProps> = ({ className }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/articles");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setArticles(data.data || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch articles"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // измеряем ширину карточки динамически
  useEffect(() => {
    if (containerRef.current) {
      const firstCard =
        containerRef.current.querySelector<HTMLDivElement>(".slider-card");
      if (firstCard) {
        const gap = 24; // gap-6
        setCardWidth(firstCard.offsetWidth + gap);
      }
    }
  }, [articles]);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, articles.length - 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  if (loading) {
    return (
      <div className={`flex gap-4 overflow-hidden ${className}`}>
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="min-w-[250px] animate-pulse rounded-xl">
            <CardHeader>
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-4 text-center text-destructive ${className}`}>
        <p>Ошибка загрузки статей: {error}</p>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className={`p-4 text-center text-muted-foreground ${className}`}>
        <p>Статьи не найдены</p>
      </div>
    );
  }

  return (
    <div className={`relative w-full ${className}`}>
      <div className="overflow-hidden px-4 sm:px-0">
        <div
          ref={containerRef}
          className="flex gap-6 transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * cardWidth}px)` }}
        >
          {articles.map((article) => (
            <Card
              key={article.id}
              className="slider-card border-none bg-white/30 text-white flex-shrink-0 w-[85%] sm:w-[300px] rounded-xl"
            >
              <CardHeader>
                <CardTitle className="text-lg font-medium line-clamp-2">
                  {article.title}
                </CardTitle>
                <p className="text-sm text-white">
                  {new Date(article.date_created).toLocaleDateString("ru-RU")}
                </p>
              </CardHeader>
              <CardContent>
                {article.content && (
                  <p className="text-sm text-white line-clamp-3 mb-4">
                    {article.content.replace(/<[^>]*>/g, "").substring(0, 150)}
                    ...
                  </p>
                )}
                <Button variant="outline" size="sm">
                  <Link
                    href={`/organiser/${article.user_created}/article/${article.id}`}
                  >
                    Читать далее
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {articles.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            disabled={currentIndex >= articles.length - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
