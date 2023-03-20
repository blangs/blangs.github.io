---
title:  "노드JS vs SpringBoot"
excerpt: "노드JS vs SpringBoot 입니다."

categories:
  - nodejs
tags:
  - [node.js]

toc: true
toc_sticky: true

last_modified_at: 2023-03-13T20:00:00-05:00
---

## [Node.js]이란 무엇일까?
: 앞 포스팅에서 노드JS를 알아보았다. 기존에 내가 사용하는 환경과 프레임워크는 스프링이다. 그럼 스프링 생태계와 비교하여 Node.js 는 어떤 강점을 가질까? 궁금함이 생겼다. 이에 너무나도 잘 정리되어진 아래 블로그의 모든 내용을 가져왔다.

**참고한 블로그 링크)**  
[링크 바로가기]([https://hanamon.kr/nodejs-%EA%B0%9C%EB%85%90-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0/](https://selfish-developer.com/entry/Nodejs-vs-Spring-Boot))
{: .notice--info}


## 서론
현재 서버 애플리케이션 플랫폼의 큰 두 축은 Spring Boot 와 Node.js 인것 같다. 
각각의 플랫폼마다 고유한 장점이 있을 텐데 정작 나는 '일하고 있는 곳에서 사용중이다', 
'요새 이게 트렌드라고 한다'는 이유로 본질을 망각한채 공부만 해왔던 것 같다. 
그래서 이번 포스트에서는 spring boot와 nodejs 각각의 장점과 단점을 늦었지만 다뤄 보고자 한다.


## Node.js
: 노드 공식사이트에서 다음과 같이 설명한다.
Node.js하면 자바스크립트로 짤 수 있는 서버 애플리케이션을 가장 먼저 떠오르는데 사실 <span style="color:red"><b>Node js는 Non-blocking I/O를 처리하는데 최적화된 플랫폼이다.</b></span>
Non-blocking I/O는 다른 작업이 처리되는 걸 기다리는 도중에 다른 작업을 하는 것을 말하며 이러한 형태는 짧은 시간에 여러 작업을 처리할 수 있어 효율적이다. 
다른 언어에서도 이런 형태로 구현은 가능하지만 코드가 너무 지저분해지고 구현이 어려운 단점이 있었는데 Node js에서는 비동기식 함수를 통해 코드 상에서 이 작업을 구현하기 간편하게 만들어줬다. 
실제로 최근에 만든 사이드프로젝트에서 Non-blocking I/O를 구현하는게 정말 간편했다. 
그리고 내부적으로는 <span style="color:red"><b>하나의 Thread를 이용해서 구현했기 때문에 메모리를 크게 잡아 먹지도 않아 효율적이다.</b></span> 
똑같은 애플리케이션을 돌려도 다른 프레임워크보다 Node.js가 소모하는 메모리의 크기가 적다.  
  
단점은 JavaScript 언어를 사용한다는 점이다. JavaScript가 배우기는 참 쉬워서 적은 시간을 투자하고 금방 숙달을 할 수 있으나 
프로젝트 규모가 커지면 커질수록 Type Safe 하지 못하는 점이 한계점으로 작용한다. 언어가 Type Safe 하지 못하면 내가 짠 코드가 <span style="color:red"><b>별것도 아닌 에러로 런타임에 죽을 수도 있다.</b></span> 
대부분 이 에러는 Java나 C언어 를 사용했다면 빌드 중에 발생하는 컴파일 에러 종류인데 JavaScript는 빌드하는 과정이 없기 때문에 실행 전에 잡아 주질 못한다. 
구현하고 서버 실행까지 매우 빠르다고 좋아 할지 모르나 이 사이에 컴파일 오류는 없을 지 꼼꼼히 봐야한다. 그리고 Type Safe하지 못해서 <span style="color:red"><b>IDE에서 자동 완성이 잘 되지 않는다.</b></span> 
프로젝트가 커지면 커질수록 리팩토링을 하거나 기존 코드를 써먹어서 확장해야 할 때 자동완성 기능이 핵심인데 JavaScript를 쓰면 자동완성이 잘 안돼서 큰 애를 먹게 된다. 
프론트엔드 프레임워크 React에서는 TypeScript를 도입해서 어느정도 보완하고 있는데 Node.js에서도 TypeScript를 도입하는 시도가 있다고 들었는데 어느 정도 진행됐는지 모르겠다. 


## Spring Boot
SpringBoot는 <span style="color:red"><b>Java로 만든 서버 애플리케이션이다.</b></span> 
Java는 유구한 역사를 가지고 있고 지금도 많이 사용되는 언어라 스프링부트를 사용하면 Java 언어에서 있는 기능을 그대로 사용할 수 있다. 
Java를 개발해본 사람들은 쉽게 Spring Boot에 적응 할 수 있다. 그리고 역사가 오래 됐기 때문에 <span style="color:red"><b>개발하는데 필요한 왠만한 라이브러리는 모두 Spring Boot에 다 있다.</b></span> 
안드로이드 개발자가 사용한 자바 라이브러리들은 모두 Spring에서도 찾을 수 있다고 볼 수 있고 
추가로 서버 개발자들이 어려움을 겪는 데이터베이스 관리도 스프링부트에서는 JPA라는 라이브러리를 통해 간소화 해둬서 손쉽게 다룰 수 있다. 
<span style="color:red"><b>그리고 Java이기 때문에 TypeSafe 하다.</b></span> 리팩토링하거나 확장 할 때 IDE를 이용해서 수정할 점을 빠르게 체크 할 수 있는데 프로젝트 규모가 커지고 안정성이 중요해지는 시점부터는 큰 장점으로 다가온다.
내부적으로는 <span style="color:red"><b>Multi Threading을 지원하는 구조로 짜여있어서 길고 반복적인 업무를 처리할 때 효율적이다.</b></span> 많은 양의 컴퓨팅이 필요한 경우 잘 써먹으면 좋다.  
  
한번 써보신 분들은 알겠지만 <span style="color:red"><b>Spring Boot는 러닝 커브가 존재한다.</b></span> 
Node.js는 처음 배우는 사람도 하루만에 서버 구동하고 api도 하나 만들 수 있는데 Spring Boot를 공부하면 Service, Controller, Repository 에 대해서 알아야하고 
각 컴포넌트는 어떤식으로 채워야하는지 공부가 필요해 해야 할 게 많다. 
Spring Boot에서는 좋은 구조를 유도하기 위해 이런 형태의 디자인을 권장하는데 초심자한테는 러닝 커브가 좀 있다. 
그리고 <span style="color:red"><b>boilerplate 코드가 많다.</b></span> 스프링에서 권장하는 구조랑 라이브러리들을 사용하려면 이런 저런 코드를 만들어야 하는데 처음에는 어려우나 숙달되면 귀찮아진다. 
그래도 안쓰는 것 보다 낫긴 하지만. <span style="color:red"><b>내부적으로는 메모리를 좀 많이 쓴다.</b></span> Multi thread 환경이기 때문에 여러개의 Thread를 띄우다 보니까 어쩔 수 없이 생긴 문제인 것 같다. 


## 결론
작성중
