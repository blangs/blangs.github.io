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
  * 4.3 버전이전 ==> DefaultHttpClient (아파치에서 제공하며, 생명주기가 끝나기 전까지 딱 한번의 HTTP 요청을 수행할 수 있다는 특징을 가진다. 이는 4.3 버전 이하인 `commons-httpclient-3.1.jar` 으로 사용한 것을 확인했다.)
  * 4.3 버전이후 ==> CloseableHttpClient (아파치에서 제공하며, 커넥션풀을 지원한다. 2번 연속으로 호출해도 커넥션 풀을 통해 처리되어 에러가 발생하지 않는다. 이는 4.3 버전 이상인 `httpclient-4.4.jar`, `httpcore-4.4.jar` 으로 사용한 것을 확인했다.)

- HttpURLConnection
  * 기본 JDK에 포함되어 있음. (jdk1.2부터 내장되어 있으며 java.net 패키지에 있다.)
  * 상대적으로 가벼우며 핵심적인 API만 지원하고 있음.
  * HttpClient 보다 성능이 좋다고 함. (유사 사례 확인 결과 HttpClient에서 Server와 Client연결에 속도 이슈가 있어 HttpURLConnection으로 수정한 사례가 확인됨.) 
  * 서버로부터 전달 받은 Response 결과를 Stream으로 직접 처리해야 하는 등.. 개발 생산성이 떨어지는 요소가 다소 있음.
  
주로 HttpClient, HttpURLConnection 방법이 사용되고
스프링프로젝트라면 RestTemplate 방법도 사용되는듯 하다.
{: .notice--info}


## 구현 
### JSP 화면 구현하기
: 예제에서 공통으로 사용할 JSP 화면 (버튼을 누르면 동작한다.)

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
                    console.log("resultMsg: " + data.resultMsg);
                    console.log("인증서버(192.168.0.10)측에서 정상적인 접근 확인완료 !!");
                }
            }

        });
    });

});
</script>

```

### HttpClient 공통API 구현
: 주소만 넣으면 결과를 얻을 수 있도록 공통 메소드를 구현했다.

```java
/**
 * get으로 타서버 접속하여 결과값 String 으로 받아옴
 * @param containParamURL
 * @param type (01: CloseableHttpClient 방식)
 * @param type (02: HttpURLConnection 방식)
 * @return 
 * @throws ClientProtocolException
 * @throws IOException
 */

public static String connectGET(String containParamURL, String type) throw ClientProtocolException, IOException 
{
  String requestType = type;
  
  if(type.equals("01") {
      BufferReader br = null;
      StringBuilder builder = new StringBuilder();
      CloseableHttpClient httpClient = HttpClients.createDefault();
      HttpGet get = null;
      
      try
      {
          get = new HttpGet(containParamURL);
          
          HttpResponse response = httpClient.excute(get); //요청
          int status = response.getStatusLine().getStatusCode();

          if(status >= 200 && status < 300) 
          {
              HttpEntity entity = response.getEntity();
              br = new BufferedReader(new InputStreamReader(entity.getContent(), "UTF-8"));
              String line = null;

              while((line = br.readLine()) != null) {
                  builder.append(line);
              }
          }

      }
      finally
      {
          if(br != null) br.close();
          if(get != null) get.releaseConnection();
      }
      return builder.toString() //URL요청 응답결과 리턴
  }
  else if(type.equals("02") 
  {  
      // ps) 심심해서 위와 다르게 스트링버퍼로 문자열처리 해보았다. ^^
      BufferReader br = null;
      StringBuffer stringBuffer = new StringBuffer();
      URL url = null;
      HttpURLConnection con = null
      
      try
      {
          url = new URL(containParamURL);
          con = (HttpURLConnection) url.openConnection();  //요청
          con.setRequestMethod("GET");
          con.setRequestProperty("User-Agent", "Mozila/5.0");

          int status = con.getRespnseCode();

          if(status >= 200 && status < 300) 
          {
              br = new BufferedReader(new InputStreamReader(con.getInputStream(), "UTF-8"));
              String line = null;

              while((line = br.readLine()) != null) {
                  stringBuffer.append(line);
              }
          }
          
      }
      finally
      {
          if(br != null) br.close();
          if(con != null) con.disconnect();
      }

      return stringBuffer.toString();
  }
  else System.out.println("요청동작 인자값을 확인해주세요");

}

```

### HttpClient 공통API 사용
: 구현한 공통 메소드를 실제로 사용해본다.

```java@Controller
public class HomeController {
  // 아래 변수는 실무에선 설정 프로퍼티스에 작성.
  public static String AUTH_URL = "192.168.0.10:8081";  //SSO인증서버주소 
  public static String AUTHORIZATION_URL = "http://" + AUTH_URL + "/dym/";

  @RequestMapping(value="/sso/ssoBusiness", method=RequestMethod.POST)
  public @ResponseBody Map<String, Object> ssoBusiness(HttpServletRequest req, Model model)
  {
      System.out.println("HomeController ssoBusiness start >> ");

      //SSO인증서버 통신상태검증 URL
      String CHECK_SERVER_URL = AUTHORIZATION_URL + "openapi/checkerserver";

      String result = "";                           /** 결과 ==> "{"resultCode":"000000","resultMsg":"성공"}"  **/
      result = connectGET(CHECK_SERVER_URL, "01");  /** 01: CloseableHttpClinet 방식으로 요청 **/
      result = connectGET(CHECK_SERVER_URL, "02");  /** 02: HttpURLConnection 방식으로 요청 **/

      /** 긴 JSON 형태의 문자열을 파싱 **/
      JSONParser parser = new JSONParser();
      Object object = pareser.parse(result);
      JSONObject jsonObject = (JSONObject)object;

      String resultCode = (String)jsonObject.get("reslutCode");
      String resultMessage = (String)jsonObject.get("reslutMsg");

      System.out.println("완료");
  }
}

```

## JSON 파싱
### 문자열 처리
: 속도를 더 빠르게 처리한다.

### HttpClient(CloseableHttpClient) 방식

  
**JAVA(클라이언트)**
```java
@Controller
public class HomeController {
  public static String AUTH_URL = "192.168.0.10:8081";  //인증서버주소 
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
        System.out.println("인증서버측으로 HTTP 요청을 수행합니다. ==> " + CHECK_SERVER_URL);
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
        System.out.println("String ==> JSON 변환: " + resultCode: " + resultCode + ", " + "resultMessage: " + resultMessage + "\n");

        HttpSession session = req.getSession();
        session.setAttribute("agentId", agentId");
        session.setAttribute("resultCode", resultCode");
        session.setAttribute("resultMessage", resultMessage");                session.setAttribute("resultMessage", resultMessage");        

        resultJSON.put("agentId", "283");
        resultJSON.put("resultCode", resultCode);
        resultJSON.put("resultMessage", resultMessage);

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
인증서버측으로 HTTP 요청을 수행합니다. ==> http://192.168.0.10:8081/dym/openapi/checkserver

■■■■■ SSO 서버 ■■■■■
SSO서버에 오신것을 환영합니다. 통신상태 검증을 수행합니다.
SSOController checkserver start >> 
요청한 사용자의 결과 HashMap ==> JSON 으로 변환중...
변환완료: {"resultCode":"000000","resultMessage":"성공"}
Success..!

■■■■■■■■■■■■■■■■
GET 응답코드: 200
GET 응답결과: {"resultCode":"000000","resultMessage":"성공"}
String ==> JSON 변환: resultCode: 000000, resultMessage: 성공

```

> 정상적으로 인증서버측에 HTTP 통신 요청하고 
> 결과로 리턴된 전문을 받아왔다.


### HttpURLConnection 방식
: HttpClient 보다 성능이 좋다고 한다. 기본 JDK에 포함되어 있고 java.net 패키지에 있다. 서버로부터 전달받은 Response 결과를 Stream 으로 직접 처리하는 등 생산성이 떨어지는 단점이 있다.
  
**JAVA(클라이언트)**
```java
@Controller
public class HomeController {
  public static String AUTH_URL = "192.168.0.10:8081";  //인증서버주소 
  public static String AUTHORIZATION_URL = "http://" + AUTH_URL + "/dym/";

  @RequestMapping(value="/sso/ssoBusiness", method=RequestMethod.POST)
  public @ResponseBody Map<String, Object> ssoBusiness(HttpServletRequest req, Model model)
  {
    System.out.println("HomeController ssoBusiness start >> ");

    //통신상태검증URL (인증서버측의 검증주소)
    String CHECK_SERVER_URL = AUTHORIZATION_URL + "openapi/checkerserver";

    Map<String, Object> resultJSON = new HashMap<String, object>();

    try {
        
        System.out.println("■ HttpURLConnection 방식을 수행합니다. ");
        /**************************************************************
        * 1. 인증서버 측으로 통신상태검증 요청
        **************************************************************/
        System.out.println("인증서버측으로 HTTP 요청을 수행합니다. ==> " + CHECK_SERVER_URL);
        URL url = URL(CHECK_SERVER_URL);                                   // URL 설정
        HttpURLConnection con = (HttpURLConnection) url.openConnection();  // HTTP 클라이언트생성
        con.setRequestMethod("GET");                                       // 요청메소드
        con.setRequestProperty("User-Agent", "Mozila/5.0");                // 헤더

        int responseCode = con.getRespnseCode();
        System.out.println("GET 응답코드: " + responseCode);

        /**************************************************************
        * 2. 응답결과 GET, SET
        **************************************************************/
        BufferedReader reader = new BufferedReader(new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();
        
        while((inputLine = reader.readLine()) != null) {
          cloResponseBuf.append(inputLine);
        }
        reader.close();    //자원해제
        con.disconnect();  //자원해제

        String result = response.toString();  //응답결과
        System.out.println("GET 응답결과: "+result);      

        /**************************************************************
        * 3. 응답결과 String ==> JSON 파싱
        **************************************************************/
        JSONParser parser = new JSONParser();
        Object object = pareser.parse(result);
        JSONObject jsonObject = (JSONObject)object;

        String resultCode = (String)jsonObject.get("reslutCode");
        String resultMessage = (String)jsonObject.get("reslutMessage");
        System.out.println("String ==> JSON 변환: " + resultCode: " + resultCode + ", " + "resultMessage: " + resultMessage + "\n");

        HttpSession session = req.getSession();
        session.setAttribute("agentId", agentId");
        session.setAttribute("resultCode", resultCode");
        session.setAttribute("resultMessage", resultMessage");                session.setAttribute("resultMessage", resultMessage");        

        resultJSON.put("agentId", "283");
        resultJSON.put("resultCode", resultCode);
        resultJSON.put("resultMessage", resultMessage);
        
        /**************************************************************
        * 4. 다음 STEP 생성
        **************************************************************/
        String sendUrl = AUTHORIZATION_URL + "login.html";
        System.out.println("sendUrl", sendUrl);

        session.setAttribute("resultMessage", resultMessage");                session.setAttribute("sendUrl", sendUrl");        
        resultJSON.put("sendUrl", sendUrl);

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
■ HttpURLConnection 방식을 수행합니다. 
인증서버측으로 HTTP 요청을 수행합니다. ==> http://192.168.0.10:8081/dym/openapi/checkserver

■■■■■ SSO 서버 ■■■■■
SSO서버에 오신것을 환영합니다. 통신상태 검증을 수행합니다.
SSOController checkserver start >> 
요청한 사용자의 결과 HashMap ==> JSON 으로 변환중...
변환완료: {"resultCode":"000000","resultMessage":"성공"}
Success..!

■■■■■■■■■■■■■■■■
GET 응답코드: 200
GET 응답결과: {"resultCode":"000000","resultMessage":"성공"}
String ==> JSON 변환: resultCode: 000000, resultMessage: 성공

```

> 정상적으로 인증서버측에 HTTP 통신 요청하고 결과로 리턴된 전문을 받아왔다.
### 인증서버 공통 컨트롤러
: 예제에서 공통으로 사용할 인증서버측의 컨트롤러

**JAVA(인증서버)**
```java
@Controller
public class SSOController {
  
  // 모든 결과 전문을 @ResponseBody 처리로 리턴
  // 캐릭터셋 UTF-8 으로 설정
  @ResponseBody
  @RequestMapping(value="/openapi/checkserver", method=RequestMethod.GET, produces="text/plan;charset=UTF-8")
  public String checkserver() {
    System.out.println("￦n■■■■■ SSO 서버 ■■■■■");
    System.out.println("SSO서버에 오신것을 환영합니다. 통신상태 검증을 수행합니다.");
    System.out.println("SSOController checkserver start >> ");
    
    Map<String,Object> resultJSON = new HashMap<String,Object>();
    String strJson = "";
    
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
        System.out.println("Success..!￦n");
        System.out.println("■■■■■■■■■■■■■■■■");

    } catch(Exception e) {
        e.printStackTrace();
    } //END TRY

    return strJson;

  } 
}

```
