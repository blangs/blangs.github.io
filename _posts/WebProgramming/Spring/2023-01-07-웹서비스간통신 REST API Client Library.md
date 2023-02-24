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

```java
@Controller
public class HomeController {
  // 아래 변수는 실무에선 설정 프로퍼티스에 작성.
  public static String AUTH_URL = "192.168.0.10:8081";  //SSO인증서버주소 
  public static String AUTHORIZATION_URL = "http://" + AUTH_URL + "/dym/";

  @RequestMapping(value="/sso/ssoBusiness", method=RequestMethod.POST)
  public @ResponseBody Map<String, Object> ssoBusiness(HttpServletRequest req, Model model)
  {
      System.out.println("HomeController ssoBusiness start >> ");

      // SSO인증서버 통신상태검증 URL
      String CHECK_SERVER_URL = AUTHORIZATION_URL + "openapi/checkerserver";

      // 1. HttpClient 공통API 사용
      String result = "";                           /** 결과 ==> "{"resultCode":"000000","resultMsg":"성공"}"  **/
      result = connectGET(CHECK_SERVER_URL, "01");  /** 01: CloseableHttpClinet 방식으로 요청 **/
      result = connectGET(CHECK_SERVER_URL, "02");  /** 02: HttpURLConnection 방식으로 요청 **/

      // 2. 응답받은 긴 JSON 형태의 문자열을 파싱
      JSONParser parser = new JSONParser();
      Object object = pareser.parse(result);
      JSONObject jsonObject = (JSONObject)object;

      String resultCode = (String)jsonObject.get("reslutCode");
      String resultMessage = (String)jsonObject.get("reslutMsg");

      System.out.println("완료");
  }
}

```
  
### 정리

> ***HttpClient 공통API 사용하여 다른 서버측과 통신을 성공했다!. ***


## JSON 파싱
### JSON 객체를 HashMap 변환 공통API 구
: JSON 객체만 넣으면 MAP 객체를 얻을 수 있도록 공통 메소드를 구현했다.

```java
/**
 * JSON 객체를 받아서 HashMap 으로 변환하는 메소드
 * @param object
 * @return 
 * @throws ClientProtocolException
 * @throws IOException
 */
public static Map<String, Object> jsonToMap(JSONObject jsonObject) throws JSONException 
{
    Map<String, Object> retMap = new HashMap<String, Object>();
    
    if(object != null) {
        retMap = toMap(object);
    }
    return retMap;
}


/**
 * JSON 객체를 받아서 HashMap 으로 변환하는 메소드
 * @param jsonObject
 * @return 
 * @throws ClientProtocolException
 * @throws IOException
 */
public static Map<String, Object> tooMap(JSONObject object) throws JSONException 
{
    Map<String, Object> map = new HashMap<String, Object>();

    Set<String> keys = jsonObject.keySet();
    Iterator<String> keysItr = keys.iterator();
    
    while(keysItr.hasNext()){
        String key = keysItr.next();
        Object value = jsonObject.get(key);
        System.out.println(key + " : " + value);

        if(value instanceof JSONArray) {
            value = toList((JSONArray) value); 
        }
        else if(value instanceof JSONObject) {
            value = toMap((JSONObject) value); 
        }
        map.put(key, value); //생성
    }
    return map;
}

/**
 * JSON 객체안에 sjon 배열이 있는 경우 처리하는 메소드
 * @param array
 * @return 
 * @throws ClientProtocolException
 * @throws IOException
 */
public static Map<String, Object> tooMap(JSONArray array) throws JSONException 
{
    List<Object> list = new ArrayList<Object>();

    for(int i=0; i<array.size(); i++) {
        Object value = array.get(i);  
        
        if(value instanceof JSONArray) {
            value = toList((JSONArray) value); 
        }
        else if(value instanceof JSONObject) {
            value = toMap((JSONObject) value); 
        }
        list.add(value);
    }
    return list;
}

```

### JSON 객체를 HashMap 변환 공통API 사용
: 구현한 공통 메소드를 실제로 사용해본다.

```java
@Controller
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

      //변환      
      Map<String, Object> resMap = jsonToMap(jsonObject);

      String resultCode = (String)resMap.get("reslutCode");
      String resultMessage = (String)resMap.get("reslutMsg");

      System.out.println("완료");
  }
}

```

### 정리

> ***JSON 을 유연한 MAP 객체로 변환하는 공통 API를 완성하였다.!***
