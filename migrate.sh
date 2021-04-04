#!/bin/sh
php-fpm  | composer install| php artisan db:seed  | npm install