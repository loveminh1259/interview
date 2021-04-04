FROM php:7.4-fpm

COPY composer.* /var/www/

WORKDIR /var/www

# Install dependencies
# RUN apt-get update && apt-get install -y \
#     build-essential \
#     libpng-dev \
#     libzip-dev \
#     libjpeg62-turbo-dev \
#     libfreetype6-dev \
#     locales \
#     zip \
#     jpegoptim optipng pngquant gifsicle \
#     vim \
#     unzip \
#     git \
#     curl

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install extensions
RUN apt-get update && apt-get install -y \
        libpng-dev \
        zlib1g-dev \
        libxml2-dev \
        libzip-dev \
        zip \
        curl \
        unzip \
    && docker-php-ext-configure gd \
    && docker-php-ext-install -j$(nproc) gd \
    && docker-php-ext-install pdo_mysql \
    && docker-php-ext-install mysqli \
    && docker-php-ext-install zip \
    && docker-php-source delete

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN apt -y install curl dirmngr apt-transport-https lsb-release ca-certificates
RUN apt update
RUN apt -y upgrade
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash
RUN apt-get install -y nodejs
RUN node -v
RUN npm -v
# Add user for laravel
RUN groupadd -g 1000 www
RUN useradd -u 1000 -ms /bin/bash -g www www

# Copy application folder
COPY . /var/www
RUN chmod + ./install.sh
RUN [ "./install.sh" ]
# Copy existing permissions from folder to docker
COPY --chown=www:www . /var/www
RUN chown -R www-data:www-data /var/www

# change current user to www
# USER www

EXPOSE 9000
CMD ["./migrate.sh"] 