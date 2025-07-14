# Use official PHP image with Apache
FROM php:8.2-apache

# Enable rewrite module (optional, good for routing)
RUN a2enmod rewrite

# Copy project files into Apache's web root
COPY . /var/www/html/

# Set working directory (optional but clean)
WORKDIR /var/www/html/

# Expose default Apache port
EXPOSE 80
