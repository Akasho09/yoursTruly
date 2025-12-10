/*
  Warnings:

  - The `visitedAt` column on the `Visitor` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[ip]` on the table `Visitor` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Visitor" DROP COLUMN "visitedAt",
ADD COLUMN     "visitedAt" TIMESTAMP(3)[] DEFAULT ARRAY[]::TIMESTAMP(3)[];

-- CreateIndex
CREATE UNIQUE INDEX "Visitor_ip_key" ON "Visitor"("ip");
