---
title:  "웹서비스간통신 REST API Client Library"
excerpt: "웹서비스간통신 REST API Client Library"

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
: 참고블로그 [https://digitalbourgeois.tistory.com/m/56](https://digitalbourgeois.tistory.com/m/56)  

- OKHttp
  * Square의 오픈소스 프로젝트 
  * OKHttp는 통신을 동기화로 할지 비동기로 처리 할지 선택하여 사용할 수 있음.
  * 단 스레드를 넘나들 수 없음. (스레드간에 데이터를 공유하기 위해서는 Handler를 활용해야함)

- Retrofit
  * Square의 오픈소스 프로젝트
  * 어노테이션을 사용하여 개발할 수 있으므로 개발의 생산성 및 가독성이 올라감.
  * 어노테이션을 사용하여 코드를 생성하기 때문에 인터페이스를 적용하여 주로 개발함.

- RestTemplate
  * Spring3부터 지원함.
  * Boilerplate code를 줄여줌.(Spring의 Template이 제공하는 장점 중 하나)

- HttpClient
  * Apache에서 제공
  * HttpClient는 3버전과 4버전이 있으며 4버전부터는 HttpComponents로 불리고 있음.(단, 3버전과 4버전은 둘간 직접적인 호환은 되지 않음)
  * HttpComponents(4버전) 부터는 Thread에 안정적인 기능들을 많이 제공함.
  * 상대적으로 무거움
  * HttpURLConnection 대비 다양한 API를 지원함.

- HttpURLConnection
  * 기본 JDK에 포함되어 있음. (jdk1.2부터 내장되어 있으며 java.net 패키지에 있다.)
  * 상대적으로 가벼우며 핵심적인 API만 지원하고 있음.
  * HttpClient 보다 성능이 좋다고 함. (유사 사례 확인 결과 HttpClient에서 Server와 Client연결에 속도 이슈가 있어 HttpURLConnection으로 수정한 사례가 확인됨.) 
  * 서버로부터 전달 받은 Response 결과를 Stream으로 직접 처리해야 하는 등.. 개발 생산성이 떨어지는 요소가 다소 있음.
  
주로 HttpClient, HttpURLConnection 방법이 사용되고
스프링프로젝트라면 RestTemplate 방법도 사용되는듯 하다.
{: .notice--info}


## 구현 
### 클라이언트 공통 화면
: 예제에서 공통으로 사용할 JSP 화면

**JSP(클라이언트)**
```jsp
<%@ page language="java" contentType="text/html; charset=EUC-KR" pageEncoding="EUC-KR"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<script src="<c:url value="./resources/js/jquery-3.1.1.js" />"></script>
</head>
<body>
  Hello World..!

  <!-- 인증서버 로그인 버튼 -->
  <button id="ssoLogin">인증서 로그인</button>
</body>
<script>
$(document).ready(function(){
  
    $("#ssoLogin").click(function(){
        $.ajax({
            method: "POST",
            url: "sso/ssoBusiness",
            dataType: "JSON"
            error: function(jqXHR, testStatus, errorThrown){
                alert("error");
            },
            success: function(data) {
                if(data.resultCode == "000000") {
                    console.log("resultMessage: " + data.resultMessage);
                    console.log("agentId: " + data.agentId);
                    console.log("인증서버(192.168.0.10)측에서 정상적인 접근 확인완료 !!");
                }
            }

        });
    });

});
</script>

```

### HttpClient(DefaultHttpClient) 방식
: 아파치에서 제공하며, 생명주기가 끝나기 전까지 딱 한번의 HTTP 요청을 수행할 수 있다는 특징을 가진다. 이는 4.3 버전 이하인 `commons-httpclient-3.1.jar` 으로 사용한 것을 확인했다.

```
버전이 낮아 비권장되므로 내용은 생략함.

```

### HttpClient(CloseableHttpClient) 방식
: 아파치에서 제공하며, 커넥션풀을 지원한다. 2번 연속으로 호출해도 커넥션 풀을 통해 처리되어 에러가 발생하지 않는다. 이는 4.3 버전 이상인 `httpclient-4.4.jar`, `httpcore-4.4.jar` 으로 사용한 것을 확인했다.
  
**JAVA(클라이언트)**
```java
@Controller
public class HomeController {
  public static String AUTH_URL = "192.168.0.10";  //인증서버주소
  public static String AUTHORIZATION_URL = "http://" + AUTH_URL + "/dym/";

  @RequestMapping(value="/sso/ssoBusiness", method=RequestMethod.POST)
  public @ResponseBody Map<String, Object> ssoBusiness(HttpServletRequest req, Model model)
  {
    System.out.println("HomeController ssoBusiness start >> ");

    //통신상태검증URL (인증서버측의 검증주소)
    String CHECK_SERVER_URL = AUTHORIZATION_URL + "openapi/checkerserver";

    Map<String, Object> resultJSON = new HashMap<String, object>();
    CloseableHttpClient cloHttpClient = null;

    try {
        
        System.out.println("■ CloseableHttpClient 방식을 수행합니다. ");
        //HttpClient test = new DefaultHttpClient(); /* 4.3버전 이후 비권장 처리된 메소드 */
        /**************************************************************
        * 1. 인증서버 측으로 통신상태검증 요청
        **************************************************************/
        cloHttpClient = HttpClients.createDefault();      // HTTP클라이언트 생성
        HttpGet httpGet = new HttpGet(CHECK_SERVER_URL);  // 요청메소드, URL 설정
        httpGet.addHeader("User-Agent", "Mozila/5.0");    // 헤더
        
        CloseableHttpResponse cloResponse = cloHttpClient.execute(httpGet);  // URL요청
        System.out.println("GET 응답코드: " + cloResponse.getStatusLine().getStatusCode());

        /**************************************************************
        * 2. 응답결과 GET, SET
        **************************************************************/
        //CASE1. 응답을 String 타입으로 받을 경우 (간단하지만 속도느림)
        // String json = EntityUtils.toString(cloResponse.getEntity(), "UTF-8");
        // System.out.println("json: "+json);

        //CASE2. 응답을 InputStream 타입으로 받고 처리하는 방법 (속도빠름)
        // .getEntity(): 컨텐츠내용을 얻고
        // .getContent(): 인풋스트림으로 리턴
        // 인증서버측과 인코딩을 동일하게 맞추어야 한글이 안깨짐을 명심
        BufferedReader reader = new BufferedReader(new InputStreamReader(cloResponse.getEntity().getContent(), "UTF-8"));
        String inputLine;
        StringBuffer cloResponseBuf = new StringBuffer();
        
        while((inputLine = reader.readLine()) != null) {
          cloResponseBuf.append(inputLine);
        }
        reader.close();               //자원해제
        httpGet.releaseConnection();  //자원해제
        System.out.println("GET 응답결과: "+result);      

        /**************************************************************
        * 3. 응답결과 String ==> JSON 파싱
        **************************************************************/
        JSONParser parser = new JSONParser();
        Object object = pareser.parse(result);
        JSONObject jsonObject = (JSONObject)object;

        String resultCode = (String)jsonObject.get("reslutCode");
        String resultMessage = (String)jsonObject.get("reslutMessage");
        System.out.println("String ==> JSON 변환 ==> 키값GET")   

    }catch(Exception e) {
        e.printStackTrace();

    } finally {
        if(cloHttpCleinet != null) {
          try{
            cloHttpClient.close();  //자원해제
          }catch (Exception e) {
            e.printStackTrace();
          }
        } //END IF

    } //END TRY
  } //END METHOD

} 

```
  
**결과**
```
HomeController ssoBusiness start >> 
■ CloseableHttpClient 방식을 수행합니다. 

■■■■■ SSO 서버 ■■■■■
요청한 사용자의 결과 HashMap ==> JSON 으로 변환중...
변환완료: {"resultCode":"000000","resultMessage":"성공"}
Success..!
■■■■■■■■■■■■■■■■

```

### 인증서버 공통 컨트롤러
: 예제에서 공통으로 사용할 인증서버측의 컨트롤러

**JAVA(인증서버)**
```java
@Controller
public class SSOController {
  
  // 모든 결과 전문을 @ResponseBody 처리로 리턴
  // 캐릭터셋 UTF-8 으로 설정
  @ResponseBody
  @RequestMapping(value="/openapi/checkserver", method=RequestMethod.GET, produces="text/plan;charset="UTF-8")
  public String checkserver() {
    System.out.println("SSOController checkserver start >> ");
    
    Map<String,Object> resultJSON = new HashMap<String,Object>();
    String strJson = "";
    System.out.println("■■■■■ SSO 서버 ■■■■■");
    System.out.println("SSO서버에 오신것을 환영합니다. 통신상태 검증을 수행합니다.");
    
    try {
        /**************************************************************
        * 검증로직 (실제로는 SSO 서버 담당자측에서 검증로직 작성요망)
        **************************************************************/
        resultJSON.put("resultCode", "000000");
        resultJSON.put("resultMessage", "성공");

        /**************************************************************
        * MAP 전문을 JSON 으로 변환하는 API 수행
        **************************************************************/
        ObjectMapper objMapper = new ObjectMapper();  //jackson-core-2.9.9.jar, jackson-databind-2.9.9.1.jar 사용

        strJson = objMapper.writeValueAsString(resultJSON);  //MAP to JSON
        System.out.println("요청한 사용자의 결과 HashMap ==> JSON 으로 변환중...");
        System.out.println("변환완료: " + strJson");
        System.out.println("Success..!");
        System.out.println("■■■■■■■■■■■■■■■■");
    } catch(Exception e) {
        e.printStackTrace();
    } //END TRY

    return strJson;

  } 
}

```
