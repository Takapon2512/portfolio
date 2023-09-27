-- DropForeignKey
ALTER TABLE `Calendar` DROP FOREIGN KEY `Calendar_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Setting` DROP FOREIGN KEY `Setting_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `WordData` DROP FOREIGN KEY `WordData_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `WordData` ADD CONSTRAINT `WordData_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Setting` ADD CONSTRAINT `Setting_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Calendar` ADD CONSTRAINT `Calendar_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`uid`) ON DELETE CASCADE ON UPDATE CASCADE;
