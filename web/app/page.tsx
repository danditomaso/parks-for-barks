import { prisma } from "../lib/prisma";
import Image from "next/image";

export default async function Home() {
  const parks = await prisma.park.findMany({});

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {parks.map((park) => {
        return <pre>{JSON.stringify(park)}</pre>;
      })}
    </main>
  );
}
