/*
  Warnings:

  - You are about to drop the `BoardTask` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `boardId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `BoardTask` DROP FOREIGN KEY `BoardTask_boardId_fkey`;

-- DropForeignKey
ALTER TABLE `BoardTask` DROP FOREIGN KEY `BoardTask_taskId_fkey`;

-- AlterTable
ALTER TABLE `Task` ADD COLUMN `boardId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `BoardTask`;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_boardId_fkey` FOREIGN KEY (`boardId`) REFERENCES `Board`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
