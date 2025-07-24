import React from "react";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function GalleryPage({ params }: Props) {
  const { id } = await params;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1>Галерея площадки с айди: {id}</h1>
    </main>
  );
}
