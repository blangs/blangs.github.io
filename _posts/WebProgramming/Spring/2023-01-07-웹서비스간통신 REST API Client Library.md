---
title:  "스프링 로그인보안"
excerpt: "스프링 로그인보안"

categories:
  - spring
tags:
  - [spring, 프레임워크]

toc: true
toc_sticky: true

last_modified_at: 2023-01-07T13:17:00-17:00
---

## 개요
: 스프링 프로젝트에서 웹과 소통하는 방법을 알아본다. 
즉, REST API Client Library 

> ***핵심)***  
> 서비스간에 통신 방식은 주로 REST API 를 사용한다.  
> REST API 를 클라이언트 사용자 입장에서 활용하는 JAVA Library 를 알아본다.


## 종류
- OKHttp
- Retrofit
- RestTemplate
- HttpClient (*주로사용)
- HttpURLConnection (*주로사용)

간단한 파라미터면 해당 기능으로 코드가 간소화 된다. 
{: .notice--info}


## 구현 
### 메인화면
: 메인화면으로 이동한다.

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
