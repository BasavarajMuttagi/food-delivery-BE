/*
  Warnings:

  - You are about to drop the column `discount` on the `CouponCode` table. All the data in the column will be lost.
  - Added the required column `discountType` to the `CouponCode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CouponCode" DROP COLUMN "discount",
ADD COLUMN     "discountType" "DiscountType" NOT NULL;
