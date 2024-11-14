---
title:  "Linux 텔넷(Telnet) 기본사용법"
excerpt: "Linux 텔넷(Telnet) 기본사용법 입니다."

categories:
  - linux
tags:
  - [Linux, Ubuntu, Raspbian]

toc: true
toc_sticky: true

last_modified_at: 2022-10-21T20:00:00-05:00
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

## 텔넷과 핑의 차이점
- ping은 특정 IP와 데이터를 주고 받을 수 있는지를 확인하는 정도. 최종 목적지로 향하는 과정의 네트워크 상태를 확인하는 것이라면, 
- telnet은 특정 IP의 특정 포트에 접속이 가능한지. 즉, 구체적으로 특정 컴퓨터가 특정 애플리케이션과 통신이 가능한지 확인




## 요약
: 참고 (https://m.blog.naver.com/saeyeondal/222589438285)
  

```bash
## 1 
telnet ip port


## 2
netstat -an|find "IP:PORT"

```

1. CMD 창을 두 개 실행한다  
2. 1번 창에 telnet IP PORT 입력  
3. 2번 창에 netstat -anlfind "IP:PORT" 입력  
4. 1번 창, 2번 창 순서대로 실행 
5. netstat(2번창)을 통해서 telnet(1번창)의 결과를 확인  