/*
  Warnings:

  - Added the required column `category` to the `MenuItem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "IndianMenuCategory" AS ENUM ('APPETIZERS', 'MAIN_COURSES', 'BREADS', 'RICE', 'ACCOMPANIMENTS', 'DESSERTS', 'BEVERAGES');

-- AlterTable
ALTER TABLE "MenuItem" ADD COLUMN     "category" "IndianMenuCategory" NOT NULL;
