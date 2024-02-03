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
  
## 지속적인 디폴트 iso-8859-1 를 한글로 처리
```java
/* 
the default charset of @ResponseBody is iso-8859-1, how to change to utf8.
출처: http://linuxism.tistory.com/720
*/
@RequestMapping(value = "/path", produces="text/plain;charset=UTF-8")
public @ResponseBody String handlePath() {
  .....
}

```

> ❗<span style="color:red">***내용***</span>   
> 💡 <span style="color:green">**produces="text/plain;charset=UTF-8"를 사용하여 응답 페이지에 대한 UTF-8 인코딩이 가능하여 한글 깨짐을 방지 할 수 있음.**</span> 



## GET 방식 인자 한글 처리(tomcat server.xml)
```xml
<Connector connectionTimeout="20000" port="8080" protocol="HTTP/1.1" redirectPort="8443" useBodyEncodingForURI="true" URIEncoding="utf-8"/>

<Connector port="8009" protocol="AJP/1.3" redirectPort="8443" useBodyEncodingForURI="true" URIEncoding="utf-8"/>

```



## POST 방식 인자 한글 처리
```xml
<filter>
<filter-name>encodingFilter</filter-name>
<filter-class>org.springframework.web.filter.CharacterEncodingFilter
</filter-class>
<init-param>
<param-name>encoding</param-name>
<param-value>UTF-8</param-value>
</init-param>
<init-param>
<param-name>forceEncoding</param-name>
<param-value>true</param-value>
</init-param>
</filter>
<filter-mapping>
<filter-name>encodingFilter</filter-name>
<url-pattern>/*</url-pattern>
</filter-mapping>
<!-- 한글설정END 이제부터 ibatis 한글로 쿼리를 날리면 정상해석된다. -->

```
