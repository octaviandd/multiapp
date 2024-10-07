/*
  Warnings:

  - Added the required column `temporaryId` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `temporaryId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Task` DROP FOREIGN KEY `Task_boardId_fkey`;

-- AlterTable
ALTER TABLE `Board` ADD COLUMN `temporaryId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Task` ADD COLUMN `temporaryId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_boardId_fkey` FOREIGN KEY (`boardId`) REFERENCES `Board`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
