/*
  Warnings:

  - A unique constraint covering the columns `[user_uuid,name]` on the table `member` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "unique_member_per_user";

-- CreateIndex
CREATE UNIQUE INDEX "unique_member_per_user" ON "member"("user_uuid", "name");
