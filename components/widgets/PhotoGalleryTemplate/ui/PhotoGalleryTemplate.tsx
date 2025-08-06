import axios from "axios";
import Image from "next/image";
import { cn } from "@/lib/utils";
import styles from "./styles.module.scss";

interface PhotoGalleryTemplateProps {
  id: string;
  title?: string;
}

type PhotoType = {
  id: number;
  community_group_id: number;
  directus_files_id: string;
};

const apiUrl = process.env.API_URL;

export const PhotoGalleryTemplate: React.FC<
  PhotoGalleryTemplateProps
> = async ({ id }) => {
  const { data } = await axios.get(
    `${apiUrl}/Community_Group_files?filter={"Community_Group_id":{"_eq":${id}}}`
  );

  const photos = data.data;
  console.log("photos:", photos);
  return (
    <div
      className={cn(
        "h-64 p-2 bg-[rgba(255,255,255,0.15)] rounded-2xl",
        styles.parent
      )}
    >
      {photos.map((item: PhotoType, idx: number) => (
        <div
          key={item.id}
          className={cn(
            "relative rounded-2xl overflow-hidden",
            styles[`div${idx + 1}`]
          )}
        >
          <Image
            src={`https://d.vencera.tech/assets/${item.directus_files_id}`}
            alt={`Photo ${item.id}`}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
};
