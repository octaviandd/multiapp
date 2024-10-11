/*
  Warnings:

  - You are about to drop the `TaskLike` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `TaskLike` DROP FOREIGN KEY `TaskLike_taskId_fkey`;

-- DropForeignKey
ALTER TABLE `TaskLike` DROP FOREIGN KEY `TaskLike_userId_fkey`;

-- DropTable
DROP TABLE `TaskLike`;

-- CreateTable
CREATE TABLE `Like` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `likeId` INTEGER NOT NULL,
    `likeTyp` ENUM('Task', 'Comment') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Task` FOREIGN KEY (`likeId`) REFERENCES `Task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Comment` FOREIGN KEY (`likeId`) REFERENCES `Comment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
