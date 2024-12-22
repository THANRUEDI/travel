/*
  Warnings:

  - You are about to drop the column `travel_record_id` on the `photo` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `photo` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `travelrecord` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `filename` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `travelId` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `photo` DROP FOREIGN KEY `Photo_travel_record_id_fkey`;

-- DropForeignKey
ALTER TABLE `travelrecord` DROP FOREIGN KEY `TravelRecord_end_location_id_fkey`;

-- DropForeignKey
ALTER TABLE `travelrecord` DROP FOREIGN KEY `TravelRecord_start_location_id_fkey`;

-- DropForeignKey
ALTER TABLE `travelrecord` DROP FOREIGN KEY `TravelRecord_user_id_fkey`;

-- AlterTable
ALTER TABLE `photo` DROP COLUMN `travel_record_id`,
    DROP COLUMN `url`,
    ADD COLUMN `filename` VARCHAR(191) NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL,
    ADD COLUMN `travelId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `role`,
    ADD COLUMN `picture` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `travelrecord`;

-- CreateTable
CREATE TABLE `Travel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `start_location_id` INTEGER NOT NULL,
    `end_location_id` INTEGER NOT NULL,
    `travel_date` DATETIME(3) NOT NULL,
    `transportation_type` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191) NULL,
    `picture` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Travel` ADD CONSTRAINT `Travel_start_location_id_fkey` FOREIGN KEY (`start_location_id`) REFERENCES `Location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Travel` ADD CONSTRAINT `Travel_end_location_id_fkey` FOREIGN KEY (`end_location_id`) REFERENCES `Location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Photo` ADD CONSTRAINT `Photo_travelId_fkey` FOREIGN KEY (`travelId`) REFERENCES `Travel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
