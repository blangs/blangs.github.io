---
title:  "자바 스프링3 @RequestBody 사용하기
excerpt: "자바 스프링3 @RequestBody 사용하기 입니다."

categories:
  - java
tags:
  - [java]

toc: true
toc_sticky: true

last_modified_at: 2023-08-17T09:00:00-18:00:00
---
  
## 요약
```java
// Apache HttpCore » 4.4.15 필요
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;

// Apache HttpClient » 4.5.13 필요 
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClients;

```

> ❗<span style='color:green'><b><I>Apache HttpCore » 4.4.15</I></b></span>  
> 💡 이 마지막 버전의 라이브러리를 추가해주어야 위 클래스 임포트가 가능하다.  
> 💡 4버전의 마지막인 4.4.16 를 추가하면 임포트 불가능함을 확인했다.   
>   
> ❗<span style='color:green'><b><I>Apache HttpClient » 4.5.13</I></b></span>  
> 💡 위와 동일하다.  

***다운로드 경로***  
Apache HttpCore » 4.4.15: [바로가기 링크](https://mvnrepository.com/artifact/org.apache.httpcomponents/httpcore/4.4.15)  
Apache HttpClient » 4.5.13: [바로가기 링크](https://mvnrepository.com/artifact/org.apache.httpcomponents/httpclient/4.5.13)  
    

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

## 문제점
> ❗<span style='color:green'><b><I>401 에러 발생</I></b></span>  
> 💡 계속해서 406, 415 에러가 발생했다.
>  
> ❗<span style='color:green'><b><I>계속 응답 Content-Type 이 text/html 이다.</I></b></span>  
> 💡 @ResponseBody 로 처리되어 리턴되면 Content-Type 은 application/json 이 되어야한다.  
>  


### 해결과정
>  
> ❗<span style='color:green'><b><I>일부 스프링3에는 기본적으로 내장된 기능이 없다.</I></b></span>  
> 💡 라이브러리를 추가하니까 가능했다.