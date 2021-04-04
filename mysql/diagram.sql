-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema shop
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema shop
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `shop` ;
USE `shop` ;

-- -----------------------------------------------------
-- Table `shop`.`product_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop`.`product_type` (
  `PTYP_ID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(80) NULL,
  `created_at` TIMESTAMP NULL,
  `created_by` INT NULL,
  `updated_at` TIMESTAMP NULL,
  `updated_by` INT NULL,
  PRIMARY KEY (`PTYP_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `shop`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop`.`products` (
  `PRO_ID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(80) NOT NULL,
  `price` FLOAT NULL,
  `description` VARCHAR(255) NULL,
  `created_at` TIMESTAMP NULL,
  `created_by` INT NULL,
  `updated_at` TIMESTAMP NULL,
  `updated_by` INT NULL,
  `PTYP_ID` INT NOT NULL,
  PRIMARY KEY (`PRO_ID`, `PTYP_ID`),
  INDEX `fk_products_product_type1_idx` (`PTYP_ID` ASC) VISIBLE,
  CONSTRAINT `fk_products_product_type1`
    FOREIGN KEY (`PTYP_ID`)
    REFERENCES `shop`.`product_type` (`PTYP_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `shop`.`images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop`.`images` (
  `IMG_ID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL,
  `created_by` INT NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  `updated_by` INT NULL,
  PRIMARY KEY (`IMG_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `shop`.`carts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop`.`carts` (
  `CAR_ID` INT NOT NULL AUTO_INCREMENT,
  `status` TINYINT NULL,
  `price` FLOAT NULL,
  `created_at` TIMESTAMP NULL,
  `created_by` INT NULL,
  `updated_at` TIMESTAMP NULL,
  `updated_by` INT NULL,
  PRIMARY KEY (`CAR_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `shop`.`carts_has_products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop`.`carts_has_products` (
  `CAR_ID` INT NOT NULL,
  `PRO_ID` INT NOT NULL,
  PRIMARY KEY (`CAR_ID`, `PRO_ID`),
  INDEX `fk_carts_has_products_products1_idx` (`PRO_ID` ASC) VISIBLE,
  INDEX `fk_carts_has_products_carts1_idx` (`CAR_ID` ASC) VISIBLE,
  CONSTRAINT `fk_carts_has_products_carts1`
    FOREIGN KEY (`CAR_ID`)
    REFERENCES `shop`.`carts` (`CAR_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_carts_has_products_products1`
    FOREIGN KEY (`PRO_ID`)
    REFERENCES `shop`.`products` (`PRO_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `shop`.`permissions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop`.`permissions` (
  `PER_ID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(40) NOT NULL,
  `created_at` TIMESTAMP NULL,
  `created_by` INT NULL,
  `updated_at` DATETIME NULL,
  `updated_by` INT NULL,
  `title` VARCHAR(80) NULL,
  `module` VARCHAR(80) NULL,
  `action` VARCHAR(80) NULL,
  PRIMARY KEY (`PER_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `shop`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop`.`users` (
  `USE_ID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL,
  `created_by` INT NULL,
  `updated_at` TIMESTAMP NULL,
  `updated_by` INT NULL,
  PRIMARY KEY (`USE_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `shop`.`users_has_permissions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop`.`users_has_permissions` (
  `USE_ID` INT NOT NULL,
  `PER_ID` INT NOT NULL,
  PRIMARY KEY (`USE_ID`, `PER_ID`),
  INDEX `fk_users_has_permissions_permissions1_idx` (`PER_ID` ASC) VISIBLE,
  INDEX `fk_users_has_permissions_users1_idx` (`USE_ID` ASC) VISIBLE,
  CONSTRAINT `fk_users_has_permissions_users1`
    FOREIGN KEY (`USE_ID`)
    REFERENCES `shop`.`users` (`USE_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_permissions_permissions1`
    FOREIGN KEY (`PER_ID`)
    REFERENCES `shop`.`permissions` (`PER_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `shop`.`products_has_images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop`.`products_has_images` (
  `PRO_ID` INT NOT NULL,
  `IMG_ID` INT NOT NULL,
  PRIMARY KEY (`PRO_ID`, `IMG_ID`),
  INDEX `fk_products_has_images_images1_idx` (`IMG_ID` ASC) VISIBLE,
  INDEX `fk_products_has_images_products1_idx` (`PRO_ID` ASC) VISIBLE,
  CONSTRAINT `fk_products_has_images_products1`
    FOREIGN KEY (`PRO_ID`)
    REFERENCES `shop`.`products` (`PRO_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_has_images_images1`
    FOREIGN KEY (`IMG_ID`)
    REFERENCES `shop`.`images` (`IMG_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
