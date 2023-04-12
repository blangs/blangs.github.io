---
title:  "JSP 컴파일 런타임 시점별 Include 방법"
excerpt: "JSP 컴파일 런타임 시점별 Include 방법 입니다."

categories:
  - html-css-js-jquery
tags:
  - [HTML,CSS,JS,jquery]

toc: true
toc_sticky: true

last_modified_at: 2023-03-13T20:00:00-05:00
---

## 개요
JSP 같은 템플릿 엔진에서는 HTML 코드 내부에 서버값을 표현식이나 스크립트릿 EL 같은 서버 응답 값을 동적으로 로딩할 수 ㅋ. 
  
선택한 템플릿 엔진이 JSP 라면 모듈별로 JSP 를 분리해놓고 사용하기 위해 Include 한다. 이때 <span style="color:red"><b>런타임 시점에 Include</b></span> 하는 방법과 <span style="color:red"><b>컴파일 시점에 Include</b></span> 하는 방법을 숙지하기 위해 작성했다.


## 컴파일 시점
디렉티브란 JSP 페이지의 전역 설정, 페이지 포함, 스크립트 언어 설정, import 설정, 범위 설정, 문서 주석 등을 지정하여 JSP 페이지의 동작과 행동을 조정하는 것.
  
JSP에서는 세 가지 종류의 디렉티브가 있다.  
1. <%@ page %>  
  : JSP 페이지의 전역 설정을 지정한다. 
2. <%@ include %>  
  : 다른 JSP 페이지를 현재 페이지에 포함한다. 
3. <%@ taglib %>  
  : 태그 라이브러리를 지정하여 사용할 태그를 선언 한다.

위 내용처럼 최상단에 있을법한 내용이다. 이는 컴파일 시점에 적용된다.

### <%@ include file="파일명.js" %>  
: JSP 에서 지시자(directive) 기반의 문법이다.  

```jsp
<%@ page import ="java.util.List" %>
<%@ page import ="com.blang.bck.service.blangStringUtil" %>
<html>
<head>
<%@ include file="../cmn/includeFile.jsp %>   <!-- 컴파일시점 -->
</head>

```
  
## 런타임 시점  
### <jsp:include page="파일명.jsp" />  
: JSP에서 태그 기반의 문법이다.

```html
<div>
  <!-- header -->
  <c:choose>
  <c:when test="${adminInfo != null}">
    <jsp:include page="../cmn/headerAdm.jsp" />  <!-- 런타임시점 -->
  </c:when>
  <c:otherwise>
    <jsp:include page="../cmn/header.jsp" />     <!-- 런타임시점 -->
  </c:otherwise>
  </c:choose>
</div>

```