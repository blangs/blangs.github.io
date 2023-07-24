---
title:  "스프링 RequestParam 어노테이션"
excerpt: "스프링 RequestParam 어노테이션"

categories:
  - spring
tags:
  - [spring, 프레임워크]

toc: true
toc_sticky: true

last_modified_at: 2023-01-04T20:17:00-17:00
---

## 개요
: 스프링 프로젝트의 편리한 기능으로 url호출시(핸들러매핑) 파라미터를 Request 객체가아닌 어노테이션으로 간략하게 받아보자.

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
