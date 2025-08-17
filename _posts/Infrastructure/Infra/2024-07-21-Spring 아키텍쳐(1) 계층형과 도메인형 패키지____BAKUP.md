---
title:  "Spring 아키텍쳐(1) 계층형과 도메인형 패키지"
excerpt: "Spring 아키텍쳐(1) 계층형과 도메인형 패키지 입니다."

categories:
  - infra
tags:
  - [인프라, 아키텍처]

toc: true
toc_sticky: true

last_modified_at: 2024-07-21T20:00:00-05:00:00
---

## 참고
- https://blog.naver.com/hyoun1202/220280835845
- https://velog.io/@jmjmjmz732002/Springboot-directory-%EA%B5%AC%EC%A1%B0-%EA%B3%84%EC%B8%B5%ED%98%95%EA%B3%BC-%EB%8F%84%EB%A9%94%EC%9D%B8%ED%98%95


## 구조
### 계층형
```bash
controller
	⎿ ProductController
	⎿ MemberController
	⎿ CartController

service
	⎿ ProductService
	⎿ MemberService
	⎿ CartService

dao
	⎿ ProductDao
	⎿ MemberDao
	⎿ CartDao
   
domain
	⎿ Product
	⎿ Member
	⎿ Cart

```

1-1. 계층형 구조 장단점  
장점  
1. 프로젝트 전반적인 이해도가 낮아도, 패키지 구조만 보고 전체적인 구조를 파악할 수 있다.  
애플리케이션의 API를 보고 흐름을 파악하고 싶다면, Controller 패키지 하나만 보고 파악할 수 있다.  
애플리케이션의 비즈니스 로직을 보고 싶다면, Service 패키지 하나만 보고 파악할 수 있다.  
2. 계층별 응집도가 높아진다.   
계층별 수정이 일어날 때, 하나의 패키지만 보면 된다.  
    

단점  
1. 도메인별 응집도가 낮다. (패키지로 애플리케이션의 기능을 구분짓지 못한다)  
1-1. 도메인의 흐름을 파악하기 힘들다.  
Product 도메인의 흐름을 보고 싶을 때, 모든 계층 패키지를 봐야한다.  
하나의 패키지안에 여러 도메인(상품, 장바구니, 사용자)들이 섞여 있다.  
1-2. 도메인과 관련된 스펙 & 기능이 변경되었을 때, 변경 범위가 크다.  
Product에 대한 변경점이 있을 때, 여러 패키지에서 변경이 일어난다.   
2. 유스케이스(사용자의 행위) 표현이 어렵다.  
규모가 커지면, 유스케이스별로 클래스를 분리할 때가 있다.  
ex : 상품 등록 유스 케이스 -> RegisterProductService  
하지만, 계층형에서는 계층으로 패키지가 묶이기 때문에 위와 같이 네이밍해서 분리하기 어렵다.  
3. 규모가 커지면 하나의 패키지 안에 여러 클래스들이 모여서 구분이 어려워진다.   


### 도메인형
```bash
product
	⎿ controller
	⎿ service
	⎿ dao
	⎿ dto

member
	⎿ controller
	⎿ service
	⎿ dao
	⎿ dto
    
cart
	⎿ controller
	⎿ service
	⎿ dao
	⎿ dto

```

```bash
ㄴsrc/main/java/com/example/demo
	ㄴ DemoApplication.java
    ㄴ domain
    	ㄴ user
          ㄴ controller
          ㄴ service
          ㄴ repository
          ㄴ domain
        ㄴ post
          ㄴ controller
          ㄴ service
          ㄴ repository
          ㄴ domain
    ㄴ global
    	ㄴ auth
        ㄴ common
        ㄴ config

# domain
# domain을 담당하는 directory

# global 
# 프로젝트 전방위적으로 사용되는 객체들로 구성된다.
# config : 스프링 각종 설정
# common : 공통으로 사용되는 Value 객체들
# auth : 인증/인가에 사용되는 설정

```

2-1. 도메인형 구조 장단점  
장점  
1. 도메인별 응집도가 높아진다.   
1-1. 도메인의 흐름을 파악하기 쉽다.  
Product 도메인의 흐름을 보고 싶을 때, Product 패키지 하나만 보면 된다.  
1-2. 도메인과 관련된 스펙 & 기능이 변경되었을 때, 변경 범위가 적다.  
Product에 대한 변경점이 있을 때, Product 패키지만 변경이 일어난다.  
2. 유스케이스별로 세분화해서 표현이 가능하다.  
ex : 상품 등록 유스 케이스 -> RegisterProductService  
ex : 상품 검색 유스 케이스 -> SearchProductService  
도메인별로 패키지가 나뉘기 때문에 product 패키지에서 위와 같은 네이밍으로 분리할 수 있다.  

단점  
애플리케이션의 전반적인 흐름을 한눈에 파악하기가 어렵다.  
흐름을 파악하기 위해 여러 패키지를 왔다갔다 해야할 가능성이 높다.  
개발자의 관점에 따라 어느 패키지에 둘지 애매한 클래스들이 존재한다.  
Welcome 페이지를 맵핑하는 컨트롤러일 때, 어느 도메인 패키지에 위치할지 개발자에 따라 다를 수 있다.  
자신이 예상하는 패키지와 다를 때, 해당 클래스를 찾기가 어렵다.  

## 선택
🎯 3. 결론 - 계층형 VS 도메인형 어느 구조를 선택할까?  
위에서 계층형과 도메인형 패키지 구조와 장단점을 살펴봤다.  

그렇다면, 어떤 패키지 구조를 선택해야할까?  

장단점을 비교해보면서 '무조건적으로 좋은 것, 정답은 없다'라고 느꼈다!  

프로젝트 및 애플리케이션 규모 및 상황에 따라 장단점을 비교해서 선택하는 것이 좋을 것 같다고 생각했다.  

그렇다면, 어떤 기준으로 선택을 할까?  

일단 프로젝트 경험이 많이 없는 지금 내가 정한 기준은 다음과 같다.  

(아직 프로젝트 경험이 많이 없어서 추후에 경험해보면서 기준이 바뀔 수도 있을 것 같다!)  

