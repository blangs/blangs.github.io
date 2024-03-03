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

## 스프링 propagation
> ❗<span style='color:green'>***propagation***</span>  
> 💡 <span style='color:blue'>**현재 진행중인 트랜잭션 (부모 트랜잭션) 이 존재할 때 새로운 트랜잭션 메소드를 호출하는 경우 어떤 정책을 사용할 지에 대한 정의.**</span>  
>   
> 💡 <span style='color:blue'>**스프링 같은 프레임워크 설정에서 특정 이름이나 특정 패키지 클래스에 무조건 걸리게 설정한다.**</span>  
>   
> 💡 <span style='color:blue'>**예를 들어, 기존 트랜잭션에 참여해서 그대로 이어갈 수도 있고, 새로운 트랜잭션을 생성할 수도 있으며 non-transactional 상태로 실행할 수도 있다.**</span>  
>   
> 💡 <span style='color:blue'>**설명**</span>  
> ```
> REQUIRED: 기본값이며 부모 트랜잭션이 존재할 경우 참여하고 없는 경우 새 트랜잭션을 시작
> SUPPORTS: 부모 트랜잭션이 존재할 경우 참여하고 없는 경우 non-transactional 상태로 실행
> MANDATORY: 부모 트랜잭션이 있으면 참여하고 없으면 예외 발생
> REQUIRES_NEW: 부모 트랜잭션을 무시하고 무조건 새로운 트랜잭션이 생성
> NOT_SUPPORTED: non-transactional 상태로 실행하며 부모 트랜잭션이 존재하는 경우 일시 정지시킴
> NEVER: non-transactional 상태로 실행하며 부모 트랜잭션이 존재하는 경우  예외 발생
> NESTED: 부모 트랜잭션과는 별개의 중첩된 트랜잭션을 만듬
>      - 부모 트랜잭션의 커밋과 롤백에는 영향을 받지만 자신의 커밋과 롤백은 부모 트랜잭션에게 영향을 주지 않음
>      - 부모 트랜잭션이 없는 경우 새로운 트랜잭션을 만듬 (REQUIRED 와 동일)
>      - DB 가 SAVEPOINT 를 지원해야 사용 가능 (Oracle)
>      - JpaTransactionManager 에서는 지원하지 않음
>  
> ```

## 스프링의 @Trasaction 예제
### 예제 코드
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

> ❗<span style='color:green'>***@Transactional(propagation = Propagation.REQUIRED)***</span>  
> 💡 <span style='color:blue'>**@Transactional 어노테이션을 단독으로 사용할 경우, 기본적으로 Propagation.REQUIRED로 설정되어 있다.**</span>  
> 💡 <span style='color:blue'>**@Transactional(propagation = Propagation.REQUIRED)은 메소드가 이미 트랜잭션 내에서 실행 중이라면 그 트랜잭션을 계속 사용하고 트랜잭션이 없다면 새로운 트랜잭션을 시작하도록 한다.**</span>  
> 💡 <span style='color:blue'>**이렇게 함으로써 myControllerMethod_1과 myControllerMethod_2는 동일한 트랜잭션을 공유하게 된다.**</span>
  
따라서 `myControllerMethod_1` 과 `myControllerMethod_2` 가 `myControllerMethod`에서 호출될 때, 이미 `myControllerMethod`에서 시작된 트랜잭션이 있다면 두 메소드는 해당 트랜잭션에 참여하게 된다. 만약` myControllerMethod` 호출 중에 예외가 발생한다면, `myControllerMethod_1`과 `myControllerMethod_2`에서 수행한 모든 작업이 롤백된다.  
{: .notice--info}


## 프론트엔드 요청값
### JS
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


## 컨트롤러(Controller)
### 메소드 admMemberAllProcess()
```java
// 통합 메소드
@Transactional
@RequestMapping(value = "/app/admMemberAllProcess", method = RequestMethod.POST)
public @ResponseBody Map<String, Object> admMemberAllProcess(@RequestBody Map<String, Object> params,HttpServletRequest request) {

	logger.info("AdmController admMemberAllProcess start  >>");
	Map<String, Object> resultJSON = new HashMap<String, Object>();
	
	try {
        Map<String, Object> resultCorp = admMemberCorpProcess2(params, request);
		Map<String, Object> resultUser = admMemberUserProcess2(params, request);
			
	} catch (Exception e) {
		throw new SysException(SysErrorCode.INTERNAL_SERVER_ERROR, e);
	} finally {
		logger.debug("admMemberAllProcess finally : {}", "OK");
	} 
	
	return resultJSON;
}

```

### 메소드 admMemberCorpProcess2()  
```java
// 회원관리 사업자 수정(UPDATE): VO방식
@Transactional(propagation = Propagation.REQUIRED)
@RequestMapping(value = "/app/admMemberCorpProcess2", method = RequestMethod.POST)
public @ResponseBody Map<String, Object> admMemberCorpProcess2(@RequestBody Map<String, Object> params, HttpServletRequest request) {

	logger.info("AdmController admMemberCorpProcess2 start  >>");
	Map<String, Object> resultJSON = new HashMap<String, Object>();

	try {
        Gson gson = new Gson();
        String json = gson.toJson(params);
        TBBCKW001DTO TBBCKW001DTO = gson.fromJson(json, TBBCKW001DTO.class);

        if(TBBCKW001DTO.getMmsn() == null || TBBCKW001DTO.getMmsn().equals("")) throw new SysException(SysErrorCode.INTERNAL_SERVER_ERROR);
			
		count = TBBCKW001Service.setUpdate(TBBCKW001DTO, params);
		logger.debug("TBBCKW001Service.setUpdate COUNT: " + count);


		resultJSON.put("errorcode", "00");
		resultJSON.put("errormessage", "");

	} catch (Exception e) {
		throw new SysException(SysErrorCode.INTERNAL_SERVER_ERROR, e);

	} finally {
		logger.debug("admMemberCorpProcess2 finally : {}", "OK");
	}

	return resultJSON;
}

```

### 메소드 admMemberUserProcess2()    
```java
// 회원관리 사용자 수정(UPDATE): VO방식
@Transactional(propagation = Propagation.REQUIRED)
@RequestMapping(value = "/app/admMemberUserProcess2", method = RequestMethod.POST)
public @ResponseBody Map<String, Object> admMemberUserProcess2(@RequestBody Map<String, Object> params, HttpServletRequest request) {

	logger.info("AdmController admMemberUserProcess2 start  >>");
	Map<String, Object> resultJSON = new HashMap<String, Object>();

	try {
        
        Gson gson = new Gson();
        String json = gson.toJson(params);
        TBBCKW002DTO TBBCKW002DTO = gson.fromJson(json, TBBCKW002DTO.class);
        TBBCKW008DTO TBBCKW008DTO = gson.fromJson(json, TBBCKW008DTO.class);
        
	    if(TBBCKW002DTO.getSlfMmsn() == null || TBBCKW002DTO.getSlfMmsn().equals("")) throw new SysException(SysErrorCode.INTERNAL_SERVER_ERROR);
		
		count = TBBCKW002Service.setUpdate(TBBCKW002DTO, params);
		logger.debug("TBBCKW002Service.setUpdate COUNT: " + count);

		count = TBBCKW008Service.setUpdate(TBBCKW008DTO);
		logger.debug("TBBCKW008Service.setUpdate COUNT: " + count);

		resultJSON.put("errorcode", "00");
		resultJSON.put("errormessage", "");

	} catch (Exception e) {
		throw new SysException(SysErrorCode.INTERNAL_SERVER_ERROR, e);

	} finally {
		logger.debug("admMemberUserProcess2 finally : {}", "OK");
	}

	return resultJSON;
}
    
```

## 서비스(Service)
> ❗<span style='color:green'>***admMemberCorpProcess2 서비스 구현체 정상적으로 수행***</span>   
> ❗<span style='color:green'>***admMemberUserProcess2 서비스 구현체 중간에 RuntimeException 던지기***</span>   


### 콘솔결과
```md
[2024-03-03 13:48:47] INFO : com.blang.bck.LoginInterceptor - ----------------------------------------------------------------
[2024-03-03 13:48:47] INFO : com.blang.bck.LoginInterceptor - ------------------------LoginInterceptor------------------------
[2024-03-03 13:48:47] DEBUG: com.blang.bck.LoginInterceptor - LoginInterceptor finally : OK
[2024-03-03 13:48:47] DEBUG: com.blang.bck.LoginInterceptor - ------------------------------------------------
[2024-03-03 13:48:47] DEBUG: org.springframework.jdbc.datasource.DataSourceTransactionManager - Creating new transaction with name [com.blang.bck.AdmController.admMemberAllProcess]: PROPAGATION_REQUIRED,ISOLATION_DEFAULT; ''
[2024-03-03 13:48:47] DEBUG: org.springframework.jdbc.datasource.DriverManagerDataSource - Creating new JDBC DriverManager Connection to [jdbc:mysql://blang.co.kr:3306/DSDBDO0]
[2024-03-03 13:48:47] DEBUG: org.springframework.jdbc.datasource.DataSourceTransactionManager - Acquired Connection [com.mysql.cj.jdbc.ConnectionImpl@3190d4e5] for JDBC transaction
[2024-03-03 13:48:47] DEBUG: org.springframework.jdbc.datasource.DataSourceTransactionManager - Switching JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@3190d4e5] to manual commit
[2024-03-03 13:48:47] INFO : com.blang.bck.AdmController - AdmController admMemberAllProcess start  >>
[2024-03-03 13:48:47] INFO : com.blang.bck.AdmController - AdmController admMemberCorpProcess2 start  >>
[2024-03-03 13:48:47] DEBUG: com.blang.bck.AdmController - adminInfo: {userid=admin}, adminInfo.get("userid"): admin, (adminInfo.get("userid") == null): false

[2024-03-03 13:48:47] DEBUG: com.blang.bck.AdmController - 로그... 중략 

[2024-03-03 13:48:47] DEBUG: org.springframework.transaction.annotation.AnnotationTransactionAttributeSource - Adding transactional method 'com.blang.bck.service.TBBCKW001ServiceImpl.setUpdate' with attribute: PROPAGATION_REQUIRED,ISOLATION_DEFAULT; ''
[2024-03-03 13:48:47] DEBUG: org.springframework.jdbc.datasource.DataSourceTransactionManager - Participating in existing transaction
[2024-03-03 13:48:47] DEBUG: org.mybatis.spring.SqlSessionUtils - Creating a new SqlSession
[2024-03-03 13:48:47] DEBUG: org.mybatis.spring.SqlSessionUtils - Registering transaction synchronization for SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@61607131]
[2024-03-03 13:48:47] DEBUG: org.mybatis.spring.transaction.SpringManagedTransaction - JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@3190d4e5] will be managed by Spring
[2024-03-03 13:48:47] DEBUG: com.blang.bck.TBBCKW001Mapper.TBBCKW001Update - ==>  Preparing: UPDATE TBBCKW001 A SET A.업체명 = ?, A.사업자등록번호 = ?, A.사업장기본주소 = ?, A.사업장전화번호 = ?, A.업체이메일주소 = ?, A.유효기간년월일 = ?, A.회원신규가입년월일 = ?, A.시스템최종갱신식별자 = ?, A.시스템최종갱신일시 = CURRENT_TIMESTAMP(), A.시스템최종거래일시 = DATE_FORMAT(NOW(), '%Y%m%d%H%i%s%f') WHERE A.회원일련번호 = ? 
[2024-03-03 13:48:47] DEBUG: com.blang.bck.TBBCKW001Mapper.TBBCKW001Update - ==> Parameters: 이치란기업_수정(String), 1234567890(String), 일본 후쿠오카시(String), 0511111111(String), ichiran@jp.com(String), 20240213(String), 20240213(String), admin(String), C0000002(String)
[2024-03-03 13:48:47] DEBUG: com.blang.bck.TBBCKW001Mapper.TBBCKW001Update - <==    Updates: 1
[2024-03-03 13:48:47] DEBUG: org.mybatis.spring.SqlSessionUtils - Releasing transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@61607131]
[2024-03-03 13:48:47] DEBUG: com.blang.bck.AdmController - TBBCKW001Service.setUpdate COUNT: 1
[2024-03-03 13:48:47] DEBUG: com.blang.bck.AdmController - admMemberCorpProcess2 finally : OK
[2024-03-03 13:48:47] INFO : com.blang.bck.AdmController - AdmController admMemberUserProcess2 start  >>


[2024-03-03 13:48:47] DEBUG: com.blang.bck.AdmController - 로그... 중략 
끝

```

> ❗<span style='color:green'>***하나의 트랜잭션으로 맺어진 세션을 자세히보면 잘 처리하는것을 볼 수 있다.***</span>   
>   
> ❗<span style='color:green'>***각 메소드에 명시적 어노테이션 추가/제거 해보니 모두 동일한 결과이다. (디폴트값 확인)***</span>   
> 💡 CASE1.<span style='color:blue'>**@Transaction**</span>  
> 💡 CASE2.<span style='color:blue'>**@Transactional(propagation = Propagation.REQUIRED)**</span>  


