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



## 핵심 어노테이션
* @RequestParam  
  - RequestMapping 을 통한 요청 정보를 매핑시 쿼리파라미터를 매핑
  - 해당 기능을 사용하면 반드시 해당 RequestMapping 을 호출할때 쿼리파라미터를 강제함 (없으면 400 Error)


간단한 파라미터면 해당 기능으로 코드가 간소화 된다. 
{: .notice--info}


## 구현 
### SpringMemberControllerV3

```java
@Controller	
@RequestMapping("/springmvc/v3/members")
public class SpringMemberControllerV3 {
    private MemberRepository memberRepository = MemberRepository.getInstance();

    
    @RequestMapping("/save")
    private String save(@RequestParam("username") String username, @RequestParam("age") int age, Model model) {
        Member member = new Member(username, age);
        memberRepository.save(member);
		
        model.addAttribute("member",member);
        return "save-result";
    }
}

```

## 테스트
### 테스트1  

```bash
# 브라우저에서 url 호출 (+ 쿼리파라미터 입력)
http://호스트주소/springmvc/v3/save?username=홍길동&age=19

==> 정상호출
```
  
### 테스트2  

```bash
# 브라우저에서 url 호출 (+ 쿼리파라미터 미입력)
http://호스트주소/springmvc/v3/save

==> 400 Error

```
  
## 결론
: 간략한 파라미터라면 HttpReqeust 객체 없이 짧은 코드로 받을 수 있을듯하다.
