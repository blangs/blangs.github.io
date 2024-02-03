---
title:  "스프링 ResponsBody 한글깨질때"
excerpt: "스프링 ResponsBody 한글깨질때 입니다."

categories:
  - spring
tags:
  - [spring, 프레임워크]

toc: true
toc_sticky: true

last_modified_at: 2023-01-06T20:17:00-17:00
---

## GET 방식 인자 한글 처리(tomcat server.xml)
```xml
<Connector connectionTimeout="20000" port="8080" protocol="HTTP/1.1" redirectPort="8443" useBodyEncodingForURI="true" URIEncoding="utf-8"/>

<Connector port="8009" protocol="AJP/1.3" redirectPort="8443" useBodyEncodingForURI="true" URIEncoding="utf-8"/>

```  


## POST 방식 인자 한글 처리
```xml
POST 방식 인자 한글 처리(web.xml) - Filter 추가
<!-- Start: 한글문제 처리 --><filter>    <filter-name>characterEncodingFilter</filter-name>    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>    <init-param>        <param-name>encoding</param-name>        <param-value>utf-8</param-value>    </init-param>    <init-param>        <param-name>forceEncoding</param-name>        <param-value>true</param-value>    </init-param></filter><filter-mapping>    <filter-name>characterEncodingFilter</filter-name>    <url-pattern>/*</url-pattern></filter-mapping><!-- Finish: 한글문제 처리 -->
출처: https://expert0226.tistory.com/240 [여름나라겨울이야기:티스토리]

```

## 원인
> ❗<span style="color:red">***Spring의 MessageConverter의 Charset의 기본값은 형태로 되어 있다. 여기에 UTF-8을 추가해줌으로써 String값을 형태로 바꾸는 것이다.***</span>  
>   
> ❗<span style="color:red">***GPT***</span>  
> 💡 이 설정은 StringHttpMessageConverter를 빈으로 등록하고, supportedMediaTypes 속성을 통해 특정 미디어 타입과 문자 인코딩을 지정하는 것입니다. 여기서는 text/html 미디어 타입과 UTF-8 문자 인코딩을 지정하고 있습니다.  
> 💡 이 설정이 적용되면, 해당 미디어 타입(text/html)으로 요청이나 응답이 발생할 때 StringHttpMessageConverter가 사용됩니다. 이때, 지정한 문자 인코딩(UTF-8)이 적용되어 데이터가 처리됩니다.  
> 💡 즉, 이 설정은 HTML 형식의 데이터를 처리할 때, 그 데이터가 UTF-8로 인코딩된 것으로 가정하고 처리하도록 StringHttpMessageConverter를 구성하는 것입니다. 이는 주로 @ResponseBody 어노테이션을 사용하여 HTTP 응답을 생성할 때 적용됩니다   
> 💡 따라서, 클라이언트에게 HTML 형식의 응답을 제공하고자 할 때, 이 설정을 통해 UTF-8로 인코딩된 HTML을 전송할 수 있습니다.  



## 해결2: 3.1버전 이후(잭슨이 자동으로 설정되어있음)
### 작성중..
