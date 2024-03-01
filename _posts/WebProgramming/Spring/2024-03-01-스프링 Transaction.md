---
title:  "스프링 Transaction"
excerpt: "스프링 Transaction 입니다."

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


## @Trasaction 개념
### Service1
```java
@Service
public class TBBCKW001ServiceImpl implements TBBCKW001Service {

	@Inject
	private TBBCKW001 dao;
	
	@Transactional
	/* 회원일련번호를 생성해서 가져온다. */
	public String getSqMmsn() throws Exception {
		return dao.getSqMmsn();
	}

	/* TBBCKW001 정보를 생성한다. */
	@Transactional
	@Override
	public int setInsert(TBBCKW001DTO TBBCKW001) throws Exception {
		return dao.setInsert(TBBCKW001);
	}
}

```

### Service2
```java
@Service
public class TBBCKW002ServiceImpl implements TBBCKW002Service {

	@Inject
	private TBBCKW002 dao;

	/* 회원일련번호를 생성해서 가져온다. */
	@Transactional
	@Override
	public String getSqSlfMmsn() throws Exception {
		return dao.getSqSlfMmsn();
	}

	/* TBBCKW002 정보를 생성한다. */
	@Transactional
	@Override
	public int setInsert(TBBCKW002DTO TBBCKW002) throws Exception {
		return dao.setInsert(TBBCKW002);
	}
}

```

> ❗<span style='color:green'>***@Transactional 어노테이션 추가***</span>  

### Controller
```java
@Inject
TBBCKW001Service tBBCKW001Service;
@Inject
TBBCKW002Service tBBCKW002Service;

@Transactional
public void executeTransactionalOperation() throws Exception {
    // 두 서비스 메소드를 순차적으로 호출
    String sqMmsn = tBBCKW001Service.getSqMmsn();
    TBBCKW001DTO tbbckw001DTO = new TBBCKW001DTO();
    // 필요한 작업 수행
    tBBCKW001Service.setInsert(tbbckw001DTO);
    String sqSlfMmsn = tBBCKW002Service.getSqSlfMmsn();
    TBBCKW002DTO tbbckw002DTO = new TBBCKW002DTO();
    // 필요한 작업 수행
    tBBCKW002Service.setInsert(tbbckw002DTO);
}

```

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


### STEP3. 결과
![사진4](/assets/images/WebProgramming/Spring/spring-transaction-test04.png)
![사진5](/assets/images/WebProgramming/Spring/spring-transaction-test05.png)
![사진1](/assets/images/WebProgramming/Spring/spring-transaction-test06.png)
![사진2](/assets/images/WebProgramming/Spring/spring-transaction-test02.png)

> ❗<span style='color:green'>***트랜잭션 처리 실패***</span>  
> 💡 <span style='color:blue'>**기업테이블만 수정이 되어있다...**</span>  



## 재시도 1차
### 서비스(서비스2개를 묶어서)
```java
@Service
public class BlangInsertService {
	@Inject
	TBBCKW001Service TBBCKW001Service;
	@Inject
	TBBCKW002Service TBBCKW002Service;
	@Inject
	private TBBCKW002 dao;	
	
	
	/* [트랜잭션적용] TBBCKW001, TBBCKW002 정보를 갱신한다. */
	@Transactional
	public int allUpdate(TBBCKW001DTO TBBCKW001, TBBCKW002DTO TBBCKW002, @RequestBody Map<String, Object> params) throws Exception {
		
		TBBCKW001Service.setUpdate(TBBCKW001, params);
		TBBCKW002Service.setUpdate(TBBCKW002, params);
		
		return 1;
	}
}


```


### 컨트롤러
```java
//@Inject
//TBBCKW001Service tBBCKW001Service;
//@Inject
//TBBCKW002Service tBBCKW002Service;
@Inject
BlangInsertService blangInsertService;


@Transactional
public void executeTransactionalOperation() throws Exception {
    // 두 서비스 메소드를 순차적으로 호출
    
    /*************
    기업
    *************/
    TBBCKW001DTO tbbckw001DTO = new TBBCKW001DTO();
    
    // 기업테이블 필요한 값 SET 수행
    // 생략..

    //tBBCKW001Service.setUpdate(tbbckw001DTO); //UPDATE 수행

    /*************
    사용자
    *************/
    TBBCKW002DTO tbbckw002DTO = new TBBCKW002DTO();
    
    // 기업테이블 필요한 값 SET 수행
    //테스트 강제 익셉션 발생시키기1 (DB 길이 에러 방식)
    //TBBCKW002.setMmsn("C9999999"); 
	  //TBBCKW002.setSlfMmsn("M9999999"); 

	  //테스트 강제 익셉션 발생시키기2 (JAVA에러 방식)
  	//throw new SysException(SysErrorCode.INTERNAL_SERVER_ERROR);
    
    //tBBCKW002Service.setUpdate(tbbckw002DTO); //UPDATE 수행

    blangInsertService.allUpdate(TBBCKW001DTO, TBBCKW002DTO, params);
    logger.debug("blangInsertService.allUpdate COUNT: " + count);

}

```


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


### STEP2. 결과
![사진4](/assets/images/WebProgramming/Spring/spring-transaction-test04.png)
![사진1](/assets/images/WebProgramming/Spring/spring-transaction-test06.png)
![사진2](/assets/images/WebProgramming/Spring/spring-transaction-test02.png)
![사진5](/assets/images/WebProgramming/Spring/spring-transaction-test05.png)

> ❗<span style='color:green'>***트랜잭션 처리 실패***</span>  
> 💡 <span style='color:blue'>**이번에도... 기업테이블만 수정이 되어있다...**</span>  



## 중간점검
### 트랜잭선 미적용 시 로그

```
[2024-03-02 00:24:56] DEBUG: org.mybatis.spring.SqlSessionUtils - Creating a new SqlSession
[2024-03-02 00:24:56] DEBUG: org.mybatis.spring.SqlSessionUtils - SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@5fbc5b0e] was not registered for synchronization because synchronization is not active

(중략)
[2024-03-02 00:24:57] DEBUG: com.blang.bck.TBBCKW001Mapper.TBBCKW001Update - ==>  Preparing: UPDATE TBBCKW001 A SET A.업체명 = ?, A.사업자등록번호 = ?, A.사업장기본주소 = ?, A.사업장전화번호 = ?, A.업체이메일주소 = ?, A.유효기간년월일 = ?, A.회원신규가입년월일 = ?, A.시스템최종갱신일시 = CURRENT_TIMESTAMP(), A.시스템최종거래일시 = DATE_FORMAT(NOW(), '%Y%m%d%H%i%s%f') WHERE A.회원일련번호 = ? 
[2024-03-02 00:24:57] DEBUG: com.blang.bck.TBBCKW001Mapper.TBBCKW001Update - ==> Parameters: 이치란기업_수정(String), 1234567890(String), 일본 후쿠오카시_수정(String), 0511111111(String), ichiran@jp.com(String), 20240213(String), 20240213(String), C0000002(String)
[2024-03-02 00:24:57] DEBUG: com.blang.bck.TBBCKW001Mapper.TBBCKW001Update - <==    Updates: 1


[2024-03-02 00:24:57] DEBUG: org.mybatis.spring.SqlSessionUtils - Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@5fbc5b0e]
```

> ❗<span style='color:green'>***Spring - myBatis 환경에서 트랜잭션이 적용되지 않으면 위 로그를 볼 수 있다.***</span>  
> 💡 <span style='color:blue'>**처음부터 나는 적용이 되지 않은 상태였던 것이다.**</span>  


### 이유는 애초에 안되는 설정..?
```bash
#답변
이렇게 도는게 저는 맞다고 보이는데요..지금 셋팅하신 상황에서는 말이죠.. 왜냐면 DAO 메소드를 한번씩 호출할때 마다 SQLSession이 한번씩 생성됩니다. Service에서 Loop를 5번 돌렸다면 5개의 SQLSession이 생성되는거죠.. SQLSession쪽은 FactoryBean 개념이어서 호출될때마다 그때그때 만들어지는겁니다.. 이 부분을 Service 쪽에서 Loop를 돌리지 마시구요.. Service에서는 DAO 쪽 한번만 호출하게 하시고.. DAO에서 Loop를 돌리면서 배치를 시켜보세요.. 어차피 insert..select..union all.. 스타일의 구문이기때문에.. 다른 곳에서의 재사용성은 없다고 봐야 할것 같고.. 그렇다면 SQLSession은 한번만 생성시킨 상태에서 Batch 잡으로 돌리는게.. 그나마 SQLSession 생성 타임이라도 없앨수가 있겠죠..

```



## 재시도 2차
### 설정
```xml
  <!-- Enables the Spring MVC @Controller programming model -->
  <annotation-driven />
  <tx:annotation-driven transaction-manager="transactionManager"/> <!-- tx 설정을 추가 -->

```

> ❗<span style='color:green'>***<tx:annotation-driven />***</span>  
> 💡 <span style='color:blue'>**은 트랜잭션과 관련된 어노테이션(@Transactional)을 활성화시키는 역할을 합니다.**</span>  
> 💡 <span style='color:blue'>**transaction-manager 속성을 사용하여 어떤 트랜잭션 매니저를 사용할 것인지 지정할 수 있습니다.**</span>  
> 💡 <span style='color:blue'>**이 설정은 주로 서비스 계층에서 @Transactional 어노테이션을 사용할 때 필요하며, 트랜잭션 관리를 활성화시킵니다.**</span>  
>   
> ❗<span style='color:green'>***따라서, 웹 애플리케이션에서 트랜잭션을 사용하는 경우에는 두 설정을 함께 사용하는 것이 일반적입니다. 아래는 두 설정을 함께 사용하는 예시입니다:***</span>  


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


### 결과 
![사진4](/assets/images/WebProgramming/Spring/spring-transaction-test04.png)
![사진2](/assets/images/WebProgramming/Spring/spring-transaction-test01.png)
![사진2](/assets/images/WebProgramming/Spring/spring-transaction-test02.png)
![사진5](/assets/images/WebProgramming/Spring/spring-transaction-test05.png)
![사진7](/assets/images/WebProgramming/Spring/spring-transaction-test07.png)


> ❗<span style='color:green'>***트랜잭션 처리 성공***</span>  
> 💡 <span style='color:blue'>**정상적으로 롤백되었다 !!!!!!!!!!!**</span>  
>   
> ❗<span style='color:green'>***콘솔로그(맨 마지막사진)***</span>  
> 💡 <span style='color:blue'>**동일 세션범위에서 처리하는것을 볼 수 있다.**</span>  
