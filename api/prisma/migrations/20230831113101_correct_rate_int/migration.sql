/*
  Warnings:

  - You are about to alter the column `correct_rate` on the `WordData` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Int`.

*/
-- AlterTable
ALTER TABLE `WordData` MODIFY `correct_rate` INTEGER NOT NULL;
