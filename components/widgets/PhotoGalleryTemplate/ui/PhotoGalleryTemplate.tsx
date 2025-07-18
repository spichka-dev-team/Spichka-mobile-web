import Image from "next/image";
import { cn } from "@/lib/utils";
import styles from "./styles.module.scss";

interface PhotoGalleryTemplateProps {
  /** Массив URL-ов фотографий. Используются первые 5 элементов */
  photos: string[];
  /** Заголовок галереи */
  title?: string;
}

const objects = [1, 2, 3, 4, 5];

export const PhotoGalleryTemplate: React.FC<PhotoGalleryTemplateProps> = ({
  photos,
}) => {
  return (
    <div
      className={cn(
        "h-64 p-2 bg-[rgba(255,255,255,0.15)] rounded-2xl",
        styles.parent
      )}
    >
      {objects.map((item, idx) => (
        <div
          key={item}
          className={cn(
            "relative rounded-2xl overflow-hidden",
            styles[`div${item}`]
          )}
        >
          <Image
            src={photos[idx]}
            alt={`Фото ${idx + 1}`}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
};
