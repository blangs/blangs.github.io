---
title:  "공통API JSON 유틸리티(gson구현)"
excerpt: "공통API JSON 유틸리티(gson구현) 입니다."

categories:
  - java
tags:
  - [java]

toc: true
toc_sticky: true

last_modified_at: 2023-08-16T09:19:00-23:00:00
---

## API 요약
### JAVA 에서 핸들링
> ❗<span style='color:green'><b><I>매우 유연한 컬렉션 처리가 가능</I></b></span>  
> 💡 DTO 활용시 엄청 간단해짐


## HomeController.java
```java
import 패키지.util.HttpUtil;

```

### getYarnResource()
```java
private static final YARN_RESOURCE_DOMAIN1 = "http://주소1:포트";
private static final YARN_RESOURCE_DOMAIN2 = "http://주소2:포트";
private static final YARN_RESOURCE_INFO = "/ws/v1/cluster/info";
private static final YARN_RESOURCE_METRICS = "/ws/v1/cluster/metrics";
private static final YARN_RESOURCE_APP_RINNING = "/ws/v1/cluster/apps?states=RUNNING";
private static final YARN_RESOURCE_APP_ACCEPTED = "/ws/v1/cluster/apps?states=ACCEPTED";

/*********************
 * GET Yarn Resource Manager REST API
 * 응답된 JSON 결과를 파싱하고 프론트로 넘긴다.
 * 메인포탈 스레드 관리 위해 한번에 요청하고 가공한다.
 * 
 * @param 
 * @return List<Map<String, Object>>
 * @throws
 *********************/
@ResponseBody
@RequestMapping(value="/getYarnResource",method = RequestMethod.POST)
public List<Map<String, Object>> getYarnResourceData() throws Exception{
	
  logger.info("HomeController getYarnResource start  >>");
  
  List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
  Map<String, Object> resultMap = new Map<String, Object>();
    
  try {
    String YARN_RESOURCE_ACTIVE_DOMAIN = "";
    String activeServer = "";
    String responseData = "";
    String responseData1 = "";
    String responseData2 = "";

    String ipAddress = InetAddress.getLocalHost().getHostAddress();
    

    if(!ipAddress.contains("10.210")) //prod
    {
      responseData1 = HttpUtil.connectCaptureGET(YARN_RESOURCE_DOMAIN1+YARN_RESOURCE_INFO);
      responseData2 = HttpUtil.connectCaptureGET(YARN_RESOURCE_DOMAIN2+YARN_RESOURCE_INFO);
      if(responseData1 != null && responseData1.contains("ACTIVE")) activeServer = YARN_RESOURCE_DOMAIN1;
      if(responseData2 != null && responseData1.contains("ACTIVE")) activeServer = YARN_RESOURCE_DOMAIN2;
    }
    else //dev
    {
      responseData1 = HttpUtil.connectGET(YARN_RESOURCE_DOMAIN1+YARN_RESOURCE_INFO);
      if(responseData1 != null && responseData1.contains("ACTIVE")) activeServer = YARN_RESOURCE_DOMAIN1;
    }
    YARN_RESOURCE_ACTIVE_DOMAIN = activeServer;

    // Yarn Resource Manager REST API (Response JSON ROOT KEY)
    final Strig[] yarnResource = {"clusterMetrics", "running", "accepted"};

    for(int i=0; i<yarnResource.length; i++) {

      switch (yarnResource[i]) {
        case "clusterMetrics": 
          responseData = HttpUtil.connectGET(YARN_RESOURCE_ACTIVE_DOMAIN + YARN_RESOURCE_METRICS);
          resultMap = yarnResourceService.getMetricsMap(responseData);
          break;

        case "running": 
          responseData = HttpUtil.connectGET(YARN_RESOURCE_ACTIVE_DOMAIN + YARN_RESOURCE_APP_RINNING);
          resultMap = yarnResourceService.getRunningMap(responseData);
          break;

        case "accepted": 
          responseData = HttpUtil.connectGET(YARN_RESOURCE_ACTIVE_DOMAIN + YARN_RESOURCE_APP_ACCEPTED);
          resultMap = yarnResourceService.getAceeptedMap(responseData);
          break;
      }
      System.out.println((yarnResource[i] + " => GET: " + responseData);

      // input
      resultList.add(resultMap);
    }
    
  } catch (Exception e) {
    e.printStackTrace();		
  } 
    
  return resultList;
}

```
  
> ❗<span style='color:green'><b><I>과정</I></b></span>  
> 💡 JSON 문자열을 받아서 가공 후 리턴한다.  
> 💡 - 로드밸런싱 검증  
> 💡 - 액티브 서버측을 판단 후 서비스 로직 호출


## HttpUtil.java
### 참고 포스팅
```
자바API HTTP 핸들링 유틸
```



## YarnResourceService.java
```java
import java.lang.reflext.Type;
import com.google.gson.Gson;
import 패키지.vo.YarnResourceAcceptedDTO;
import 패키지.vo.YarnResourceMetricsDTO;
import 패키지.vo.YarnResourceRunningDTO;

```

### getMetricsMap()
```java
public Map<String, Object> getMetricsMap(String params) {
  
  Map<String, Object> resultMap = new Map<String, Object>();
  List<Map<String, Object>> inputList = new ArrayList<Map<String, Object>>();
  
  Gson gson = new Gson();
  java.lang.reflect.Type gsonType = (Type) new com.google.gson.reflect.TypeToken<Map<String, Object>>(){}.getType();

  YarnResourceMetricsDTO clusterMetricsDTO = gson.fromJson(params, YarnResourceMetricsDTO.class);
  YarnResourceMetricsDTO.ClusterMetricsData metricsData = clusterMetricsDTO.getClusterMetrics();
	
  if(metricsData != null) {
    inputList.add(new Gson().fromJson(gson.toJson(metricsData), gsonType))
    resultMap.put("metrics", inputList);
  }
  return resultMap;
}

```


### getRunningMap()
```java
public Map<String, Object> getRunningMap(String params) {
  
  Map<String, Object> resultMap = new Map<String, Object>();
  List<Map<String, Object>> inputList = new ArrayList<Map<String, Object>>();
  
  Gson gson = new Gson();
  java.lang.reflect.Type gsonType = (Type) new com.google.gson.reflect.TypeToken<Map<String, Object>>(){}.getType();

  Date date;
  SimpleDateFormat formatter = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");


  YarnResourceRunningDTO runningDTO = gson.fromJson(params, YarnResourceRunningDTO.class);
  YarnResourceRunningDTO.Apps apps = runningDTO.getApps();
  if(apps != null) {

    List<YarnResourceRunningDTO.App> appList = apps.getApp();

    if(appList != null && !appList.isEmpty()) {
      
      int idx = 0;
      for(YarnResourceRunningDTO.App app : appList) {
        
        inputList.add(new Gson().fromJson(gson.toJson(app), gsonType)); // 리스트맵 간단하게 완성!

        // 완성된 리스트맵에서 특정 키를 수정하고 싶은 부분 진행
        // user 이라는 키값을 수정
        String strUser = inputList.get(idx).get("user").toString();
        if (strUser.equals("hive")) {
          strUser = app.getApplicationTags().subString(app.getApplicationTags().indexOf("=") + 1); 
          inputList.get(idx).put("user", strUser);
        }

        // startedTime 이라는 키값을 수정
        String strResult = "";
        long lTime = 0, lMTime = 0, lSTime = 0;
        
        lTime = appList.get(idx).getStartedTime();
        date = new Date(lTime);
        strResult = formatter.format(date);
        inputList.get(idx).put("startedTime", strResult);

        // launchTime 이라는 키값을 수정
        lTime = appList.get(idx).getLaunchTime();
        date = new Date(lTime);
        strResult = formatter.format(date);
        inputList.get(idx).put("launchTime", strResult);

        // elapsedTime 이라는 키값을 수정 (경과시관 관련한 유닉스 시간을 분초로 변환)
        lTime = appList.get(idx).getElapsedTime();
        lSTime = lTime / 1000;
        lMTime = lSTime / 60;
        lSTime %= 60;
        strResult = lMTime + "분 " + lSTime + "초" + "경과";
        inputList.get(idx).put("launchTime", strResult);

        idx++;
      }
      resultMap.put("running", inputList);
    }
  }
  return resultMap;
}

```



### getAceeptedMap()
```java
public Map<String, Object> getAceeptedMap(String params) {
  
  Map<String, Object> resultMap = new Map<String, Object>();
  List<Map<String, Object>> inputList = new ArrayList<Map<String, Object>>();
  
  Gson gson = new Gson();
  java.lang.reflect.Type gsonType = (Type) new com.google.gson.reflect.TypeToken<Map<String, Object>>(){}.getType();

  Date date;
  SimpleDateFormat formatter = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");


  YarnResourceAcceptedDTO acceptedDTO = gson.fromJson(params, YarnResourceAcceptedDTO.class);
  YarnResourceAcceptedDTO.Apps apps = acceptedDTO.getApps();
  if(apps != null) {

    List<YarnResourceAcceptedDTO.App> appList = apps.getApp();

    if(appList != null && !appList.isEmpty()) {
      
      int idx = 0;
      for(YarnResourceAcceptedDTO.App app : appList) {
        
        inputList.add(new Gson().fromJson(gson.toJson(app), gsonType)); // 리스트맵 간단하게 완성!

        // 완성된 리스트맵에서 특정 키를 수정하고 싶은 부분 진행
        // startedTime 이라는 키값을 수정
        String strResult = "";
        long lTime = 0;
        
        lTime = appList.get(idx).getStartedTime();
        date = new Date(lTime);
        strResult = formatter.format(date);
        inputList.get(idx).put("startedTime", strResult);

        idx++;
      }
      resultMap.put("accepted", inputList);
    }
  }
  return resultMap;
}

```



## DTO
### YarnResourceMetricsDTO.java
```java
public class YarnResourceMetricsDTO {
  private ClusterMetricsData clusterMetrics;

  public ClusterMetricsData getClusterMetrics() {
    return clusterMetrics;
  }

  public static class ClusterMetricsData {
    private int appsRunning;
    private int appsPending;
    private long allocatedVirtualCores;
    private long availableVirtualCores;
    private long totalVirtualCores;
    private long allocatedMB;
    private long availableMB;
    private long totalMB;
    public int getAppsRunning { return appsRunning; }
    public int getAppsPending { return appsPending; }
    public long getAllocatedVirtualCores { return allocatedVirtualCores; }
    public long getAvailableVirtualCores { return availableVirtualCores; }
    public long getTotalVirtualCores { return totalVirtualCores; }
    public long getAllocatedMB { return allocatedMB; }
    public long getAvailableMB { return availableMB; }
    public long getTotalMB { return totalMB; }    
  }
}

```


### YarnResourceRunningDTO.java
```java
public class YarnResourceRunningDTO {
  private Apps apps;

  public Apps getApps() {
    return apps;
  }

  public static class Apps {
    private List<App> app;

    public List<App> getApp() {
      return app;
    }
  }
  
  public static class App {
    private String user;
    private String applicationTags;
    private int allocatedVcores;
    private int allocatedMB;
    private long startedTime;
    private long launchTime;
    private long elapsedTime;
    private String queue;
    private double queueUsagePercentage;
    private double clusterUsagePercentage;

    public String getUser { return user; }
    public String getApplicationTags; { return applicationTags; }
    public int getAllocatedVcores; { return allocatedVcores; }
    public int getAllocatedMB; { return allocatedMB; }
    public long getStartedTime; { return startedTime; }
    public long getLaunchTime; { return launchTime; }
    public long getElapsedTime; { return elapsedTime; }
    public String getQueue; { return queue; }
    public double getQueueUsagePercentage; { return queueUsagePercentage; }
    public double getClusterUsagePercentage; { return clusterUsagePercentage; }
  }
}

```

### YarnResourceAcceptedDTO.java
```java
public class YarnResourceAcceptedDTO {
  private Apps apps;

  public Apps getApps() {
    return apps;
  }

  public static class Apps {
    private List<App> app;

    public List<App> getApp() {
      return app;
    }
  }
  
  public static class App {
    private String user;
    private String applicationTags;
    private long startedTime;
    
    public String getUser { return user; }
    public String getApplicationTags; { return applicationTags; }
    public long getStartedTime; { return startedTime; }
  }
}

```
