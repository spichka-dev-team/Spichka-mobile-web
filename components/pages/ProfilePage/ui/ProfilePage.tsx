import React from "react";
import { cn } from "@/lib/utils";
import styles from "./styles.module.scss";
import Image from "next/image";

import { Avatar } from "@/components/shared/ui";

interface Props {
  className?: string;
}

export const ProfilePage: React.FC<Props> = ({ className }) => {
  return (
    <main
      className={cn(
        className,
        styles.AuthPage,
        "flex flex-col gap-6 pt-10 pb-24 px-2"
      )}
    >
      <Avatar
        className="mb-4"
        photo="https://storage.yandexcloud.net/s3-metaratings-storage/images/25/95/2595e8b1451d1c1b4abc4e1171792287.png"
        title="Ян топлес"
        subtitle="@smartguy"
      />
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

          <p className="lowercase font-geologica font-medium ">
            Редактировать профиль
          </p>
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

          <p className="lowercase font-geologica font-medium ">Настройки</p>
        </div>
      </div>
    </main>
  );
};
