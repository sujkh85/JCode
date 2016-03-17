#!/bin/bash

#remove the LAMP stack
apt-get -y remove apache2 apache2-mpm-prefork apache2-utils apache2.2-common libapache2-mod-php5 libapr1 libaprutil1 libdbd-mysql-perl libdbi-perl libnet-daemon-perl libplrpc-perl libpq5 mysql-client-5.5 mysql-common mysql-server mysql-server-5.5 php5-common php5-mysql
apt get -y remove lamp-server^

#refresh package
apt-get -y update

#install the LAMP stack
apt-get -y install lamp-server^
service apache2 restart

# database create
mysql -uroot -proot mysql -e "create database zabbix character set utf8 collate utf8_bin; grant all privileges on zabbix.* to zabbix@localhost identified by 'zabbix';"

#Installing Zabbix packages
wget http://repo.zabbix.com/zabbix/3.0/ubuntu/pool/main/z/zabbix-release/zabbix-release_3.0-1+trusty_all.deb
dpkg -i zabbix-release_3.0-1+trusty_all.deb
apt-get -y update
apt-get -y install zabbix-server-mysql zabbix-frontend-php

# Zabbix DB Install
ZABBIX_SQL=$(ls -d /usr/share/doc/zabbix-server-mysql*);
zcat $ZABBIX_SQL/create.sql.gz | mysql -uroot -proot zabbix

# Zabbix Server config
sed -i 's/# LogFileSize=1/LogFileSize=10/g' /etc/zabbix/zabbix_server.conf
sed -i 's/Timeout=4/Timeout=30/g' /etc/zabbix/zabbix_server.conf
sed -i 's/# DBPassword=/DBPassword=zabbix/g' /etc/zabbix/zabbix_server.conf
sed -i 's/# DBPort=3306/DBPort=3306/g' /etc/zabbix/zabbix_server.conf


# Zabbix Web conf 
sed -i 's/# php_value date.timezone Europe\/Riga/php_value date.timezone Asia\/Seoul/g' /etc/zabbix/apache.conf

# apache restart
service apache2 restart

# Zabbix Server start
service zabbix-server restart

