import axios from "axios";
import { Button } from "@/components/shared/ui/button";
import Link from "next/link";
import Image from "next/image";

const apiUrl = process.env.API_URL;
const adminToken = process.env.NEXT_DIRECTUS_ADMIN_TOKEN;

interface User {
  first_name: string;
  last_name: string;
  avatar: string;
}

interface Organizer {
  Organizers_id: {
    title: string;
    user: {
      directus_users_id: User;
    }[];
  };
}

interface EventData {
  organizers: Organizer[];
}

interface CreatorSectionProps {
  id: string;
}

export const CreatorSection: React.FC<CreatorSectionProps> = async ({ id }) => {
  const { data } = await axios.get(
    `${apiUrl}/items/Event/${id}?fields=organizers.Organizers_id.title,organizers.Organizers_id.user.directus_users_id.first_name,organizers.Organizers_id.user.directus_users_id.last_name,organizers.Organizers_id.user.directus_users_id.avatar`,
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );

  const event: EventData = data.data;

  const organizer = event.organizers?.[0]?.Organizers_id;
  const user = organizer?.user?.[0]?.directus_users_id;

  if (!organizer || !user) return null;

  return (
    <div className="w-full bg-white/20 backdrop-blur-sm p-4 rounded-lg">
      <div className="flex flex-row gap-4">
        {/* Фото слева */}
        <div className="w-1/2 aspect-square rounded-lg overflow-hidden">
          <Image
            src={
              user.avatar
                ? `/api/proxy/image?id=${user.avatar}`
                : "/placeholder.svg?height=280&width=400&query=user photo"
            }
            alt={`${user.first_name} ${user.last_name}`}
            width={400}
            height={280}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Контент справа */}
        <div className="flex flex-1 flex-col justify-center gap-6 text-white">
          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-base md:text-4xl font-geologica break-words">
              {user.first_name} {user.last_name}
            </h2>

            <p className="text-xs md:text-xl text-white/90 font-geologica font-medium break-words">
              {organizer.title}
            </p>
          </div>

          <Button className="w-full bg-white text-black hover:bg-white/90 py-6 rounded-full font-geologica font-medium text-base transition-colors">
            <Link href={`/user/${user.first_name.toLowerCase()}`}>
              узнать больше
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
