/*
  Warnings:

  - The values [DELIVERY,PICKUP] on the enum `ConsumptionMethod` will be removed. If these variants are still used in the database, this will fail.
  - The values [PREPARING,DELIVERED,COMPLETED,CANCELLED] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Restaurant` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ConsumptionMethod_new" AS ENUM ('TAKEAWAY', 'DINE_IN');
ALTER TABLE "Order" ALTER COLUMN "consumptionMethod" TYPE "ConsumptionMethod_new" USING ("consumptionMethod"::text::"ConsumptionMethod_new");
ALTER TYPE "ConsumptionMethod" RENAME TO "ConsumptionMethod_old";
ALTER TYPE "ConsumptionMethod_new" RENAME TO "ConsumptionMethod";
DROP TYPE "ConsumptionMethod_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('PENDING', 'IN_PREPARATION', 'FINISHED');
ALTER TABLE "Order" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "OrderStatus_old";
COMMIT;

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_slug_key" ON "Restaurant"("slug");
