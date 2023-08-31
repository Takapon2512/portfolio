/*
  Warnings:

  - Made the column `complete` on table `WordData` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_answer` on table `WordData` required. This step will fail if there are existing NULL values in that column.
  - Made the column `right_or_wrong` on table `WordData` required. This step will fail if there are existing NULL values in that column.
  - Made the column `correct_count` on table `WordData` required. This step will fail if there are existing NULL values in that column.
  - Made the column `question_count` on table `WordData` required. This step will fail if there are existing NULL values in that column.
  - Made the column `correct_rate` on table `WordData` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `WordData` MODIFY `complete` BOOLEAN NOT NULL,
    MODIFY `user_answer` VARCHAR(191) NOT NULL,
    MODIFY `right_or_wrong` BOOLEAN NOT NULL,
    MODIFY `correct_count` INTEGER NOT NULL,
    MODIFY `question_count` INTEGER NOT NULL,
    MODIFY `correct_rate` DECIMAL(65, 30) NOT NULL;
