import axios from "axios";
import { Button } from "@/components/shared/ui/button";
import Link from "next/link";
import Image from "next/image";
import { CreatorResponse } from "@/components/shared/types/models";

import { apiUrl } from "@/lib/apiUrl";
const adminToken = process.env.NEXT_DIRECTUS_ANONYMOUS_USER_TOKEN;

interface CreatorSectionProps {
  id: string;
}

export const CreatorSection: React.FC<CreatorSectionProps> = async ({ id }) => {
  const { data }: CreatorResponse = await axios.get(`${apiUrl}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });

  console.log("Секция организатора: ", data);

  const organizer = data.data;

  if (!organizer) return null;

  return (
    <div className="w-full bg-white/20 backdrop-blur-sm p-4 rounded-lg">
      <div className="flex flex-row gap-4">
        {/* Фото слева */}
        <div className="w-1/2 aspect-square rounded-lg overflow-hidden">
          <Image
            src={
              organizer.avatar
                ? `/api/proxy/image?id=${organizer.avatar}`
                : "/placeholder.svg?height=280&width=400&query=user photo"
            }
            alt={`${organizer.first_name} ${organizer.last_name}`}
            width={400}
            height={280}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Контент справа */}
        <div className="flex flex-1 flex-col justify-center gap-6 text-white">
          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-base md:text-4xl font-geologica break-words">
              {organizer.first_name} {organizer.last_name}
            </h2>

            <p className="text-xs md:text-xl text-white/90 font-geologica font-medium break-words">
              {organizer.title}
            </p>
          </div>

          <Button className="w-full bg-white text-black hover:bg-white/90 py-6 rounded-full font-geologica font-medium text-base transition-colors">
            <Link href={`/organiser/${organizer.id}`}>узнать больше</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
