---
title: "weblogic 서버간 Http통신"
excerpt: "weblogic 서버간 Http통신 입니다."

categories:
  - java
tags:
  - [java]

toc: true
toc_sticky: true

last_modified_at: 2024-07-11T13:00:00-05:00:00
---


## 개요 
```java
String uid = SOULTION_SERIVCE.getUserId(); //C000002

//GET 요청
URL url = new Url("http://localhost:9510/bck/app/getSolutionSession?uid="+uid+"&sid="+request.getSession.getId());
con = (httpConnection) url.openConnection();
con.setRequestMethod("GET");
con.setRequestProperty("User-Agent", "Mozila/5.0");

//GET 요청 실패 (ERROR)
int status = con.getResponseCode(); 

```
  
> ❗<span style='color:green'>***같은서버 내부의 서로다른 웹어플리케이션간 통신(GET요청)이 작동하지 않았다.***</span>  
> 💡 <span style='color:blue'>**일반적으로 사용하는 방법임에도 미동작...**</span>  



## 원인
> ❗<span style='color:green'>***WAS 제품마다 URL 커넥션방법이 조금 다른것을 확인***</span>  
> 💡 <span style='color:blue'>**openConnection()을 할 때 weblogic이 SOAPHttpsURLConnection을 리턴해버리기 때문이다.**</span>  



## 해결방안
```java
String uid = SOULTION_SERIVCE.getUserId(); //C000002

//GET 요청
URL url = new Url("https"
                , "localhost"
                , 9510
                , "https://localhost:9510/bck/app/getSolutionSession?uid=" + uid + "&sid=" + request.getSession.getId()
                , new sun.net.www.protocol.https.Handler());

con = (httpConnection) url.openConnection();
con.setRequestMethod("GET");
con.setRequestProperty("User-Agent", "Mozila/5.0");

//GET 요청 성공
int status = con.getResponseCode();

```

> ❗<span style='color:green'>***기대하는 리턴OBJ(HttpsURLConnection)를 명시하면 해결.***</span>  
> 💡 <span style='color:blue'>**un.net.www.protocol.https.Handler 핸들러를 삽입해주면webloginc이 openConnection()을 할 때 HttpsURLConnection을 리턴하도록 강제**</span>  


***import 정리***  
- `URL 객체: java.net.URL`  
- `HttpsURLConnection 객체: javax.net.ssl.HttpsURLConnection`  
- `getResponseCode() 메소드: java.net.HttpURLConnection.getResponseCode()`  
{: .notice--info}

