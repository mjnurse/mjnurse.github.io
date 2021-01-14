---
title: SSH Login Without Password
---

Create public and private keys using ssh-key-gen on local machine.

```
$> ssh-keygen

Generating public/private rsa key pair.
Enter file in which to save the key (/home/martin/.ssh/id_rsa):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/martin/.ssh/id_rsa.
Your public key has been saved in /home/martin/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:sfuidygosifudyosiduygosidfuygosiduygisdyuiy martin@local
```

Copy the public key to remote-host using ssh-copy-id

```
$> ssh-copy-id -i ~/.ssh/id_rsa.pub martin@192.168.0.1

martin@192.168.0.1's password:

Number of key(s) added: 1
```

