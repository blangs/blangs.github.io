---
title: "JAVA 예외처리"
excerpt: "JAVA 예외처리 입니다."

categories:
  - temp
tags:
  - [oracle, schema]
toc: true
toc-stiky: true
last_modified_at: 2023-08-12T13:00:00-05:00
---

## AS-IS
### MyCustomRuntimeException.java
```java
public class MyCustomRuntimeException extends RuntimeException {

    public MyCustomRuntimeException(String message) {
        super(message);
    }

    public MyCustomRuntimeException(String message, Throwable cause) {
        super(message, cause);
    }
}

```  

  
### MyController.java
```java
@RestController
public class MyController {

    private static final Logger logger = LoggerFactory.getLogger(MyController.class);

    @Autowired
    private MyService myService;

    @RequestMapping("/example")
    public Map<String, Object> exampleHandler() {
        Map<String, Object> result = new HashMap<>();
        try {
            myService.doSomething();
            result.put("status", "Success");
        } catch (Exception e) {
            logger.error("Exception occurred: " + e.getMessage(), e);
            result.put("status", "Error");
            result.put("message", "An error occurred");
        }
        return result;
    }

    @RequestMapping("/another")
    public Map<String, Object> anotherHandler() {
        Map<String, Object> result = new HashMap<>();
        try {
            myService.doAnotherThing();
            result.put("status", "Success");
        } catch (Exception e) {
            logger.error("Exception occurred: " + e.getMessage(), e);
            result.put("status", "Error");
            result.put("message", "An error occurred");
        }
        return result;
    }
}

```

> ❗<span style='color:green'><b><I>중복</I></b></span>  
> 💡 중복 코드: 여러 컨트롤러 메소드에서 [에러처리코드]가 반복되어 중복이다.  
> 💡 가독성: [에러처리코드]가 각 메소드에 직접 삽입되어 있어 가독성이 떨어어진다.  
> 💡 확장성: 새로운 에러 상황이 추가될 때마다 모든 메소드에 동일한 코드를 추가 필요함. 이로 인해 코드의 확장성이 떨어진다.  
> 💡 컨트롤러 역할의 혼란: 컨트롤러는 주로 HTTP 요청을 처리하고 응답을 생성하는 역할을 수행해야 한다.. 하지만 에러 처리 로직이 섞여 있으면 컨트롤러의 역할이 혼란스러워질 수 있다.  
> 💡 단일 책임 원칙 위반: 각 메소드에서 예외를 처리하는 코드가 컨트롤러에 포함되어 있으므로, 단일 책임 원칙(Single Responsibility Principle)을 위반할 수 있다.  




## TO-BE(레벨1): 기존 + 에러관리 클래스 만들기
### MyCustomRuntimeException.java
```java
/****************************** 
에러관리 클래스
******************************/
public class MyCustomRuntimeException extends RuntimeException {

    public MyCustomRuntimeException(String message) {
        super(message);
    }

    public MyCustomRuntimeException(String message, Throwable cause) {
        super(message, cause);
    }
}

``` 
  

### MyService.java
```java
/****************************** 
서비스 클래스
******************************/
@Service
public class MyService {

    public void myServiceLogic() {
        // 서비스 로직 수행

        // 예외 상황이 발생할 경우 MyCustomRuntimeException을 던짐
        if (someCondition) {
            throw new MyCustomRuntimeException("Custom exception occurred in MyService");
        }

        // 나머지 로직 수행
    }
}

```
    

### MyController.java
```java
/****************************** 
컨트롤러
******************************/
@RestController
@RequestMapping("/myController")
public class MyController {

    private final MyService myService;

    @Autowired
    public MyController(MyService myService) {
        this.myService = myService;
    }

    @PostMapping("/myEndpoint")
    public Map<String, Object> handleRequest(@RequestBody Map<String, Object> requestBody) {
        Map<String, Object> result = new HashMap<>();

        try {
            myService.myServiceLogic(); // 서비스 호출

            // 성공 시 처리
            result.put("status", "success");
            result.put("message", "Request processed successfully");

        } catch (MyCustomRuntimeException e) {
            // 서비스에서 발생한 예외를 MyCustomRuntimeException으로 잡아서 처리
            result.put("status", "error");
            result.put("message", "Custom exception occurred: " + e.getMessage());

        } catch (Exception e) {
            // 기타 예외 처리
            result.put("status", "error");
            result.put("message", "An error occurred: " + e.getMessage());
        }

        return result;
    }
}

```

> ❗<span style='color:green'><b><I>요약</I></b></span>  
> 💡 기존에는 컨트롤러, 서비스 모든곳에서 예외처리를 구현했다.  
> 💡 현재는 별도 에러클래스를 만들어서 구현했다.  
>   
> ❗<span style='color:green'><b><I>서비스 클래스에서 예외 처리</I></b></span>  
> 💡 기존 코드에서는 서비스 클래스 내에서 예외를 처리하지 않고 컨트롤러에서만 처리하고 있었다. (즉,컨트롤러에서 예외 처리를 각각 구현해야 했다.)  
> 💡 변경된 코드에서는 서비스 클래스에서 예외를 처리하고 특정 예외(RunTimeException)가 발생할 경우, 이를 특화된 예외(MyCustomRuntimeException)로 감싸서 던지도록 변경했다.  
>   
> ❗<span style='color:green'><b><I>컨트롤러 클래스에서 중복된 예외 처리</I></b></span>    
> 💡 기존 코드에서는 모든 컨트롤러에서 각자 예외를 처리하는 구조로 되어 있었다. 따라서 예외 처리 로직이 중복되고 있었다.  
> 💡 변경된 코드에서는 MyCustomRuntimeException을 통합처리 한다. 이 예외가 발생할 경우, 특정 응답을 생성하여 클라이언트에게 반환하고 있다.  


  
## TO-BE(레벨2): 기존 + 에러관리 + 에러코드관리 클래스 만들기
### AdmController.java
```java
/****************************** 
컨트롤러
******************************/
@Controller
public class AdmController {
	
	private static final Logger logger = LoggerFactory.getLogger(AdmController.class);
  @ResponseBody
	@RequestMapping(value="/app/test1",method = RequestMethod.POST)
  public Map<String, Object> test1(@RequestBody Map<String, Object> params, HttpServletRequest request) {
		
      logger.info("AdmController test1 start  >>");
      
      Map<String, Object> resultJSON = new HashMap<String, Object>();
              
      try {
        //사용자 조회서비스
        TBDBDW002DTO inputW002 = new TBDBDW002DTO();
        inputW002.setSlfMmsn(slfMmsn);
        TBDBDW002DTO tBDBDW002DTO = tBDBDW002Service.getSelectOne(inputW002);
        
      } catch(Exception e) {
        //1. 통합된 에러처리: 커스텀익셉션에 1번 던져서 [커스텀메세지]와 [오리지날익셉션]내용을 모두 출력.
        //2. 통합된 에러코드: 명확히 어떤 에러인지 개발자가 [파악]하고 [관리]가 가능함.
        throw new SysException(SysErrorCode.INVALID_INPUT_VALUE); 
      
      } finally {
        logger.debug("test1 finally : {}", "OK");
      }
      
      return resultJSON;
    }
}

```


### SysErrorCode.java
```java
/****************************** 
에러코드 관리 클래스
******************************/
public enum SysErrorCode {
	//Common
	INVALID_INPUT_VALUE(400, "C001", "입력 값이 유효하지 않습니다."), //Bad Request
	METHOD_NOT_ALLOWED(405, "C002", "허용되지 않은 메소드입니다"),
	ENTITY_NOT_FOUND(400, "C003", "해당 엔터티를 찾을 수 없습니다."),
	INTERNAL_SERVER_ERROR(500, "C004", "서버 오류"),
	INVALID_TYPE_VALUE(400, "C005", "유효하지 않은 유형 값"),
	HANDLE_ACCESS_DENIED(403, "C006", "접근이 거부되었습니다."),
	//Member
	EMAIL_DUPLICATION(400, "M001", "중복된 이메일 주소입니다"),
	LOGIN_INPUT_INVALID(400, "M002", "유효하지 않은 로그인 입력입니다."),
	//Coupon
	COUPON_ALREADY_USE(400, "C0001", "쿠폰은 이미 사용되었습니다."),
	COUPON_EXPIRE(400, "C0002", "쿠폰은 이미 만료되었습니다.");
	
    private final String code;
    private final String message;
    private int status;

    SysErrorCode(final int status, final String code, final String message) {
        this.status = status;
        this.message = message;
        this.code = code;
    }

	public String getCode() {
		return code;
	}

	public String getMessage() {
		return message;
	}

	public int getStatus() {
		return status;
	}
    
}
```

### SysException.java
```java
/****************************** 
에러 통합 클래스(실행예외)
******************************/
package com.blang.bck.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SysException extends RuntimeException 
{
	private static final Logger logger = LoggerFactory.getLogger(SysException.class);
	private final SysErrorCode errorCode;
    private String msgCode;

    public SysException(SysErrorCode errorCode) {
    	super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
    public SysException(SysErrorCode errorCode, Throwable e) {
        super(errorCode.getMessage(), e);
        this.errorCode = errorCode;
        
        logOriginalException(e);
    }

    //Getter
    public SysErrorCode getErrorCode() {
        return errorCode;
    }

    //[커스텀메세지]와 [오리지날익셉션]내용을 모두 출력.
    private void logOriginalException(Throwable e) {
    	logger.info("SysException logOriginalException start  >>");
	    logger.error("[custom Exception msgCode]: {}", msgCode); //커스텀 내용
	    logger.error("[org Exception name]: {}", e.getClass().getName()); //(동일)e.printStackTrace();
	    logger.error("[org Exception message]: {}", e.getMessage()); //오리지날 익셉션 내용
    }
    
}

```

> ❗<span style='color:green'><b><I>요약</I></b></span>  
> ```java
> /*
> 에러 코드 관리: SysErrorCode 열거형 클래스를 통해 에러 코드를 관리하고 있습니다. 이를 통해 에러 코드의 일관성을 유지하고, 에러 발생 시 특정 예외를 빠르게 식별할 수 있습니다.
> 
> 에러 통합 클래스: SysException 클래스를 사용하여 특정 예외를 래핑하고, 예외 발생 시 추가 정보를 로깅하는 통합된 방식을 사용하고 있습니다. 이는 코드 중복을 방지하고, 에러 처리를 일관성 있게 유지할 수 있도록 도와줍니다.
> 
> 예외 처리 및 로깅: 컨트롤러에서 발생하는 예외를 SysException을 통해 처리하고, 로깅하는 방식을 사용하고 있습니다. 이는 예외에 대한 추가 정보를 제공하고, 로깅을 통해 문제를 빠르게 파악할 수 있도록 합니다.
> 
> RESTful API 구현: @Controller, @RequestMapping, @ResponseBody 어노테이션을 사용하여 RESTful API를 구현하고 있습니다. 이는 클라이언트에게 JSON 형태로 데이터를 반환하고, 요청과 응답을 명시적으로 처리할 수 있도록 도와줍니다.
> 
> 코드 가독성: 코드에 주석을 포함하여 각 부분의 역할을 설명하고 있습니다. 또한, 각 변수 및 메서드의 명명법을 통해 코드의 가독성을 높이고 있습니다.
> 
> 예외 처리 방식: 특정 예외가 발생할 경우 SysException을 던지고 있으며, 해당 예외에 대한 처리를 통일하고 있습니다. 이는 예외 처리를 통일된 방식으로 관리하고, 코드 중복을 최소화합니다.
> 
> 파라미터 사용: 컨트롤러 메서드에서 @RequestBody 어노테이션을 사용하여 JSON 형태의 요청을 매핑하고, HttpServletRequest를 통해 추가적인 파라미터를 처리하고 있습니다.
> 
> 트라이-캐치 구문 사용: 예외가 발생할 수 있는 코드를 try-catch 구문으로 감싸고, 특정 예외가 발생할 경우 SysException으로 래핑하여 통일된 방식으로 처리하고 있습니다.
> */
>   
> ```
>   
> ❗<span style='color:green'><b><I>총괄적으로 보면, 위의 코드는 에러 처리 및 예외 관리에 있어서 일관성 있고 효율적인 방식을 채택하고 있습니다.</I></b></span>  
