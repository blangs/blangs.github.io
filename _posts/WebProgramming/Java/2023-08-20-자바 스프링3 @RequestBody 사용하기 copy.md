---
title:  "자바 스프링3 @RequestBody 사용하기
excerpt: "자바 스프링3 @RequestBody 사용하기 입니다."

categories:
  - java
tags:
  - [java]

toc: true
toc_sticky: true

last_modified_at: 2023-08-20T09:00:00-18:00:00
---
  

## 코드
### HomeController.java
```java
@ResponseBody
@RequestMapping(value = "/getYarnResource", method = RequestMethod.POST)
public List<Map<String, Object>> getYarnResource(@RequestBody HashMap<String, Object> param) {

	logger.info("ChartController getYarnResource() start >>");
	//로직 작성
	return new ArrayList<Map<String, Object>>();
}
```

### sample.js
```js
var paramJsonData = {}

$.ajax({
    url: '/chart/getYarnResource',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    async: true,
    cache: false,
    data: JSON.stringify(paramJsonData),   // {} 
    success: function(result) {
        // 성공적으로 데이터를 받아왔을 때 처리하는 부분
        console.log('Success:', result);
    },
    error: function(xhr, status, error) {
        // 요청이 실패하거나 에러가 발생했을 때 처리하는 부분
        console.error('Error:', status, error);
    }
});

```

## 원하는점 
> ❗<span style='color:green'><b><I>JSON 데이터를 처리하고싶다.</I></b></span>  
> 💡 json 데이터를 넘겨서 간편하게 컨트롤러측에서 Map 으로 받고 싶었다.  

## 문제점
> ❗<span style='color:green'><b><I>401 에러 발생</I></b></span>  
> 💡 계속해서 406, 415 에러가 발생했다.
>  
> ❗<span style='color:green'><b><I>계속 응답 Content-Type 이 text/html 이다.</I></b></span>  
> 💡 @ResponseBody 로 처리되어 리턴되면 Content-Type 은 application/json 이 되어야한다.  
> 💡 서버에서 에러가 발생하면서 멈추니까 계속 아래처럼 응답했다.......
>  
>  ![사진1](/assets/images/WebProgramming/Java/java-requestparam1.jpg)  
>  
> ❗<span style='color:green'><b><I>정상 시</I></b></span>  
> 💡정상이라면 아래처럼 나와야 한다.
>  
>  ![사진1](/assets/images/WebProgramming/Java/java-requestparam2.jpg)  

## 해결법
### STEP1. jackson 라이브러리 추가
```xml
<!-- Data Binding -->
<!-- JSON 데이터 처리를 위한 dependency -->
<dependency> 
	<groupId>com.fasterxml.jackson.core</groupId>
	<artifactId>jackson-databind</artifactId>
	<version>2.9.8</version>
</dependency>
 
<dependency>
<groupId>org.codehaus.jackson</groupId>
    <artifactId>jackson-mapper-asl</artifactId>
	<version>1.9.13</version>
</dependency>

```
  
> 💡 위 라이브러리 임포트  

  
### STEP2. servlet-context.xml 설정 확인(1)
  
```xml
<context:component-scan base-package="com.kbcard.bdp" />

```

> 💡 패키지 빈등록이 제대로 되었는지 확인  

### STEP3. servlet-context.xml 설정 확인(2)

```
STS 하단 Namespaces 탭 > mvc 체크 확인

```


### 정리
>  
> ❗<span style='color:green'><b><I>일부 스프링3에는 기본적으로 내장된 기능이 없다.</I></b></span>  
> 💡 라이브러리를 추가하니까 가능했다.  
> 💡 도움된 포스팅: [https://devks.tistory.com/26](https://devks.tistory.com/26)  
>  
> ❗<span style='color:green'><b><I>스프링 jackson 라이브러리 내장</I></b></span>  
> 💡 정말 오랫동안 문제를 해결하려고 찾는도중에 기록할만한 내용이 보인다.    
> 💡 스프링은 jackson 라이브러리를 기본내장한다고 한다.   
> 💡 메이븐에서 스프링 버전에 기본내장된 jackson 라이브러리 확인하고 다운받았다.  
> - [https://mvnrepository.com/artifact/org.springframework/spring-web/4.1.2.RELEASE](https://mvnrepository.com/artifact/org.springframework/spring-web/4.1.2.RELEASE)  
>  
> 💡 컨트롤러 로직을 수행이 가능해졌다. 하지;만 여전히 응답을 json으로 뱉지 못했다..  
> 💡 jackson 라이브러리의 문제라는것을 직감했고 위 포스팅을 보고 jackson-mapper-asl 가 필요하다는 것을 알게되었다. 



