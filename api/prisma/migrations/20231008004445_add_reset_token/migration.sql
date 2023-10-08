-- AlterTable
ALTER TABLE `User` ADD COLUMN `create_token` DATETIME(3) NULL,
    ADD COLUMN `expire_token` DATETIME(3) NULL,
    ADD COLUMN `reset_token` VARCHAR(191) NULL;
