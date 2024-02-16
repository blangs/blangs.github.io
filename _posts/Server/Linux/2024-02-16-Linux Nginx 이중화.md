---
title:  "Linux Nginx 이중화"
excerpt: "Linux Nginx 이중화 입니다."

categories:
  - linux
tags:
  - [Linux, Ubuntu, Raspbian]

toc: true
toc_sticky: true

last_modified_at: 2023-08-20T20:00:00-05:00
---

## 개요
> ❗아파치만 사용해봤는데.. 이번에는 엔진엑스도 해보자.. 현재 회사 솔루션이 nginx 로 다음과 같은 느낌으로 분산되고있다.  



## nginx.conf
### 기본 개념 코드
```jsp

map $remote_addr $backend_server_map {
	10.107.205.51 server_1;
	default server_2;
}

upstream server_1 {
	server 10.107.205.51:10000;
	server 10.107.205.51:15000 backup;
}

upstream server_2 {
	server 10.107.205.51:50000;
	server 10.107.205.51:15000 backup;
}

server {
    listen 30000;
    proxy_pass $backend_server_map; // ex) http://host:port
    proxy_connect_timeout 30s;

	access_log ./logs/stream.log basic;
}

```
  
  
> ❗<span style='color:green'>***STEP1. map블록으로 IP에 해당하는 변수 생성(CREATE) 진행***</span>  
> 💡 1.<span style='color:red'>$remote_addr 은 nginx에서 기본지원하는 것이다. (현재IP)</span>  
> 💡 2.<span style='color:red'>현재IP 별로 값을 변수($backend_server_map) 안에 할당한다. (값은 upstream 처리 되어있다.)</span>    
>   
> ❗<span style='color:green'>***STEP2. 생성중인 변수가 참조하는 upstream 블록 참조***</span>  
> 💡 1.<span style='color:red'>upstream 블록은 Nginx에서 로드 밸런싱을 수행하도록 실제 서버의 목록을 정의한다.</span>  
> 💡 2.<span style='color:red'>첫 번째 서버가 정상적으로 동작하지 않을 경우 두 번째 서버로 트래픽이 백업된다.</span>  
>   
> ❗<span style='color:green'>***STEP3. 최종 라우팅(어디선가 날라오는 30000번 포트를 리스너)***</span>  
> 💡 1.<span style='color:red'>proxy_pass 옵션에 만들었던 $backend_server_map 변수를 할당.</span>  
> 💡 2.<span style='color:red'> 외 타임아웃, 로그 설정</span>  
  
***위 nginx 로드밸런싱 특징***  
$backend_server_map 변수를 통해 동적으로 선택되는 업스트림 블록을 사용한다. 그리고 이렇게 함으로써 클라이언트의 IP 주소에 따라 다른 업스트림으로 요청을 전달 한다.  
{: .notice--info}
  

## 전체 로드밸런싱 코드
```jsp
/*************************************
map val
*************************************/
//SOKET 전용
map $remote_addr $backend_server_map {
	10.107.205.51 server_1;
	default server_2;
}

//REST 전용
map $remote_addr $backend_server_map2 {
	10.107.205.51 server_3;
	default server_4;
}


/*************************************
Upstream 
*************************************/
//SOKET 전용
upstream server_1 {
	server 10.107.205.51:10000;
	server 10.107.205.51:15000 backup;
}

upstream server_2 {
	server 10.107.205.51:50000;
	server 10.107.205.51:15000 backup;
}


//REST전용
upstream server_3 {
	server 10.107.205.51:10180;
	server 10.107.205.51:15180 backup;
}

upstream server_4 {
	server 10.107.205.51:15180;
	server 10.107.205.51:10180 backup;
}


/*************************************
Listener 
*************************************/
server {
    listen 30000;
    proxy_pass $backend_server_map;
    proxy_connect_timeout 30s;

	access_log ./logs/stream.log basic;
}

server {
    listen 30180;
    proxy_pass $backend_server_map2;
    proxy_connect_timeout 30s;

	access_log ./logs/stream2.log basic;
}

```
  
  
> ❗<span style='color:green'>***아파치/톰캣은 mod.jk 설정으로 했는데 Nginx는 이렇게 하는거구나~~~***</span>  