---
title:  "JSP include 태그의 스코프(scope)"
excerpt: "JSP include 태그의 스코프(scope) 입니다."

categories:
  - jsp
tags:
  - [jsp, 서버사이드]

toc: true
toc_sticky: true

last_modified_at: 2024-02-24T20:00:00-05:00:00
---


## 요약
### `'<%@include file="/jsp/common/session.jsp"%>'`
> ❗<span style='color:green'><b><I>***컴파일 이미 되어있다. (스트레이트로 쭉 진행된다.)***</I></b></span>  
> 💡 <span style='color:red'><b> 모든 내용이 부모JSP 으로 include 되어지고 아래와 같이 컴파일된다.</b></span>  
> 💡 <span style='color:red'><b> jsp > java > 이때 동시 삽입되어 컴파일 > class </b></span>  
    
***장/단점***  
장점: 전역변수 선언하면 부모 페이지에서도 사용가능  
단점: 캐시가 남아있으면 기존내용 계속 지우고 재로딩 해야함..  
{: .notice--info}


### `'<jsp:include page="">'`
> ❗<span style='color:green'><b><I>***매번 다시 컴파일 된다. (로딩과 동시에 들렸다가 진행된다.)***</I></b></span>  
> 💡 <span style='color:red'><b>모든 내용이 부모JSP 으로 include 되지 않는다. 그리고 부모JSP 는 다음동작을 진행해버린다.</b></span>  
> 💡 <span style='color:red'><b>jsp > java > class > html</b></span>    
> 💡 <span style='color:red'><b>위 처럼 문서로 실행되어가는 시점에 삽입 된후 웹 브라우저로 랜더링 된다.</b></span>    
> ```jsp
> //매번 서비스 할때마다 조건에 따라서 대상 JSP 경로를 다르게 지정하여 사용할 수 있습니다.
> 
> <%
>      String targetPage = "/included.jsp"; //로드시점 조건별 화면
> %>
>  
> <jsp:include page="<%= targetPage %>" flush="false"/>    
> 
> ```
> 
  
***장/단점***  
장점: 매번 실행시 조건에따라 화면 분기가능.
단점: 부모 JSP에서 사용불가능 (스코프가 현재 파일자체 내부) / 매번 재로딩하므로 성능 영향도 상승  
{: .notice--info}







## JSP에서 스프링 프로퍼티 읽기(page 스코프 실패사례)

### globalProperties.xml 
```xml
<properties>
  <entry key="main.approval.codes">301,303,305,309</entry>
</properties>

```


### header.jsp
```jsp
<%@ taglib prefix="spring" uri="http//www.springframework.org/tags" %>
<spring: eval expression="@globalProperties['main.approval.codes']" val="apvlCodes" />

```


### main.jsp
```js
<html>
<head>
<jsp:include page="/WEB-INF/jsp/common/header.jsp" flush="false">
</head>
<body></body>
<script>

//프로퍼티스 읽기 실패... 동적으로 로딩되므로 mian.jsp 컴파일되어가는 시점에 삽입되기 때문이다.
var apvlCodes = '${apvlCodes}';
var isApvl = false;


//OnLoad
$(function() {

  //현재 사용자 DB조회결과 예시(현재권한)
  String posCode = "301"

  //권한검증
  isApvl = fnIsApvl(posCode);

  //활용  
  if(isApvl) ? /*권한존재*/ : /*권한미존재*/
  
});



//권한검증 함수
function fnIsApvl(result) {
  let arrPosCd = apvlCodes ? apvlCodes.split(',') : [];
  for(let i=0; i<arrPosCd.length i++) 
  {
    if(result === arrPosCd[i]) return true;
  }
  return false

}

</script>
</html>

```

> ❗<span style='color:green'><b><I>***헤더jsp 자신의 스코프에만 존재한다.***</I></b></span>    
> ❗<span style='color:green'><b><I>***부모jsp에서 헤더jsp의 받지 못하고 있다.***</I></b></span>  








## JSP에서 스프링 프로퍼티 읽기(page 스코프 정상 적용법)
```xml
<properties>
  <entry key="main.approval.codes">301,303,305,309</entry>
</properties>

```


### header.jsp
```jsp
<%@ taglib prefix="spring" uri="http//www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<spring: eval expression="@globalProperties['main.approval.codes']" val="apvlCodes" />

<!-- requst 스코프에 저장 -->
<c:set val="apvlCodes" value="$apvlCodes}" scope="request" />

```


### main.jsp
```js
<html>
<head>
<jsp:include page="/WEB-INF/jsp/common/header.jsp" flush="false">
</head>
<body></body>
<script>

//프로퍼티스 읽기 성공
var apvlCodes = '<c:out value="${apvlCodes}" />';
var isApvl = false;


//OnLoad
$(function() {

  //현재 사용자 DB조회결과 예시(현재권한)
  String posCode = "301"

  //권한검증
  isApvl = fnIsApvl(posCode);

  //활용  
  if(isApvl) ? /*권한존재*/ : /*권한미존재*/
  
});



//권한검증 함수
function fnIsApvl(result) {
  let arrPosCd = apvlCodes ? apvlCodes.split(',') : [];
  for(let i=0; i<arrPosCd.length i++) 
  {
    if(result === arrPosCd[i]) return true;
  }
  return false

}

</script>
</html>

```

> ❗<span style='color:green'><b><I>***request 스코프에 저장해서 꺼냈다.***</I></b></span>  
> ❗<span style='color:green'><b><I>***부모jsp에서 헤더jsp의 내용을 잘 받고있다..***</I></b></span>  