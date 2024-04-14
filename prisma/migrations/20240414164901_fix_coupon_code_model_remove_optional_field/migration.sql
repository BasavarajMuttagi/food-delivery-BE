/*
  Warnings:

  - Made the column `minimumOrderValue` on table `CouponCode` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CouponCode" ALTER COLUMN "minimumOrderValue" SET NOT NULL;
