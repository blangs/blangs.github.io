---
title:  "Linux chown chmod 기본사용법"
excerpt: "Linux chown chmod 기본사용법 입니다."

categories:
  - linux
tags:
  - [Linux, Ubuntu, Raspbian]

toc: true
toc_sticky: true

last_modified_at: 2022-10-22T20:00:00-05:00
---

##  개요
: 생각보다 개인서버에서 자주 사용하는데 잊어버릴때가 많아 따로 포스팅했다

## 목적
1. reactStudy 라는 디렉토리가 root 으로 변경되었다. wasadm 사용자로 변경한다.(하위폴더 모두)
2. reactStudy 라는 디렉토리에 다음 권한을 부여한다.
    - 파일 소유자는 모든 권한
    - 그룹과 기타 사용자는 읽기와 실행 권한

      > 즉, 파일을 실행할 수 있는 권한을 모든 사용자에게 부여하는 것(권한을 모두 오픈한다.)

## 사용법
```bash
sudo chown -R wasadm:wasadm ./reactStudy/
sudo chmod 755 ./reactStudy/

```
