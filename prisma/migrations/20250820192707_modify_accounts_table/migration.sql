/*
  Warnings:

  - You are about to drop the column `description` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `type` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Account" ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Transaction" DROP COLUMN "description";
