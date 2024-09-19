/*
  Warnings:

  - You are about to drop the column `content` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `asigneeId` on the `SubTask` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `SubTask` table. All the data in the column will be lost.
  - You are about to drop the column `due_date` on the `SubTask` table. All the data in the column will be lost.
  - You are about to drop the column `asigneeId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `boardId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `due_date` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Goals` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TasksBoard` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `body` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `displayOrder` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assigneeId` to the `SubTask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `displayOrder` to the `SubTask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dueDate` to the `SubTask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assigneeId` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `completed` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `displayOrder` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dueDate` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Goals` DROP FOREIGN KEY `Goals_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- DropForeignKey
ALTER TABLE `SubTask` DROP FOREIGN KEY `SubTask_asigneeId_fkey`;

-- DropForeignKey
ALTER TABLE `Task` DROP FOREIGN KEY `Task_asigneeId_fkey`;

-- DropForeignKey
ALTER TABLE `Task` DROP FOREIGN KEY `Task_boardId_fkey`;

-- DropForeignKey
ALTER TABLE `TasksBoard` DROP FOREIGN KEY `TasksBoard_authorId_fkey`;

-- DropIndex
DROP INDEX `User_email_key` ON `User`;

-- AlterTable
ALTER TABLE `Note` DROP COLUMN `content`,
    ADD COLUMN `body` VARCHAR(191) NOT NULL,
    ADD COLUMN `displayOrder` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `SubTask` DROP COLUMN `asigneeId`,
    DROP COLUMN `content`,
    DROP COLUMN `due_date`,
    ADD COLUMN `assigneeId` INTEGER NOT NULL,
    ADD COLUMN `body` VARCHAR(191) NULL,
    ADD COLUMN `displayOrder` INTEGER NOT NULL,
    ADD COLUMN `dueDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Task` DROP COLUMN `asigneeId`,
    DROP COLUMN `boardId`,
    DROP COLUMN `content`,
    DROP COLUMN `due_date`,
    ADD COLUMN `assigneeId` INTEGER NOT NULL,
    ADD COLUMN `body` VARCHAR(191) NULL,
    ADD COLUMN `completed` BOOLEAN NOT NULL,
    ADD COLUMN `displayOrder` INTEGER NOT NULL,
    ADD COLUMN `dueDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `email`,
    DROP COLUMN `name`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `role` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Goals`;

-- DropTable
DROP TABLE `Profile`;

-- DropTable
DROP TABLE `TasksBoard`;

-- CreateTable
CREATE TABLE `Board` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BoardTask` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `taskId` INTEGER NOT NULL,
    `boardId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `File` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TaskFile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `taskId` INTEGER NOT NULL,
    `fileId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TaskLike` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `taskId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username`);

-- AddForeignKey
ALTER TABLE `BoardTask` ADD CONSTRAINT `BoardTask_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BoardTask` ADD CONSTRAINT `BoardTask_boardId_fkey` FOREIGN KEY (`boardId`) REFERENCES `Board`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_assigneeId_fkey` FOREIGN KEY (`assigneeId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskFile` ADD CONSTRAINT `TaskFile_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskFile` ADD CONSTRAINT `TaskFile_fileId_fkey` FOREIGN KEY (`fileId`) REFERENCES `File`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskLike` ADD CONSTRAINT `TaskLike_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskLike` ADD CONSTRAINT `TaskLike_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubTask` ADD CONSTRAINT `SubTask_assigneeId_fkey` FOREIGN KEY (`assigneeId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
