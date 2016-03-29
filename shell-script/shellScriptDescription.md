파일명 node-bootstrap.sh

SHELLSCRIPT
-----------
    #!/bin/bash

    echo "======================"
    echo "Install 3rd parties for Node.js.........."
    echo "======================"
    sudo apt-get update
    sudo apt-get install -y build-essential curl libssl-dev git

    echo "======================"
    echo "Node source 4.x......."
    echo "======================"
    sudo curl -sL https://deb.nodesource.com/setup_4.x | bash -

    echo "======================"
    echo "Node.js..............."
    echo "======================"
    sudo apt-get install -y nodejs


    echo "======================"
    echo "Install bower........."
    echo "======================"
    sudo npm install -g bower


    echo "======================"
    echo "Install gulp.........."
    echo "======================"
    sudo npm install -g gulp


    echo "======================"
    echo "Install packages on /vagrant......"
    echo "======================"
    cd /vagrant/frontend
    sudo npm install

    echo "======================"
    echo "Install bower packages on /vagrant....."
    echo "======================"
    cd /vagrant/frontend
    sudo bower install --allow-root --config.interactive=false


SHELLSCRIPT DESCRIPTION
-------



    #!/bin/bash

shellscript파일임을 알립니다.

    echo는 printf
    echo "======================"
    echo "Install 3rd parties for Node.js.........."
    echo "======================"


    sudo apt-get update
    sudo apt-get install -y build-essential curl libssl-dev git

apt-get을 업데이트합니다.

필요한 프로그램을 설치합니다. build-essential,curl, libssl-dev git을 설치

    echo "======================"
    echo "Node source 4.x......."
    echo "======================"

    sudo curl -sL https://deb.nodesource.com/setup_4.x | bash -

노드 설치관련

    echo "======================"
    echo "Node.js..............."
    echo "======================"

    sudo apt-get install -y nodejs

노드 설치관련

    echo "======================"
    echo "Install bower........."
    echo "======================"

    sudo npm install -g bower

node에 bower패키지를 전역으로 설치합니다.


    echo "======================"
    echo "Install gulp.........."
    echo "======================"

    sudo npm install -g gulp

node에 bower패키지를 전역으로 설치합니다.

    echo "======================"
    echo "Install packages on /vagrant......"
    echo "======================"
    cd /vagrant/frontend
    sudo npm install

packages.json파일에 정의되어있는 파일들을 설치합니다.

    echo "======================"
    echo "Install bower packages on /vagrant....."
    echo "======================"

    cd /vagrant/frontend
    sudo bower install --allow-root --config.interactive=false

바우어에 필요한 파일을 설치합니다.
