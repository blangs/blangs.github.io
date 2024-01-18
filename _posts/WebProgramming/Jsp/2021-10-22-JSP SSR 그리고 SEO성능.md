---
title:  "JSP SSR 그리고 SEO성능"
excerpt: "JSP SSR 그리고 SEO성능 입니다."

categories:
  - jsp
tags:
  - [jsp, 서버사이드]

toc: true
toc_sticky: true

last_modified_at: 2022-10-22T20:00:00-05:00
---

## SEO 최적화 기본  
> ❗<span style='color:green'><b><I>***SEO 최적화 구성요소***</I></b></span>  
> 💡 <span style='color:red'><b>서버사이드 랜더링(SSR)</b></span>: 페이지의 초기 HTML을 서버에서 랜더링하여 클라이언트에게 전달(검색엔진이 색인하기 쉬워짐)  
> 💡 <span style='color:red'><b>메타태그활용</b></span>: '<meta name="description" content="페이지 설명"'>과 같은 태그를 활용.  
> 💡 <span style='color:red'><b>SEO-friendly URL 사용</b></span>: URL구조를 의미있게 작성(검색엔진이 색인하기 쉬워짐)  
> 💡 <span style='color:red'><b>사이트맵 제출</b></span>: 검색엔진에게 사이트맵을 제출(검색엔진이 색인하기 쉬워짐)  
> 💡 <span style='color:red'><b>콘텐츠의 풍부한 키워드 사용</b></span>: 페이지의 콘텐츠에는 중요한 키워드를 적절하게 사용(검색엔진이 색인하기 쉬워짐)  


## 서버사이드 렌더링(SSR) 기본
> ❗<span style='color:green'><b><I>***SSR 특징***</I></b></span>  
> 💡 <span style='color:blue'><b>서버사이드 렌더링(SSR)은 웹 페이지의 초기 로딩 시에 서버에서 HTML을 생성하여 클라이언트에게 전송하는 웹 개발 방식.</b></span> 이 방식은 클라이언트에서 페이지를 동적으로 생성하는 대신 <span style='color:blue'><b>서버에서 페이지를 완전히 렌더링한 후에 클라이언트에게 전달한다.</b></span>  
> 💡 검색엔진최적화(SEO): SSR은 검색 엔진에게 페이지의 콘텐츠를 이해하고 색인화하기 쉽게 만다.(초기에 서버에서 렌더링된 HTML을 검색 엔진이 수집하고 인덱싱)  
> 💡 초기로딩속도향상: 로드시 서버에서 렌더링된 필요한HTML을 미리 받아오므로, 속도가 향상.(렌더링에 필요한 데이터를 미리 가져와 서버에서 처리하기 때문에 빈화면 방지.)  
> 💡 손쉬운캐싱구현: 서버에서 렌더링된 HTML은 정적인 형태로 캐싱하기 용이함.(쓰려나..?)  
> 💡 웹크롤러호환성: SSR은 JavaScript를 실행하지 않고도 페이지의 콘텐츠를 이해할 수 있기 때문에 웹 크롤러와의 호환성이 높다. (일부 검색 엔진은 JavaScript를 실행하지 않거나 제한적)  
> 💡 페이지구조변경 용이: 서버에서 페이지를 완전히 렌더링하므로, 페이지의 구조를 동적으로 변경하기 더 쉬움. (클라이언트 측에서는 뷰만 업데이트)
>   
> ❗<span style='color:green'><b><I>***SSR 장단점***</I></b></span>  
> 💡 장점: SSR은 웹 애플리케이션의 초기 로딩 속도 및 검색 엔진 최적화 등의 측면에서 장점  
> 💡 단점: 서버 부하가 높아질 수 있고, 클라이언트 측에서의 동적인 상호작용이 일부 제한될 수 있다는 단점.  



## SEO를 위한 HTML 문서 렌더링
### 초기로드시 렌더링(SSR)

```bash
## 브라우져는 태그들을 위에서 아래로 평가함. 
## 아래 태그는 위 태그가 평가되기 전까지 평가가 동기적으로 막힌다. 
## 반드시 html -> js 순이라는 원칙은 없다. (document.ready 등..)

브라우져가 태그를 위에서 아래로 해석하기에 
head 에 script가 있으면 body의 콘텐츠들은 script를 평가할때까지 
paint하지 못하므로 초기 렌더링이 느려진다... 
최근에는 body의 마지막에 script태그를 몰아서 삽입하기도 한다.  

```  
```jsp
<%@ page contentType="text/html;charset=UTF-8" %> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> <html>

<head>
    <title>SEO Optimized Example</title>
    <meta name="description" content="페이지 설명">
</head>
<body>
    <!-- 콘텐츠를 초기에 서버에서 랜더링하여 클라이언트에게 전달 -->
    <c:set var="dynamicData" value="Hello, JavaScript! This data is bound using JSTL." />
    <!-- 서버 값에 따라 html 동적출력 -->
    <c:choose>
    <c:when test="${dynamicData != null && !dynamicData.empty}">
    <p>활성화 상태입니다.</p>
    </c:when>
    </c:choose>
</body>

</html>

```

> ❗<span style='color:green'><b><I>***위와 같이 초기로딩시 html을 그리면 SEO에 좋다.***</I></b></span>  
>   
> ❗<span style='color:green'><b><I>***해석***</I></b></span>  
> 💡 서버사이드 렌더링은 페이지의 초기 로딩시 서버에서 HTML을 생성하여 클라이언트에게 전달하는 방식.  
> 💡 위 예제에서 JSP와 JSTL을 이용하여 서버에서 초기 랜더링한 HTML을 클라이언트에게 전송하고 있다.  
> 💡 클라이언트는 랜더링된 HTML을 받아서 화면을 구성하게 된다.  
> 💡 따라서, 주어진 코드는 서버사이드 렌더링의 예시에 해당하며, 클라이언트 측에서는 초기에 랜더링된 HTML을 받아서 화면을 표시한다.  


### 초기로드시 렌더링(SSR): EL, JSTL VS 자바스크립트  
> ❗<span style='color:green'><b><I>***JSTL(서버에서처리)***</I></b></span>  
> 💡 EL의 {}, JSTL의 c:if, c:choose 가 있다.  
> 💡 민감한 데이터를 보여주고 싶을때 적합하다. (서버에서 미리처리하고 EL로 받아오기.)  
> 💡 서버처리시간이 길어지면(렌더링 데이터가 많으면) 흰화면만 나온다. 그리고 검색할 때마다, 화면이 깜빡깜빡한다.  
> 💡 <span style='color:red'><b>하지만 간단하거나, 중요데이터값을 받거나, 정적적인 화면에 최적이다.</b></span>  
>   
> ❗<span style='color:green'><b><I>***JS(클라이언트에서 처리)***</I></b></span>  
> 💡 ajax가 있다.  
> 💡 ajax를 통해서 통신할테니 데이터가 오픈된다. (==> 필요한 데이터만 고려해서 전송해야한다.)  
> 💡 <span style='color:red'><b>하지만 동적인 부분은 화면갱신없이 핸들링이 너무쉽다.</b></span>  
> 
>    
> ❗<span style='color:green'><b><I>***무엇이 좋을까?***</I></b></span>  
> 💡 <span style='color:red'><b>결론은 개발할 때는, 변하지 않는 화면요소는 JSTL에서 처리하고, 동적인 부분은 ajax로 처리하는게 무난하다.</b></span>    
