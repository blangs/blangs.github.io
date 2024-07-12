---
title: "웹어플리케이션간 SSO구현하기(1) JSESSION 활용"
excerpt: "웹어플리케이션간 SSO구현하기(1) JSESSION 활용 입니다."

categories:
  - java
tags:
  - [java]

toc: true
toc_sticky: true

last_modified_at: 2024-07-13T13:00:00-05:00:00
---


## 개요 
> ❗<span style='color:green'>***웹 로그인시 해당 정보로 타 시스템에도 동시로그인이 필요.***</span>  
>   
> ❗<span style='color:green'>***절차***</span>  
> 💡 <span style='color:blue'>**1. 순수 WEB 로그인 수행**</span>  
> 💡 <span style='color:blue'>**2. 즉시 솔루션 서버측 로그인 수행(1번의 정보를 활용)**</span>  

## 사용되는 정보
### 순수웹이 SSO처리에 사용하는 정보
> ❗<span style='color:green'>***now 로그인ID***</span>  
> 💡 <span style='color:blue'>**순수웹에서 로그인 처리된 ID 값**</span>  
>   
> ❗<span style='color:green'>***now 세션ID***</span>  
> 💡 <span style='color:blue'>**순수웹에서 로그인 처리된 시점에 DB저장된 세션 값(JSESSION)**</span>  

### 솔루션이 로그인 처리에 사용하는 정보
> ❗<span style='color:green'>***솔루션테이블 회원ID***</span>  
> 💡 <span style='color:blue'>**순수웹 회원가입시 동기화 저장되는 솔루션테이블 내부에 회원ID가 존재 (이 ID값이 솔루션 서버에 로그인하는 KEY 값)**</span>  
> 💡 <span style='color:blue'>**순수웹에서 현재 로그인된 순수웹의 userid 를 전달해주면 이 값으로 솔루션 내부에서 조회해본다. (싱크가 맞는지 알 수 있다.)**</span>  
>   
> ❗<span style='color:green'>***GET으로 얻어온 순수웹DB안에 저장된 세션ID***</span>  
> 💡 <span style='color:blue'>**순수웹에서 솔루션 로그인 요청에(request scope) 담긴 세션ID가 솔루션로그인 처리정보에 SET**</span>  


## 구현
![사진1](/assets/images/WebProgramming/Java/java-sso1.jpg) 

> ❗<span style='color:green'>***세션을 가지고 DB에서 로그인을 처리하는 환경에서 구현***</span>  
> 💡 <span style='color:blue'>**레거시한 환경에서 구현해보았다.**</span>  