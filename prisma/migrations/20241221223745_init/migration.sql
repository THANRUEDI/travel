/*
  Warnings:

  - You are about to drop the column `picture` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_category_id_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `picture`,
    ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'user';

-- DropTable
DROP TABLE `category`;

-- DropTable
DROP TABLE `product`;

-- CreateTable
CREATE TABLE `TravelRecord` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `start_location_id` INTEGER NOT NULL,
    `end_location_id` INTEGER NOT NULL,
    `travel_date` DATETIME(3) NOT NULL,
    `notes` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Location` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Photo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `travel_record_id` INTEGER NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);

-- AddForeignKey
ALTER TABLE `TravelRecord` ADD CONSTRAINT `TravelRecord_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TravelRecord` ADD CONSTRAINT `TravelRecord_start_location_id_fkey` FOREIGN KEY (`start_location_id`) REFERENCES `Location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TravelRecord` ADD CONSTRAINT `TravelRecord_end_location_id_fkey` FOREIGN KEY (`end_location_id`) REFERENCES `Location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Photo` ADD CONSTRAINT `Photo_travel_record_id_fkey` FOREIGN KEY (`travel_record_id`) REFERENCES `TravelRecord`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
