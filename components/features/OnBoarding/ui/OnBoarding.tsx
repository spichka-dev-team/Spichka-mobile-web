"use client";

import Image from "next/image";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/shared/ui/button";
import { Input } from "@/components/shared/ui/Input";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./styles.module.scss";

type SlideKind = "content" | "phone";

export type OnboardingSlide = {
  image: string;
  title: string;
  description: string;
  cta: string;
  imageAlt?: string;
  kind?: SlideKind; // default: "content"
};

type OnboardingProps = {
  slides?: OnboardingSlide[];
  onFinish?: () => void;
  className?: string;
  ref?: React.RefObject<HTMLDivElement | null>;
};

// RU phone helpers
function onlyDigits(v: string) {
  return v.replace(/\D+/g, "");
}

function normalizeToRU11(digits: string) {
  // Normalize to +7XXXXXXXXXX (11 digits total including leading 7)
  let d = onlyDigits(digits);

  if (!d) return "";

  // If starts with 8, treat as Russian and convert to 7
  if (d[0] === "8") d = "7" + d.slice(1);

  // If starts with 7, OK; if starts with 9 and length <= 10, assume 7 + number
  if (d[0] !== "7") {
    if (d[0] === "9") {
      d = "7" + d;
    } else {
      // Fallback: force to 7 + rest (user can keep typing)
      d = "7" + d.slice(0, 10);
    }
  }

  // Trim to max 11 digits total
  d = d.slice(0, 11);
  return d;
}

function formatRU(digits11: string) {
  // Expect leading "7"
  const d = normalizeToRU11(digits11);
  const rest = d.slice(1); // 10 digits of national number

  const a = rest.slice(0, 3);
  const b = rest.slice(3, 6);
  const c = rest.slice(6, 8);
  const e = rest.slice(8, 10);

  let out = "+7";
  if (a) out += ` (${a}`;
  if (a && a.length === 3) out += ")";
  if (b) out += ` ${b}`;
  if (c) out += `-${c}`;
  if (e) out += `-${e}`;
  return out;
}

function isValidRUPhone(digits: string) {
  const n = normalizeToRU11(digits);
  return n.length === 11; // +7 and 10 national digits
}

const defaultSlides: OnboardingSlide[] = [
  {
    image: "/images/onboarding/hand.png",
    title: "делись своими проектами",
    description: "покажи миру, над чем работаешь — от идей до больших запусков",
    cta: "ка-а-айф",
    imageAlt: "Рука с жестом V",
  },
  {
    image: "/images/onboarding/handPen.png",
    title: "публикуй статьи и делись контентом",
    description:
      "фото, видео, статьи, подборки — оформляй как хочешь. Делись мыслями, опытом и вдохновляй.",
    cta: "имба",
    imageAlt: "Рука с карандашом",
  },
  {
    image: "/images/onboarding/carousel.png",
    title: "события и балдёж",
    description:
      "находи площадки, запускай движ, расскажи где проходят события и собирай гостей в своих пространствах.",
    cta: "то что нужно!",
    imageAlt: "Карусель",
  },
  // New phone slide
  {
    image: "/images/onboarding/phone.png",
    title: "мы свяжемся",
    description: "введите номер телефона что бы связались с вами позже",
    cta: "стать креатором",
    imageAlt: "Телефон",
    kind: "phone",
  },
];

export function OnBoarding(props: OnboardingProps) {
  const slides = useMemo(
    () =>
      (props.slides?.length ? props.slides : defaultSlides).map((s) => ({
        kind: "content" as SlideKind,
        ...s,
      })),
    [props.slides]
  );

  const [index, setIndex] = useState(0);
  const current = slides[index];

  // Phone state (only used on the phone slide)
  const [phoneInput, setPhoneInput] = useState("+7 (");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const digitsForValidation = useMemo(
    () => normalizeToRU11(phoneInput),
    [phoneInput]
  );
  const canSubmitPhone =
    isValidRUPhone(digitsForValidation) && !isSubmitting && !sent;

  const next = useCallback(async () => {
    // If on the phone slide, submit instead of going to next slide
    if (current.kind === "phone") {
      if (!canSubmitPhone) return;
      try {
        setIsSubmitting(true);
        const res = await fetch("/api/phone", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: digitsForValidation }),
        });
        // Simulate success even if not 200, but check anyway
        if (!res.ok) {
          // noop; still mark as sent for demo purposes
        }
        setSent(true);
        // Small delay to show success state
        await new Promise((r) => setTimeout(r, 400));
        props.onFinish?.();
      } catch (e) {
        // Optional: show error toast; for demo we just stop submitting
        console.error(e);
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    setIndex((i) => {
      if (i < slides.length - 1) return i + 1;
      props.onFinish?.();
      return i;
    });
  }, [current.kind, canSubmitPhone, props, slides.length, digitsForValidation]);

  const prev = useCallback(() => {
    setIndex((i) => Math.max(0, i - 1));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (current.kind === "phone" && e.key === "Enter") {
        next();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev, current.kind]);

  // Basic touch swipe
  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 40;
    if (dx < -threshold) next();
    if (dx > threshold) prev();
    touchStartX.current = null;
  };

  // Handle phone input with masking
  const handlePhoneChange = (v: string) => {
    // keep formatting consistent
    const formatted = formatRU(v);
    setPhoneInput(formatted);
  };

  return (
    <section
      ref={props.ref}
      aria-roledescription="carousel"
      aria-label="Онбординг"
      className={cn(
        "relative w-screen min-h-screen overflow-y-auto bg-neutral-900 text-white",
        props.className,
        styles.BackgroundGradient
      )}
    >
      <div
        className="relative mx-auto h-full w-full px-4 max-w-sm"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Content */}
        <div className="relative h-full pt-[10vh] pb-7 flex flex-col justify-between">
          {/* Top illustration area (fixed height to prevent layout shift) */}
          <div className="relative w-full h-72 sm:h-80 flex items-center justify-center">
            <Image
              src={
                current.image ||
                "/placeholder.svg?height=280&width=160&query=onboarding%20image" ||
                "/placeholder.svg"
              }
              alt={current.imageAlt || "Иллюстрация слайда"}
              fill
              sizes="(max-width: 640px) 100vw, 480px"
              style={{ objectFit: "contain" }}
              priority={index === 0}
            />
          </div>

          {/* Bottom text and controls */}
          <div className="relative mt-10 h-52 z-10 space-y-6 px-6 pb-6 text-center">
            <div className="space-y-3">
              <h3 className="text-2xl font-extrabold leading-tight sm:text-3xl">
                {current.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/80">
                {current.description}
              </p>
            </div>

            {current.kind === "phone" && (
              <div className="mx-auto w-full">
                <label htmlFor="phone" className="sr-only">
                  Номер телефона
                </label>
                <Input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  placeholder="+7 ("
                  value={phoneInput}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  className={cn(
                    "h-11 rounded-full bg-white/10 text-white placeholder:text-white/60 border-0",
                    "focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-0"
                  )}
                  maxLength={18} // "+7 (xxx) xxx-xx-xx"
                  aria-invalid={!isValidRUPhone(digitsForValidation)}
                  aria-describedby="phone-help"
                />
              </div>
            )}
          </div>

          {/* Dots + Controls */}
          <div className="space-y-3">
            <div
              className="flex items-center justify-center gap-[5px]"
              aria-label="Индикаторы слайдов"
            >
              {slides.map((_, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className={cn(
                    "h-[6px] rounded-full bg-white/40 transition-all duration-300 ease-in-out",
                    i === index
                      ? "w-[20px] bg-white cursor-auto"
                      : "w-[6px] cursor-pointer"
                  )}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              {index > 0 && (
                <Button
                  variant="secondary"
                  onClick={prev}
                  className={cn(
                    "h-11 w-11 shrink-0 rounded-full bg-white text-black hover:bg-white/80"
                  )}
                  aria-label="Назад"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              )}
              <Button
                onClick={next}
                disabled={current.kind === "phone" ? !canSubmitPhone : false}
                className={cn(
                  "h-11 w-full flex-1 rounded-full text-black",
                  current.kind === "phone"
                    ? "bg-white disabled:bg-white/30"
                    : "bg-white hover:bg-white/90"
                )}
              >
                {current.kind === "phone" ? (
                  isSubmitting ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {"отправляем..."}
                    </span>
                  ) : sent ? (
                    current.cta
                  ) : (
                    current.cta
                  )
                ) : (
                  current.cta
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
