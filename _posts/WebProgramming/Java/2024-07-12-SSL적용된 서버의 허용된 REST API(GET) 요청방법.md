---
title: "SSL적용된 서버의 허용된 REST API(GET) 요청방법"
excerpt: "SSL적용된 서버의 허용된 REST API(GET) 요청방법 입니다."

categories:
  - java
tags:
  - [java]

toc: true
toc_sticky: true

last_modified_at: 2024-07-12T13:00:00-05:00:00
---


## 개요 
```bash
# [2024-07-12 16:27:28,171: [ACTIVE] ExecuteThread: '19' for queue: 'weblogic.kernel.Default (self-tuning)'] Error SolutionBridgeRestController : [/logon] Error: 
# javax.net.ssl.SSLHandshakeException: General SSLEngine problem

```
  
> ❗<span style='color:green'>***같은서버 내부의 서로다른 웹어플리케이션간 통신(GET요청)이 작동하지 않았다.***</span>  
> 💡 <span style='color:blue'>**일반적으로 사용하는 방법임에도 미동작...**</span>  



## 원인
> ❗<span style='color:green'>***오류 발생 상황***</span>  
> 💡 <span style='color:blue'>**SSL 인증서가 신뢰하는 기관 인증서가 없거나 SSL/TLS암호화 버전이 맞지 않는 경우 발생**</span>  
> 💡 <span style='color:blue'>**연결하려는 서버의 인증서가 신뢰하는 인증기관 인증서 목록(keystore)에 없을 경우**</span>  
> 💡 <span style='color:blue'>**서버/클라이언트 사이에 사용하려는 TLS 버전이 맞지 않을 때(TLS 1.0 만 지원하는 서버에 1.2로 hand shaking 요청등)**</span>  
> 💡 <span style='color:blue'>**사설 인증서일 경우.**</span>  
> 💡 <span style='color:blue'>**TLS 통신에 사용하려는 cipher suite 가 오래되거나 지원하지 않음. (JDK 1.8 부터는 sha1 지원 안되고 sha256 이상을 사용해야 한다고 한다.)**</span>  



## 해결방안
### 방법1: 의미없는 TrustManager 오버버라이딩으로 SSL통과(우회) 하는 방법
```java
public void disableSSL() throw Exception { 
    TrustManager[] trustAllCerts = new TrustManager[] { new X509TrustManager() {
      public java.security.cert.X509Certificate[] getAcceptedIssuers() {
        return null;
      }

      public void checkClientTrusted(X509Certificate[] certs, String authType){
      }

      public void checkServerTrusted(X509Certificate[] certs, String authType) {
      }
    } };

    SSLContext sc = SSLContext.getInstance("SSL");
    sc.init(null, trustAllCerts, new java.security.SecureRandom());
}
```

> ❗<span style='color:green'>***GET요청 통신전에 적용하면 된다.***</span>  


### 방법2: 위 방법의 심화
```java
public void disableSSL() throw Exception { 
    TrustManager[] trustAllCerts = new TrustManager[] { new X509TrustManager() {
      public java.security.cert.X509Certificate[] getAcceptedIssuers() {
        return null;
      }

      public void checkClientTrusted(X509Certificate[] certs, String authType){
      }

      public void checkServerTrusted(X509Certificate[] certs, String authType) {
      }
    } };

    SSLContext sc = SSLContext.getInstance("TLS1.2");
    sc.init(null, trustAllCerts, new java.security.SecureRandom());

    HttpsURLConnection.setDefaultSSLSocketFactory(sslContext.getSocketFactory());

    // 모든 호스트명을 신뢰하도록 설정(HostnameVerifier)
    HostnameVerifier allHostsValid = new HostnameVerifier() {
        public boolean verify(String hostname, SSLSession session) {
          return true;
        }
    };

    //Default SSLContext와 HostnameVerifier 설정
    HttpsURLConnection.setDefaultSSLSocketFactory(sslContext.getSocketFactory());
    HttpsURLConnection.setDefaultHostnameVerifier(allHostsValid);
}


```
  
***위 코드를 Http GET요청 이전에 실행하면된다***  
{: .notice--info}  



## 전체 소스코드
```java
String uid = SOULTION_SERIVCE.getUserId(); //C000002

/********************************
* SSL 통과처리 실행
********************************/
disableSSL();


/********************************
* GET 요청
********************************/
//URL url = new Url("https", "localhost", 9510, "https://localhost:9510/bck/app/getSolutionSession?uid=" + uid + "&sid=" + request.getSession.getId(), new sun.net.www.protocol.https.Handler());
URL url = new Url("http://localhost:9510/bck/app/getSolutionSession?uid="+uid+"&sid="+request.getSession.getId());

con = (httpConnection) url.openConnection();
con.setRequestMethod("GET");
con.setRequestProperty("User-Agent", "Mozila/5.0");


/********************************
* GET 요청 성공
********************************/
int status = con.getResponseCode();

if(status >= 200 && status < 300) 
{
  br = new BufferReader(new InputStreamReader(con.InputStream()));
  String line = null;

  while((line = br.readLin( != null))) {
    stringBuffer.append(line);
  }

  String resultString = stringBuffer.toString().trim();

  if(resultString.equalse("success__02")) {
    //통신응답 값에 따른 로직.
  } else {
    //통신응답 값에 따른 로직.
  }
}

```