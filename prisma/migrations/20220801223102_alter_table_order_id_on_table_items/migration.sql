/*
  Warnings:

  - You are about to drop the column `ordersId` on the `items` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_ordersId_fkey";

-- AlterTable
ALTER TABLE "items" DROP COLUMN "ordersId",
ADD COLUMN     "orders_id" TEXT;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_orders_id_fkey" FOREIGN KEY ("orders_id") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
