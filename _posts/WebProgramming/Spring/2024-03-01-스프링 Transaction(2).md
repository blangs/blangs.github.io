---
title:  "스프링 Transaction(2)"
excerpt: "스프링 Transaction(2) 입니다."

categories:
  - spring
tags:
  - [spring, 프레임워크]

toc: true
toc_sticky: true

last_modified_at: 2024-03-01T13:17:00-17:00
---


## 트랜잭션 기본
> ❗<span style='color:green'>***트랜잭션의 기본 형태***</span>  
> 💡 1.<span style='color:blue'>**connection 의 auto commit 를 false 로 주고**</span>  
> 💡 2.<span style='color:blue'>**try catch 를 이용해서 commit 또는 rollback 하는 것이 기본이다.**</span>  

## 스프링 트랜잭션
> ❗<span style='color:green'>***스프링 트랜잭션 개념***</span>  
> 💡 <span style='color:blue'>**스프링 같은 프레임워크 설정에서 특정 이름이나 특정 패키지 클래스에 무조건 걸리게 설정.**</span>  
> 💡 <span style='color:blue'>**특정위치에 어노테이션 형태로 사용할수도 있게 간편화 시킨 것 일뿐이다.**</span>  

## 트랜잭션 비권장 상황
> ❗<span style='color:green'>***비권장 상황***</span>  
> 💡 <span style='color:blue'>**많은 경우중 트랜잭션을 사용하지 않는것이 유리한 경우는 대량의 데이터를 처리하는 batch 처리하는게 좋다.**</span>  
> 💡 <span style='color:blue'>**예를들어 99만건까지 들어가고 에러가나면 롤백에도 한참이 걸리고 심지어 어느 로우에서 발생한 문제인지 찾기도 매우 어렵다.**</span>  
> 💡 <span style='color:blue'>**작게 쪼개보면.. select 문에 트랜잭션을 거는것은 낭비다.**</span>  


## 스프링의 @Trasaction 개념
### 컨트롤러
```java
@Controller
public class MyController {

    @Autowired
    private MyService1 service1;

    @Autowired
    private MyService2 service2;

    @Transactional
    public void myControllerMethod() {
        myControllerMethod_1();
        myControllerMethod_2();
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void myControllerMethod_1() {
        // MyService1의 메소드 호출
        service1.myService1Method();
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void myControllerMethod_2() {
        // MyService2의 메소드 호출
        service2.myService2Method();
    }
}

```

## 설명
> ❗<span style='color:green'>***@Transactional(propagation = Propagation.REQUIRED)***</span>  
> 💡 <span style='color:blue'>**@Transactional(propagation = Propagation.REQUIRED)은 메소드가 이미 트랜잭션 내에서 실행 중이라면 그 트랜잭션을 계속 사용하고**</span>  
> 💡 <span style='color:blue'>**트랜잭션이 없다면 새로운 트랜잭션을 시작하도록 합니다.**</span>  
> 💡 <span style='color:blue'>**이렇게 함으로써 myControllerMethod_1과 myControllerMethod_2는 동일한 트랜잭션을 공유하게 됩니다.**</span>  




## 실제 테스트 환경
![사진3](/assets/images/WebProgramming/Spring/spring-transaction-test03.png)


### TABLE1 (기업테이블)
![사진1](/assets/images/WebProgramming/Spring/spring-transaction-test01.png)


### TABLE2 (사용자테이블)
![사진3](/assets/images/WebProgramming/Spring/spring-transaction-test02.png)

> ❗<span style='color:green'>***@Transactional 테스트 준비***</span>  
> 💡 <span style='color:blue'>**테스트 테이블은 총 2개**</span>  
> 💡 <span style='color:blue'>**테스트 테이블은 총 2개**</span>  



## 실제 테스트 시작
> ❗<span style='color:green'>***순서***</span>  
> 💡 <span style='color:blue'>**STEP1. 기업테이블을 먼저 UPDATE**</span>  
> 💡 <span style='color:blue'>**STEP2. 사용자테이블을 UPDATE (익셉션발생)**</span>  
> 💡 <span style='color:blue'>**STEP3. 기업테이블 트랜잭션이 되었는지 결과확인**</span>  


### STEP1. 프론트엔드 요청
```js
{
    "mmsn": "C0000002",
    "bzno": "1234567890",
    "entNm": "이치란기업_수정",
    "buTlno": "0511111111",
    "buBadr": "일본 후쿠오카시_수정",
    "entEmad": "ichiran@jp.com",
    "userCnt": "",
    "mbrNewJnYmd": "2024.02.13",
    "exptYmd": "2024.02.13",
    "mode": "U",
    "isUser": false,
    "slfMmsn": "M0000002",
    "itrSvcCsnm": "직원1_수정",
    "slfCtfTlno": "23423423423",
    "connIp": "234.234.234.234",
    "connIp1": "234",
    "connIp2": "234",
    "connIp3": "234",
    "connIp4": "234",
    "cstEmad": "member1@jp.com",
    "lgnId": "ichi1_수정",
    "hdnIsIdDupCheck": "true",
    "itrUsrPwd": "@@@@@adminaBCKZZ",
    "hdnIsPwdCreate": false,
    "type": "ADM_MBR_UDP"
}

```


### STEP2. 백엔드 요청
```java
@Inject
TBBCKW001Service tBBCKW001Service;
@Inject
TBBCKW002Service tBBCKW002Service;

@Transactional
public void executeTransactionalOperation() throws Exception {
    // 두 서비스 메소드를 순차적으로 호출
    
    /*************
    기업
    *************/
    TBBCKW001DTO tbbckw001DTO = new TBBCKW001DTO();
    
    // 기업테이블 필요한 값 SET 수행
    // 생략..

    tBBCKW001Service.setUpdate(tbbckw001DTO); //UPDATE 수행

    /*************
    사용자
    *************/
    TBBCKW002DTO tbbckw002DTO = new TBBCKW002DTO();
    
    // 기업테이블 필요한 값 SET 수행
    //테스트 강제 익셉션 발생시키기1 (DB 길이 에러 방식)
    TBBCKW002.setMmsn("C9999999"); 
	TBBCKW002.setSlfMmsn("M9999999"); 

	//테스트 강제 익셉션 발생시키기2 (JAVA에러 방식)
	//throw new SysException(SysErrorCode.INTERNAL_SERVER_ERROR);
    
    tBBCKW002Service.setUpdate(tbbckw002DTO); //UPDATE 수행


    //결과는...?
}

```
