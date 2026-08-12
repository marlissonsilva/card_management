/*
  Warnings:

  - Made the column `description` on table `purchase` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "purchase" ALTER COLUMN "description" SET NOT NULL;
