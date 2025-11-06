/*
  Warnings:

  - You are about to drop the column `entryDate` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the column `exitDate` on the `Exit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "entryDate",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Exit" DROP COLUMN "exitDate",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
