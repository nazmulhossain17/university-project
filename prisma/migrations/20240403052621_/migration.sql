/*
  Warnings:

  - The primary key for the `CourseToPrerequisite` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `prerequisiteCourseId` on the `CourseToPrerequisite` table. All the data in the column will be lost.
  - Added the required column `preRequisiteId` to the `CourseToPrerequisite` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CourseToPrerequisite" DROP CONSTRAINT "CourseToPrerequisite_prerequisiteCourseId_fkey";

-- AlterTable
ALTER TABLE "CourseToPrerequisite" DROP CONSTRAINT "CourseToPrerequisite_pkey",
DROP COLUMN "prerequisiteCourseId",
ADD COLUMN     "preRequisiteId" TEXT NOT NULL,
ADD CONSTRAINT "CourseToPrerequisite_pkey" PRIMARY KEY ("courseId", "preRequisiteId");

-- AddForeignKey
ALTER TABLE "CourseToPrerequisite" ADD CONSTRAINT "CourseToPrerequisite_preRequisiteId_fkey" FOREIGN KEY ("preRequisiteId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
