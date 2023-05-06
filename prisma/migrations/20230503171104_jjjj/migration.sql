/*
  Warnings:

  - You are about to drop the column `resertToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "resertToken",
ADD COLUMN     "resetToken" TEXT;
