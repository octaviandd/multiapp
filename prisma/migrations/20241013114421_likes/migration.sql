/*
  Warnings:

  - You are about to drop the column `likeId` on the `Like` table. All the data in the column will be lost.
  - Added the required column `commentId` to the `Like` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taskId` to the `Like` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Like` DROP FOREIGN KEY `Comment`;

-- DropForeignKey
ALTER TABLE `Like` DROP FOREIGN KEY `Task`;

-- AlterTable
ALTER TABLE `Like` DROP COLUMN `likeId`,
    ADD COLUMN `commentId` INTEGER NOT NULL,
    ADD COLUMN `taskId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Task` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Comment` FOREIGN KEY (`commentId`) REFERENCES `Comment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
