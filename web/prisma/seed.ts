import { hash } from "bcrypt";
import prisma from "../lib/prisma";
import { parks } from "./data";

async function main() {
  const password = await hash(
    process.env?.SEED_USER_PASSWORD?.toString() ?? "",
    12
  );
  try {
    await prisma.user.deleteMany();
    console.log("Deleted records in user table");
    await prisma.park.deleteMany();
    console.log("Deleted records in park table");
    await prisma.parkDetail.deleteMany();
    console.log("Deleted records in park detail table");
    await prisma.media.deleteMany();
    console.log("Deleted records in media table");
    await prisma.userRole.deleteMany();
    console.log("Deleted records in user role table");

    await prisma.park.createMany({
      data: parks,
    });

    // await prisma.userRole.createMany({
    //   data: roles,
    // });

    const response = await prisma.user.upsert({
      where: { email: "test@test.com" },
      update: {},
      create: {
        name: "Dan D",
        email: "test@test.com",
        role: {
          create: {
            name: "admin",
          },
        },
        password,
      },
    });
    console.log(response);
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
