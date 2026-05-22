import "dotenv/config";

import bcrypt from "bcryptjs";

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function seed() {
  const adminExists = await prisma.user.findUnique({
    where: {
      email: "admin@alexbase.com",
    },
  });

  if (adminExists) {
    console.log("Admin já existe.");
    return;
  }

  const password = await bcrypt.hash(
    "123456",
    8
  );

  await prisma.user.create({
    data: {
      name: "Administrador",
      email: "admin@alexbase.com",
      password,
      role: "admin",
    },
  });

  console.log(
    "Admin criado com sucesso 🚀"
  );
}

seed()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });