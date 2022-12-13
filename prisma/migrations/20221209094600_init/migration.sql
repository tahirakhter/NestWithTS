/*
  Warnings:

  - You are about to drop the column `authorId` on the `Student` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_authorId_fkey";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "authorId",
ADD COLUMN     "createdBy" INTEGER;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
