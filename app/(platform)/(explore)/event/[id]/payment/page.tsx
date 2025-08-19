import axios from "axios";
import { notFound } from "next/navigation";
import React from "react";
import { PaymentPage } from "@/components/pages/PaymentPage";

interface Props {
  params: Promise<{ id: string }>;
}

import { apiUrl } from "@/lib/apiUrl";
const adminToken = process.env.NEXT_DIRECTUS_ADMIN_TOKEN;

const PaymentPageServer = async ({ params }: Props) => {
  const { id } = await params;

  try {
    const [{ data: data }] = await Promise.all([
      (
        await axios.get(
          `${apiUrl}/items/Event/${id}?fields=title,tickets_types.Tickets_Type_id.*`,
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          }
        )
      ).data,
    ]);
    return <PaymentPage id={id} data={data} />;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return notFound();
    }

    throw error;
  }
};

export default PaymentPageServer;
