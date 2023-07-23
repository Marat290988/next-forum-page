import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient
}

export class Prisma {

  static getPrisma() {
    if (!global.prisma) {
      global.prisma = new PrismaClient();
    }
    return global.prisma;
  }
}