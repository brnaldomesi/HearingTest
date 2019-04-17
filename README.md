# Audicus Hearing Test Setup

## Installation

### Setting up Vagrant

1. download vagrant from https://www.vagrantup.com/
2. copy vagrant file from init to top level directory
3. go to terminal
4. vagrant up
5. vagrant ssh

### Installing Node and Dependancies

1. ssh into vagrant and navigate to static-app
2. sudo apt-get install nodejs nodejs-dev npm nodejs-legacy
3. sudo npm install
4. npm dedupe
5. for development run npm run dev
6. for a final build run npm run build

### Running the Python Server

1. cd /vagrant/init/webserver
2. sudo bash install.sh
3. cd back to python-app folder
4. python runserver.py
5. open localhost:5000/index.html to check out the lead app
6. open localhost:5000/fda.html for fda app
7. open localhost:5000/calibration.html for calibration
