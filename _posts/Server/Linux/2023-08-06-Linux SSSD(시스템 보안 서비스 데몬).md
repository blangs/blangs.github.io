---
title:  "Linux 완전 삭제하기"
excerpt: "Linux 완전 삭제하기 입니다."

categories:
  - linux
tags:
  - [Linux, Ubuntu, Raspbian]

toc: true
toc_sticky: true

last_modified_at: 2021-10-20T20:00:00-05:00
---

## SSSD(시스템 보안 서비스 데몬)
특정디렉토리에 걸린 소유자가 passwd 안에 없는 경우 SSSD 라는 개념이 있다는것을 알게되었다.  
  
- ***SSD(시스템 보안 서비스 데몬)***는 원격 디렉터리 및 인증 메커니즘에 액세스하기 위한 시스템 서비스. 
- 로컬 시스템(SSSD 클라이언트)을 외부 백엔드 시스템(프로바이더)에 연결한다. 
- 이렇게 하면 SSSD 클라이언트가 SSSD 공급자를 사용하여 ID 및 인증 원격 서비스에 액세스할 수 있다. (원격 서비스 예시 아래참고.)
    - LDAP 디렉터리
    - IdM(Identity Management)
    - AD(Active Directory) 도메인 
    - Kerberos 영역

## SSSD 동작
1. 클라이언트를 ID 저장소에 연결하여 인증 정보를 검색한다.  
2. 가져온 인증 정보를 사용하여 클라이언트에서 사용자 및 자격 증명의 로컬 캐시를 생성한다.  
3. 그런 다음 로컬 시스템의 사용자는 외부 백엔드 시스템에 저장된 사용자 계정을 사용하여 인증할 수 있다.  
  
> ❗***특징***  
> 💡 SSSD는 로컬 시스템에서 사용자 계정을 생성하지 않는다.  
> 💡 대신 외부 데이터 저장소의 ID를 사용하고 사용자가 로컬 시스템에 액세스할 수 있도록 한다.  
> 💡 SSSD는 NSS(Name Service Switch) 또는 PAM(Pluggable Authentication Modules)과 같은 여러 시스템 서비스에 대한 캐시를 제공할 수도 있다.  

```
sudo /etc/init.d/apache2 stop
sudo apt-get remove apache2*
sudo apt-get --purge remove apache2*   //설정파일까지 모두 지움
sudo apt-get autoremove
apt update
apt upgrade

```

## SSSD 장점
1. ID 및 인증 서버에 대한 로드 감소
    - 정보를 요청할 때 SSSD 클라이언트는 캐시를 확인하는 SSSD에 문의한다. SSSD는 캐시에서 정보를 사용할 수 없는 경우에만 서버에 연결한다.

2. 오프라인 인증
    - SSSD는 선택적으로 원격 서비스에서 검색된 사용자 ID 및 자격 증명의 캐시를 유지한다. 
    - 이 설정에서는 원격 서버 또는 SSSD 클라이언트가 오프라인 상태인 경우에도 사용자가 리소스에 성공적으로 인증할 수 있다. 

3. 단일 사용자 계정(인증 프로세스의 일관성 향상)  
    - SSSD에서는 오프라인 인증을 위해 중앙 계정과 로컬 사용자 계정을 모두 유지 관리할 필요가 없다.
    - 원격 사용자에게는 종종 여러 사용자 계정이 있다. 예를 들어 VPN(가상 사설 네트워크)에 연결하려면 원격 사용자는 로컬 시스템을 위한 하나의 계정과 VPN 시스템의 다른 계정을 보유한다.
    - 원격 사용자는 캐싱 및 오프라인 인증으로 간단하게 로컬 시스템에 인증하여 네트워크 리소스에 연결할 수 있다. ***그런 다음 SSSD에서 네트워크 자격 증명을 유지한다.***

