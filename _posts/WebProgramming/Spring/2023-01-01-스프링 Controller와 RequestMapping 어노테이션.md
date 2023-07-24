---
title:  "스프링 Controller와 RequestMapping 어노테이션"
excerpt: "스프링 Controller와 RequestMapping 어노테이션"

categories:
  - spring
tags:
  - [spring, 프레임워크]

toc: true
toc_sticky: true

last_modified_at: 2023-01-01T20:17:00-17:00
---

## 개요
: 스프링 프로젝트의 편리한 기능으로 컨트롤러 동작방식을 살펴본다.

***참고한 블로그***  
https://yeonyeon.tistory.com/m/116  
{: .notice--info}

## 핵심 어노테이션
* @Controller 
  - 내부에 @Component 어노테이션이 존재해 컴포넌트 스캔의 대상
  - 스프링이 자동으로 스프링 빈으로 등록
  - 스프링 MVC에서 어노테이션 기반 컨트롤러로 인식하게 함  
  
* @RequestMapping  
  - 요청 정보를 매핑
  - 해당 url이 호출되면 해당 메소드가 호출
  - 어노테이션 기반 동작이기 때문에 메소드 이름은 자유


핸들러 매핑과 핸들러 어댑터 중 가장 우선순위가 높은 것은 RequestMappingHandlerMapping, RequestMappingHandlerAdapter이다. @RequestMapping의 앞글자를 따서 만들어졌다
{: .notice--info}


## V1 구현
: 버전1의 구현 예제를 살펴본다.  

### SpringMemberFormControllerV1

```java
@Controller	
public class SpringMemberFormControllerV1 {

    // 새로운 멤버를 생성하기위한 폼 화면을 호출하는 맥락이다.
    @RequestMapping("/springmvc/v1/members/new-form")	
    private ModelAndView process() {
        return new ModelAndView("new-form");
    }
}

```

### SpringMemberSaveControllerV1  
  
```java
@Controller
public class SpringMemberSaveControllerV1 {
    private MemberRepository memberRepository = MemberRepository.getInstance();
	
    // 폼에 입력한 멤버를 DB에 저장하는 맥락이다.
    @RequestMapping("/springmvc/v1/members/save")
    private ModelAndView process(HttpServletRequest req, HttpServletResponse res) {
        String username = req.getParameter("username");
        int age = Integer.parseInt(req.getParameter("age"));
		
        Member member = new Member(username, age);
        memberRepository.save(member);
		
        ModelAndView mv = new ModelAndView("save-result");
        mv.addObject("member", member);
        return mv;
    }
}

``` 

### SpringMemberListControllerV1  
  
```java

@Controller
public class SpringMemberListControllerV1 {
    MemberRepository memberRepository = MemberRepository.getInstance();
	
    // DB에 저장된 멤버들을 꺼내어 화면에 전달하는 맥락이다.
    @RequestMapping("/springmvc/v1/members")
    public ModelAndView process() {
        List<Member> members = memberRepository.findAll();
		
        ModelAndView mv = new ModelAndView("members");
        mv.getModel().put("members", members);
		
        return mv;
    }
}

```  

### 결론
: V1 컨트롤러 동작과정은 맥락만 파악하여 전체적인 흐름을 살펴본다.

- 코드가 훨씬 간편해진 것이 보이지만 @RequestMapping이 클래스가 아닌 메소드 단위에 적용되어 있다.

> ***V2 컨트롤러에서 클래스를 좀 더 유연하게 통합해보자.***


## V2 구현
: 버전1보다 유연한 버전2의 구현 예제를 살펴본다.

### SpringMemberControllerV2

```java
@Controller	
@RequestMapping("/springmvc/v2/members")
public class SpringMemberControllerV2 {
    MemberRepository memberRepository = MemberRepository.getInstance();
	
    // 새로운 멤버를 생성하기위한 폼 화면을 호출하는 맥락이다.
    @RequestMapping("/new-form")
    private ModelAndView newForm() {
        return new ModelAndView("new-form");
    }
	
    // DB에 저장된 멤버들을 꺼내어 화면에 전달하는 맥락이다.
    @RequestMapping
    public ModelAndView members() {
        List<Member> members = memberRepository.findAll();
		
        ModelAndView mv = new ModelAndView("members");
        mv.getModel().put("members", members);
		
        return mv;
    }
	
    // 폼에 입력한 멤버를 DB에 저장하는 맥락이다.
    @RequestMapping("/save")
    private ModelAndView save(HttpServletRequest req, HttpServletResponse res) {
        String username = req.getParameter("username");
        int age = Integer.parseInt(req.getParameter("age"));
		
        Member member = new Member(username, age);
        memberRepository.save(member);
        
        ModelAndView mv = new ModelAndView("save-result");
        mv.addObject("member", member);
        return mv;
    }
}

```

### 결론
: V2 컨트롤러 동작과정은 V1 컨트롤러의 분리된 내용이 통합되어있다. 이로인해 java 컨트롤러를 추가로 작성할 필요가 없어졌다.

- 클래스 3개로 분리되었던 작업이 단 하나의 파일로 줄어들었다.
- 통합시 리턴타입은 전과 동일하지만 기존 process() 메소드명이 각각의 역할별 메소드명으로 정의되었다.
- RequestMapping이 클래스에도 붙고 메소드에도 붙는다.
- RequestMapping를 클래스레벨에 적용한 경로는 생략한 경로를 메소드레벨에서 리턴 경로로 이어서 작성한 모습이 보인다.
- 위와 같은 경우에 save()를 부르려면 /spingmvc/v2/members/save로 접근하면 된다.


> ***V2 컨트롤러에서 아직 불편한점이 남아있다.***  
> ModelAndView를 매번 생성하고 반환해주는게 좀 번거롭게 느껴진다. 
> 실무에서 사용하는 것과 가깝게 개선해보자.



## V3 구현
: 버전3의 구현 예제를 살펴본다.

### SpringMemberControllerV3

```java
@Controller	
@RequestMapping("/springmvc/v3/members")
public class SpringMemberControllerV3 {
    private MemberRepository memberRepository = MemberRepository.getInstance();
	
    @RequestMapping("/new-form")
    private String newForm() {
        return "new-form";
    }
	
    @RequestMapping
    public String members(Model model) {
        List<Member> members = memberRepository.findAll();
        model.addAttribute("members",members);
        return "members";
    }
	
    @RequestMapping("/save")
    private String save(@RequestParam("username") String username, @RequestParam("age") int age, Model model) {
        Member member = new Member(username, age);
        memberRepository.save(member);
		
        model.addAttribute("member",member);
        return "save-result";
    }
}

```

### 결론
: V3 컨트롤러 동작과정은 V2 컨트롤러의 중복된 객체 생성을 제거했다.

- 리턴타입이 ModelAndView 에서 String 타입으로 변경되었다. 
- 이로인해 ModelAndView 를 매번 생성하지 않아도 된다.
- (기타내용)@RequestParam: HttpServletRequest가 아니라 파라미터를 직접 받아올 수 있다.
