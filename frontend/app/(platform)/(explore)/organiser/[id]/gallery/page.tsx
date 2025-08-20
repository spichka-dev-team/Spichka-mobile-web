import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

const Page: React.FC<Props> = async ({ params }) => {
  const { id } = await params;

  return <main className="px-4 pt-20">Галерея организатора {id}</main>;
};

export default Page;
