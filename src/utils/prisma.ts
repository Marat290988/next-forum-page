import { PrismaClient } from '@prisma/client';

export class Prisma {
  public static Prisma: PrismaClient = new PrismaClient();

  static getPrisma() {
    // this.Prisma ||= new PrismaClient();
    return this.Prisma;
  }
}