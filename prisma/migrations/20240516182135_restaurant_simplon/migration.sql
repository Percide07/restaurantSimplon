-- CreateTable
CREATE TABLE `categorie` (
    `id_categorie` CHAR(36) NOT NULL,
    `nom` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id_categorie`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `newsletters` (
    `id_newsletter` CHAR(36) NOT NULL,
    `email` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id_newsletter`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `repas` (
    `id_repas` CHAR(36) NOT NULL,
    `nom` VARCHAR(255) NOT NULL,
    `_description` TEXT NULL,
    `prix` DECIMAL(10, 2) NOT NULL,
    `url_image` VARCHAR(255) NULL,
    `id_categorie` CHAR(36) NULL,

    INDEX `id_categorie`(`id_categorie`),
    PRIMARY KEY (`id_repas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employes` (
    `id_employe` CHAR(36) NOT NULL,
    `nom` VARCHAR(255) NOT NULL,
    `designation` VARCHAR(100) NULL,
    `url_image` VARCHAR(255) NULL,
    `facebook_url` VARCHAR(255) NULL,
    `instagram_url` VARCHAR(255) NULL,
    `twitter_url` VARCHAR(255) NULL,
    `id_restaurant` CHAR(36) NULL,

    INDEX `id_restaurant`(`id_restaurant`),
    PRIMARY KEY (`id_employe`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `restaurants` (
    `id_restaurant` CHAR(36) NOT NULL,
    `adresse` VARCHAR(255) NOT NULL,
    `numero_telephone` VARCHAR(20) NULL,
    `email` VARCHAR(100) NULL,
    `url_facebook` VARCHAR(255) NULL,
    `url_youtube` VARCHAR(255) NULL,
    `url_twitter` VARCHAR(255) NULL,
    `url_linkedin` VARCHAR(255) NULL,

    PRIMARY KEY (`id_restaurant`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reservation` (
    `reservation_id` VARCHAR(100) NOT NULL,
    `nom_client` VARCHAR(100) NOT NULL,
    `email_client` VARCHAR(100) NOT NULL,
    `date_reservation` DATETIME(0) NOT NULL,
    `nombre_clients` INTEGER NOT NULL,
    `demandes_speciales` TEXT NULL,
    `cree_le` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`reservation_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `repas` ADD CONSTRAINT `repas_ibfk_1` FOREIGN KEY (`id_categorie`) REFERENCES `categorie`(`id_categorie`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `employes` ADD CONSTRAINT `employes_ibfk_1` FOREIGN KEY (`id_restaurant`) REFERENCES `restaurants`(`id_restaurant`) ON DELETE CASCADE ON UPDATE NO ACTION;
