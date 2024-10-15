/*
  Warnings:

  - You are about to drop the `Note` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Note` DROP FOREIGN KEY `Note_authorId_fkey`;

-- DropTable
DROP TABLE `Note`;
