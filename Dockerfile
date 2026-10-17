FROM wordpress:php8.3-apache

# PHP limits sized for Elementor and large migration imports
RUN { \
      echo 'memory_limit = 512M'; \
      echo 'upload_max_filesize = 512M'; \
      echo 'post_max_size = 512M'; \
      echo 'max_execution_time = 300'; \
      echo 'max_input_vars = 3000'; \
      echo 'expose_php = Off'; \
    } > /usr/local/etc/php/conf.d/talanta.ini

# Site code from the repo (WordPress core, themes, plugins). wp-config.php is
# generated at startup by the image entrypoint from the WORDPRESS_* env vars.
COPY --chown=www-data:www-data . /var/www/html/

RUN mkdir -p /var/www/html/wp-content/uploads /var/www/html/wp-content/ai1wm-backups \
 && chown -R www-data:www-data /var/www/html/wp-content
