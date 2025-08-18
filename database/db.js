import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function connectDB() {
    try { 
        await prisma.$connect();
        console.log('Postgresql connected');
    }
     catch (e) {
        console.error('DB connection error');
        process.exit(1);
    }
}

module.exports = { prisma, connectDB };