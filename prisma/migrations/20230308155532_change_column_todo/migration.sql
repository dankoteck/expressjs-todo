/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Todo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_ownerId_fkey";

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "ownerId",
ADD COLUMN     "ownerEmail" TEXT;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_ownerEmail_fkey" FOREIGN KEY ("ownerEmail") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;
