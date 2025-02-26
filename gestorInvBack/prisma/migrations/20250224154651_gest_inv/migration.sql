-- CreateTable
CREATE TABLE `asistentePrincipal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(30) NOT NULL,
    `numero` VARCHAR(15) NOT NULL,
    `asistentes` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `asistente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(30) NOT NULL,
    `idPrincipal` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `asistente` ADD CONSTRAINT `asistente_idPrincipal_fkey` FOREIGN KEY (`idPrincipal`) REFERENCES `asistentePrincipal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
