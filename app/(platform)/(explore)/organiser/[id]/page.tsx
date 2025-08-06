import React from "react";
import { OrganiserPage } from "@/components/pages/OrganiserPage";

interface Props {
  params: Promise<{ id: string }>;
}

const OrganiserPageServer = async ({ params }: Props) => {
  const { id } = await params;

  return <OrganiserPage id={id} />;
};

export default OrganiserPageServer;
