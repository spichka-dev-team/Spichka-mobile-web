import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export const EventSliderSkeleton: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex gap-2 w-fit animate-pulse">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="w-44 h-72 bg-muted/20 rounded-xl flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
};
