import React from "react";
import { cn } from "@/lib/utils";
import styles from "./styles.module.scss";
import Image from "next/image";
import { ProfilePageType } from "@/components/shared/types/models";

import { UserTickets } from "@/components/widgets";
import { Avatar } from "@/components/shared/ui";
import { Pen, Settings } from "lucide-react";
import { Logout } from "@/components/entities";
import Link from "next/link";

interface ProfilePageProps {
  data: ProfilePageType;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ data }) => {
  console.log(data);

  return (
    <main
      className={cn(
        styles.AuthPage,
        "flex flex-col items-center gap-6 pt-10 pb-24 px-2 relative"
      )}
    >
      {/* Header with action icons */}
      <div className="absolute top-4 right-4 flex gap-3">
        <Link
          href="/profile/update"
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <Pen className="w-5 h-5 text-white" />
        </Link>
        <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors">
          <Settings className="w-5 h-5 text-white" />
        </button>
      </div>

      <Avatar
        className="mb-4"
        photo={data.avatar}
        title={`${data.first_name} ${data.last_name}`}
        subtitle={`@${data.username}`}
      />

      <UserTickets />

      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center gap-3 w-full rounded-lg bg-white/10 backdrop-blur-sm p-4">
          <div className="h-fit w-fit rounded-full bg-white py-[14px] px-3">
            <Image
              src="/svg/ticketBlack.svg"
              width={20}
              height={16}
              alt="ticket"
            />
          </div>
          <p className="lowercase font-geologica font-medium ">Билеты</p>
        </div>
        <div className="flex items-center gap-3 w-full rounded-lg bg-white/10 backdrop-blur-sm p-4">
          <div className="h-fit w-fit rounded-full bg-white py-[14px] px-3">
            <Image
              src="/svg/ticketBlack.svg"
              width={20}
              height={16}
              alt="ticket"
            />
          </div>
          <p className="lowercase font-geologica font-medium ">Избранное</p>
        </div>
      </div>

      <Logout />
    </main>
  );
};
