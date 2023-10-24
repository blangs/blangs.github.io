---
title:  "Linux sudo 명령어"
excerpt: "Linux sudo 명령어 입니다."

categories:
  - linux
tags:
  - [Linux, Ubuntu, Raspbian]

toc: true
toc_sticky: true

last_modified_at: 2022-10-26T20:00:00-05:00
---

## sudo 명령어 구분하기
> ❗사용자  
> 💡 sudo(Super User DO) su(Switch User)  
> 💡 sudo su -root  //루트계정으로 전환  
> 💡 sudo su - Password   //(root 비밀번호 입력)
> 💡 sudo su -      //루트 계정으로 전환  
> 💡 sudo su        //루트 계정으로 전환하는 것이 아닌 현재 사용자를 유지한 상태에서 루트의 권한만 가짐.   
>   
> ❗리눅스에서는 root 계정으로 직접 로그인 자체가 불가능하다.  
> 💡 따라서 일반 사용자로 로그인을 한 후에 루트 계정으로 전환을 하거나 권한을 얻어서 사용한다.  
> 💡 관리자 계정에서 일반 사용자 계정으로 전환하는 명령어는 exit  
> 💡 리눅스 초기 root 비밀번호는 sudo passwd 명령어를 통해 초기 설정을 해야 한다.  


## Q/A
```bash
# 이 명령어는 어떤 권한으로 실행됩니까?  
su - mfx000 -c /fswas/apache-tomcat/bin/startup.sh  

```

> ❗설명  
> 💡 이것은 root 권한으로 실행되지 않습니다.  
> 💡 su - mfx000 -c /fswas/apache-tomcat/bin/startup.sh 명령은 mfx000 사용자의 권한으로 /fswas/apache-tomcat/bin/startup.sh 스크립트를 실행합니다.  
> 💡 su - 명령을 사용하여 사용자를 변경하고 -c 옵션을 사용하여 명령을 실행할 때, 해당 명령은 -c 옵션에 지정된 사용자의 권한으로 실행됩니다. 이 경우에는 mfx000 사용자의 권한으로 스크립트가 실행됩니다.  