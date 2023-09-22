/*
  Warnings:

  - A unique constraint covering the columns `[uid]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uid` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Calendar` DROP FOREIGN KEY `Calendar_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Setting` DROP FOREIGN KEY `Setting_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `WordData` DROP FOREIGN KEY `WordData_user_id_fkey`;

-- AlterTable
ALTER TABLE `Calendar` MODIFY `user_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Setting` MODIFY `user_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `uid` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `WordData` MODIFY `user_id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_uid_key` ON `User`(`uid`);

-- AddForeignKey
ALTER TABLE `WordData` ADD CONSTRAINT `WordData_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Setting` ADD CONSTRAINT `Setting_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Calendar` ADD CONSTRAINT `Calendar_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;
