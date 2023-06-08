---
title: Install Docker and Minikube in WSL
layout: page-with-contents-list
---

# Docker

Works for Ubuntu and Debian based distros.

```bash
# Install Docker, you can ignore the warning from Docker about using WSL.

> curl -fsSL https://get.docker.com -o get-docker.sh
> sudo sh get-docker.sh

# Add your user to the Docker group.

> sudo usermod -aG docker $USER && newgrp docker

# Check it's installed successfully.

> docker --version

# Using Ubuntu 22.04 or Debian 10 / 11? You need to do 1 extra step for iptables
# compatibility, you'll want to choose option (1) from the prompt to use iptables-legacy.

> sudo update-alternatives --config iptables
```

# Minikube

Install systemctl
To install systemctl, there is a github script you need to pull down.

git clone https://github.com/DamionGans/ubuntu-wsl2-systemd-script.git
cd ubuntu-wsl2-systemd-script/
bash ubuntu-wsl2-systemd-script.sh

Restart the LxssManager in Windows to initialize systemctl with WSL 2.

NOTE WSL wont start now...


TL;DR: Change options of nsenter from -a to -m -p

Thank you @eternalphane for the information, but this could be confusing for some people.

Based on that data, this is how to fix it:

Replace (copy and paste) the following lines of enter-systemd-namespace file. You can do it on Windows side.


USER_HOME="$(getent passwd | awk -F: '$1=="'"$SUDO_USER"'" {print $6}')"
if [ -n "$SYSTEMD_PID" ] && [ "$SYSTEMD_PID" != "1" ]; then
    if [ -n "$1" ] && [ "$1" != "bash --login" ] && [ "$1" != "/bin/bash --login" ]; then
        exec /usr/bin/nsenter -t "$SYSTEMD_PID" -m -p \
            /usr/bin/sudo -H -u "$SUDO_USER" \
            /bin/bash -c 'set -a; [ -f "$HOME/.systemd-env" ] && source "$HOME/.systemd-env"; set +a; exec bash -c '"$(printf "%q" "$@")"
    else
        exec /usr/bin/nsenter -t "$SYSTEMD_PID" -m -p \
            /bin/login -p -f "$SUDO_USER" \
            $([ -f "$USER_HOME/.systemd-env" ] && /bin/cat "$USER_HOME/.systemd-env" | xargs printf ' %q')
    fi
    echo "Existential crisis"
    exit 1
fi

Install Conntrack

sudo apt install -y conntrack

3. Install Minikube
After installing the prerequisites, installing Minikube is quite easy. You just pull down the latest Minikube using the following:

# Download the latest Minikube
curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64

# Make it executable
chmod +x ./minikube

# Move it to your user's executable PATH
sudo mv ./minikube /usr/local/bin/

#Set the driver version to Docker
minikube config set driver docker


kubectl

curl -kLO https://dl.k8s.io/release/$(curl -kL -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl

sudo mv ./kubectl /usr/local/bin/

minikube update-context

kubectl config use-context minikube


sudo systemctl restart docker.service

had error: This container is having trouble accessing https://registry.k8s.io
💡  To pull new external images, you may need to configure a proxy: https://minikube.sigs.k8s.io/docs/reference/networking/proxy/

this works....

minikube start --container-runtime=containerd

This caused other issues...

then after this works....

minikube stop
minikube start



$ curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
$ chmod 700 get_helm.sh
$ ./get_helm.sh


minikube config set memory 6144
minikube config set cpus 4


As a workaround I had to place the crt file under /usr/local/share/ca-certificates/*.crt and invoke sudo update-ca-certificates

aside: openssl s_client -showcerts -host registry.k8s.io -port 443

www.zscaler.com - F12 - security - download all certificates in hierachy


helm install elasticsearch elastic/elasticsearch --set service.type=LoadBalancer,antiAffinity="soft",replicas=3,imageTag=7.12.1

/etc/docker/certs.d
