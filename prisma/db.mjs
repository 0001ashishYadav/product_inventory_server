import { PrismaClient, Prisma } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

const DB_ERR_CODES = {
  UNIQUE_ERR: "P2002",
};

export { prisma, Prisma, DB_ERR_CODES };
