/*
  Warnings:

  - You are about to drop the column `miniCredit` on the `semester_registrations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "semester_registrations" DROP COLUMN "miniCredit",
ADD COLUMN     "minCredit" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "status" SET DEFAULT 'UPCOMING';
