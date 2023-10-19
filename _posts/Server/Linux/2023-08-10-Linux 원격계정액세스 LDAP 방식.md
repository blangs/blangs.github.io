---
title:  "Linux 원격계정액세스 LDAP 방식"
excerpt: "Linux 원격계정액세스 LDAP 방식 입니다."

categories:
  - linux
tags:
  - [Linux, Ubuntu, Raspbian]

toc: true
toc_sticky: true

last_modified_at: 2023-08-10T20:00:00-05:00
---

## 요약
❗원격계정액세스 개념념1,2 중에서 어느 한쪽을 선택한다.  
❗LDAP 방식으로 구축을 진행한다. (OpenLDAP 사용)



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
# 사용자 정보 조회: getent passwd 명령어를 사용하여 LDAP에서 사용자 정보를 가져온다.

# 원격으로 ldap 안에 저장된 계정이 쭉나온다.
getent passwd 
mfd000:x:1001:60155:MT111111:/fshome/grmfd/mfd000:/bin/bash
#(중략)

# 원격으로 ldap 안에 저장된 그룹이 쭉나온다.
getent group 
whell:x:10:mfd000

```
이러한 단계를 따라 OpenLDAP 클라이언트를 구성하면, LDAP을 통해 원격으로 계정 정보를 가져와서 사용할 수 있게 된다.
