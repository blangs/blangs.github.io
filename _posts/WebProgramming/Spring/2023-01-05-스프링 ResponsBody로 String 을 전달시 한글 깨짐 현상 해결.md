---
title:  "스프링 ResponsBody로 String 을 전달시 한글 깨짐 현상 해결"
excerpt: "스프링 ResponsBody로 String 을 전달시 한글 깨짐 현상 해결 입니다."

categories:
  - spring
tags:
  - [spring, 프레임워크]

toc: true
toc_sticky: true

last_modified_at: 2023-01-04T20:17:00-17:00
---

## 개요
> ❗<span style="color:red">***응답헤더가 자꾸만 ISO-8859-1 이다.***</span>  
> 💡 아래처럼 셋팅했음에도 그렇다.  
>  
> ❗<span style="color:red">***클라이언트***</span>   
> 💡 <span style="color:green"><b><I>JSP의 브라우저에게 전송하는 인코딩설정 완료함</I></b></span>  
> ```jsp
> <!-- 
>    contentType: JSP페이지가 브라우저에게 전달할때 인코딩
>    charset: JSP페이지가 자체의 인코딩. (내용이 UTF-8 으로 작성되어있야아 한다.)
> -->
> <%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" session="true" %>
> 
> ```   
>   
> ❗<span style="color:red">***서버***</span>  
> 💡 <span style="color:green"><b><I>톰캣서버의 기본인코딩을 UTF-8 으로 완료함.</I></b></span>   
> ```xml
> <Connector connectionTimeout="20000" port="8080" protocol="HTTP/1.1" redirectPort="8443" URIEncoding="utf-8"/>
> 
> ```  
>    
> 💡 <span style="color:green"><b><I>web.xml 사전 요청응답 필터링을 UTF-8 으로 완료함.</I></b></span>  
> ```xml
> <filter>
> <filter-name>encodingFilter</filter-name>
> <filter-class>org.springframework.web.filter.CharacterEncodingFilter
> </filter-class>
> <init-param>
>     <param-name>encoding</param-name>
>     <param-value>UTF-8</param-value>
>     </init-param>
> <init-param>
>     <param-name>forceEncoding</param-name>
>     <param-value>true</param-value>
> </init-param>
>	</filter>
> <filter-mapping>
> <filter-name>encodingFilter</filter-name>
> <url-pattern>/*</url-pattern>
> </filter-mapping>
> 
> ```  



## 문제 요약
```java
@RequestMapping(value="/preview/{id}", method=RequestMethod.GET)
public @ResponseBody String getContent(@PathVariable("id") long id) {
    return service.getContent(id);
}

```

> ❗<span style="color:red">***컨트롤러 내용***</span>  
> 💡 <span style="color:green"><b><I>String 전문(@ResponseBody 적용)을 응답</I></b></span>   
>    
> ❗<span style="color:red">***위 결과의 응답헤더***</span>  
> ```xml
> Content-Type:application/json;charset=ISO-8859-1
> 
> ```  

> 💡 <span style="color:green"><b><I>UTF-8 을 응답하지 않는다..</I></b></span>   
> 💡 <span style="color:green"><b><I>한글이 깨진다.</I></b></span>    


## 해결
### servlet-context.xml
```xml
<!-- -->
<mvc:annotation-driven>
    <mvc:message-converters>
        <!-- @ResponseBody Content-Type:application/json;charset=UTF-8  -->
        <bean class="org.springframework.http.converter.StringHttpMessageConverter">
            <property name="supportedMediaTypes">
                <list>
                    <value>text/html;charset=UTF-8</value>
                </list>
            </property>
        </bean>
    </mvc:message-converters>
</mvc:annotation-driven>

```  

> ❗<span style="color:red">***위 설정으로 RequestBody 의 String 리턴 조치***</span>  
> 💡 <span style="color:green"><b><I>UTF-8 을 응답한다.</I></b></span>   
> 💡 <span style="color:green"><b><I>한글이 정상적으로 출려된다.</I></b></span>    



