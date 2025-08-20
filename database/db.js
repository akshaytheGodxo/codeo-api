import { PrismaClient } from "../generated/prisma/client.js"

const prisma = new PrismaClient();

async function connectDB() {
  try {
    await prisma.$connect();
    console.log("PostgreSQL connected");
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1);
  }
}

export { prisma, connectDB };
