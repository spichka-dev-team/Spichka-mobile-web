import React from "react";
import { cn } from "@/lib/utils";

import { LocalHeader } from "@/components/widgets";
import { PaymentSection } from "@/components/features";
import { PaymentTicketType } from "@/components/shared/types/models";

import styles from "./styles.module.scss";

interface Props {
  id: string;
  data: { title: string; tickets_types: PaymentTicketType[] };
}

export const PaymentPage: React.FC<Props> = ({ id, data }) => {
  console.log(data);

  return (
    <main
      className={cn(
        styles.PaymentPage,
        "flex px-2 py-20 flex-col gap-7 items-center"
      )}
    >
      <LocalHeader title={data.title} />

      <PaymentSection
        eventId={id}
        tickets={data.tickets_types}
        title={data.title}
      />
    </main>
  );
};
