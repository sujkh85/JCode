SCRIPT
---------
    Vagrant.configure("2") do |config|
        config.vm.box = "ubuntu/trusty64"
        config.vm.provision :shell, :path => "node-bootstrap.sh"
        #config.vm.network :private_network, ip: '10.0.33.34'
        #config.vm.network "forwarded_port", guest: 8080, host: 8080
        #config.vm.network "forwarded_port", guest: 8079, host: 8079

        config.vm.provider :virtualbox do |vb|
          vb.memory = "2048"
          vb.cpus = 2
          #vb.name = "Yinc"
        end

        config.vm.provision "shell", run: "always" do |s|
          s.inline = "cd /vagrant/frontend && gulp --production true"
        end
    end

DESCRIPTION
-------
    Vagrant.configure("2") do |config|

vagrant버전 2를 사용합니다. Vagrant.configure("2")를 config라고 정의합니다.

        config.vm.box = "ubuntu/trusty64"

우분투 V14.04를 운영체제로 설정합니다.

        config.vm.provision :shell, :path => "node-bootstrap.sh"

기본으로 실행되는 shellScript의 위치를 설정합니다.

node-bootstrap.sh는 shell-script폴더에 shellScriptDescription.md에 있습니다.

        #config.vm.network :private_network, ip: '10.0.33.34'

private ip를 설정합니다. #이 붙어 있기때문에 주석처리 됩니다.

        #config.vm.network "forwarded_port", guest: 8080, host: 8080

포트포워딩을 설정합니다. #이 붙어 있기때문에 주석처리 됩니다.

        #config.vm.network "forwarded_port", guest: 8079, host: 8079

위와 같습니다.

        config.vm.provider :virtualbox do |vb|

VM 프로그램은 virtualbox로 설정합니다.

          vb.memory = "2048"
          vb.cpus = 2
          #vb.name = "Yinc"
        end

메모리 2048M cpu 2개로 설정합니다.

        config.vm.provision "shell", run: "always" do |s|
          s.inline = "cd /vagrant/frontend && gulp --production true"
        end

vargrant up으로 실행될때 항상 "cd /vagrant/frontend && gulp --production true" 를 실행시킵니다.

    end
