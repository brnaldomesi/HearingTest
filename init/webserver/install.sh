#!/bin/bash

#update
sudo apt-get update
sudo apt-get upgrade

sudo apt-get -y install git
sudo apt-get -y install emacs24-nox
sudo apt-get -y install build-essential
sudo apt-get -y install ntp

sudo apt-get install python-dev
sudo apt-get install -y python-pip

#install flask
sudo pip install flask

#install boto for amazon
sudo pip install boto

#createsend api
sudo pip install createsend

#for REST requests
sudo pip install requests

# for react, need to install nodejs and npm
sudo apt-get -y install nodejs
sudo apt-get -y install npm
sudo npm install -g react-tools

#install nginx uwsgi
sudo apt-get -y install nginx
sudo pip install uwsgi


#make directories
sudo mkdir -p /var/log/uwsgi
sudo mkdir -p /etc/uwsgi/apps-available
sudo mkdir -p /etc/uwsgi/apps-enabled

sudo mkdir -p /var/www/run
sudo chown -R  www-data /var/www
sudo chgrp -R  www-data /var/www
sudo chmod 777 /var/log/uwsgi
sudo chmod 777 /var/log/nginx

#copy scripts
sudo cp ./uwsgi.conf /etc/init/uwsgi.conf
sudo cp ./site.nginx /etc/nginx/sites-enabled/site
sudo cp ./nginx.conf /etc/nginx/nginx.conf
sudo cp ./site.ini.uwsgi /etc/uwsgi/apps-enabled/site.ini
sudo rm /etc/nginx/sites-enabled/default

#ssl certificates
sudo mkdir /etc/nginx/ssl
sudo cp ./ssl/* /etc/nginx/ssl/


#start uwsgi
sudo service uwsgi start
#restart nginx
sudo service nginx restart
