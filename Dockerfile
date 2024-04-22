FROM tomsik68/xampp:7.4.33

RUN apt update -y

# Install dependencies
RUN apt install -y build-essential autoconf libssl-dev

# Install PostgreSQL extension
RUN apt install -y php-pgsql

# Install MongoDB extension
RUN printf "\n" | /opt/lampp/bin/pecl install mongodb

# Install Xdebug
RUN printf "\n" | /opt/lampp/bin/pecl install xdebug-3.1.6

# Configure PHP
COPY ./config/php.ini /opt/lampp/etc/php.ini

RUN /opt/lampp/bin/httpd -k restart