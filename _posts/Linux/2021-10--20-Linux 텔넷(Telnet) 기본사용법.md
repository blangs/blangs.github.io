-- 
title:  "Linux 텔넷(Telnet) 기본사용법"
excerpt: "Linux 텔넷(Telnet) 기본사용법"

categories:
  - linux
tags:
  - [Linux, Ubuntu, Raspbian]

toc: true
toc_sticky: true

last_modified_at: 2022-10-20T20:00:00-05:00
---

##  개요
: 텔넷 기본 사용법을 알아본다.

## 기본포트
: 별도 포트를 입력하지 않으면 기본포트는 23번 포트가 된다.

## 사용법
> telnet 호스트주소
> telnet 호스트주소 아이피

```
telnet 192.168.0.10       # 23번 포트(default)
telnet 192.168.0.10 8080  # 8080 포트

```
