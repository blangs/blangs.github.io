---
title:  "스프링 ResponsBody로 String 을 전달시 한글 깨짐 현상 해결"
excerpt: "스프링 ResponsBody로 String 을 전달시 한글 깨짐 현상 해결 입니다."

categories:
  - spring
tags:
  - [spring, 프레임워크]

toc: true
toc_sticky: true

last_modified_at: 2023-01-06T20:17:00-17:00
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
> 💡 <span style="color:green"><b><I>post용임(body 데이터).</I></b></span>   
> ```xml
> <Connector connectionTimeout="20000" port="8080" protocol="HTTP/1.1" redirectPort="8443" URIEncoding="utf-8"/>
> 
> ```  
>    
> 💡 <span style="color:green"><b><I>web.xml 사전 요청응답 필터링을 UTF-8 으로 완료함.</I></b></span>  
> ```xml
><filter>
><filter-name>encodingFilter</filter-name>
><filter-class>org.springframework.web.filter.CharacterEncodingFilter
></filter-class>
><init-param>
><param-name>encoding</param-name>
><param-value>UTF-8</param-value>
></init-param>
><init-param>
><param-name>forceEncoding</param-name>
><param-value>true</param-value>
></init-param>
></filter>
><filter-mapping>
><filter-name>encodingFilter</filter-name>
><url-pattern>/*</url-pattern>
></filter-mapping>
><!-- 한글설정END 이제부터 ibatis 한글로 쿼리를 날리면 정상해석된다. -->
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


## 해결1: 스프링3.1버전 이전 방법(잭슨을 직접서블릿에 등록해야함)
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
