/*
  Warnings:

  - You are about to drop the column `completedAt` on the `todo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "todo" DROP COLUMN "completedAt",
ADD COLUMN     "createdAt" TIMESTAMP;
