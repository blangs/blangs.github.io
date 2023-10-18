---
title:  "톰캣 root 계정이 아닌 계정으로 실행하기"
excerpt: "톰캣 root 계정이 아닌 계정으로 실행하기 입니다."

categories:
  - linux
tags:
  - [Linux, Ubuntu, Raspbian]

toc: true
toc_sticky: true

last_modified_at: 2023-08-20T20:00:00-05:00
---

## 개요
root 계정으로 운영중인 WAS(톰캣)를 다른 계정으로 실행해야하는 상황이 발생했다.

```bash
# 현재 속한 그룹이 grmfx 라는 것을 알아냈다.
id mfx000
uid=1001(mfd000) gid=60156(grmfx) groups=60156(grmfx), 10(wheel)

```


## STEP1. 계정생성
### 1. 톰캣폴더 권한을 root:원하는그룹 으로 변경하기

2. 원하는그룹에 속한 계정으로 start 실행하기

3. 에러발생

4. logs 디렉토리에 쓰기권한이 그룹한테 없음.
sudo chmod -R g+w 로그디렉토리

5. 원하는그룹에 속한 계정으로 start 실행하기

6. 실행은 되었지만 ps 명령어로 확인하면 실행 안떠있음

7. conf 디렉토리에 읽기권한, 쓰기권한이 그룹한테 없음 (.쓰기는 필요없움）


## OpenLDAP 클라이언트
### STEP1. 설치
```bash
sudo apt update
sudo apt install ldap-utils

```  
  

### STEP2. LDAP 서버의 정보를 설정

```bash
vi /etc/openldap/ldap.conf  #아래 내용이 실제 작성 내용이다.

# 설정내용 확인
TLS_CACERTDIR /etc/openldap/certs 

# URI ldap://ldap.example.com
URI ldap://10.210.111.156:389
BASE dc=blang,dc=com

```

### STEP3. NSSwitch 설정
> ❗코드를 보면 원격계정액세스2 를 선택함을 알 수 있다.
> 파일을 편집하여 NSSwitch 설정을 변경하여 LDAP을 사용하도록 지정.  
> 아래 예제에서는 passwd, group, shadow 데이터베이스에 대해 LDAP을 사용하도록 설정한 것이다.  

```bash
vi /etc/nsswitch.conf

passwd: files ldap
group: files ldap
shadow: files ldap

```



### STEP4. PAM 설정

```bash
# PAM (Pluggable Authentication Modules) 설정을 수정하여 인증에 LDAP을 사용하도록 지정한다. 

# /etc/pam.d/common-auth, /etc/pam.d/common-account, /etc/pam.d/common-password, /etc/pam.d/common-session 파일에서 필요한 부분을 수정하여 LDAP을 추가할 수 있다.

# 예를 들어, common-auth, common-account, common-password, common-session 파일에서 필요한 부분을 수정하여 LDAP을 사용하도록 설정할 수 있다.

```

### STEP5. [최종] OpenLDAP 클라이언트 설정 테스트
이제 시스템에서 OpenLDAP 클라이언트가 올바르게 구성되었는지 확인할 차례이다.

```bash
# 원격으로 ldap 안에 저장된 계정,그룹을 확인할 수 있다.
getent passwd 
mfx000:x:1001:60156:K121124:/fshome/grmfx/mfx000:/bin/bash

getent group 
whell:x:10:mfx000

```
이러한 단계를 따라 OpenLDAP 클라이언트를 구성하면, LDAP을 통해 원격으로 계정 정보를 가져와서 사용할 수 있게 된다.
