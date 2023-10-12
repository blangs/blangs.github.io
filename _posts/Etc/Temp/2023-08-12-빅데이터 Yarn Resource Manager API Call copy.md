---
title: "빅데이터 Yarn Resource Manager Call"
excerpt: "빅데이터 Yarn Resource Manager Call 입니다."

categories:
  - temp
tags:
  - [oracle, schema]
toc: true
toc-stiky: true
last_modified_at: 2023-08-12T13:00:00-05:00
---

## YARN Resource Manager 이란?   
> ❗<span style='color:green'><b><I>Yet Anor Resource Negotiator</I></b></span>  
> 💡 Apache Hadoop 프로젝트의 일부로, 클러스터 리소스 관리와 스케줄링을 위한 컴포넌트.  
> 💡 YARN Resource Manager는 클러스터의 
전체 자원을 모니터링하고 관리하는 주요 컴포넌트로, 클러스터 내에서 실행되는 다양한 애플리케이션에 대한 리소스 할당 및 스케줄링을 조정.  
>    
> ❗<span style='color:green'><b><I>hive query 또는 spark 작업 확인용도</I></b></span>  
> 💡 리소스가 가득차면 여유까지 기다리게 된다.  
> 💡 사용자가 현 상황을 파악하기 위해 Yarn Resource Manager 를 참조한다.
>  
> ❗<span style='color:green'><b><I>클라우데라란?</I></b></span>   
> > 💡 Cloudera  
> > Cloudera는 기업용 빅데이터 솔루션을 제공하는 회사로, Apache Hadoop 및 관련 프로젝트의 상업적인 지원 및 제품을 개발합니다. 
> > Cloudera의 주요 제품 중 하나는 "Cloudera Distribution for Hadoop (CDH)"로, 이 제품은 Apache Hadoop을 기반으로 한 종합적인 빅데이터 플랫폼을 제공합니다. 
> > CDH는 Hadoop 클러스터 운영, 관리, 모니터링, 데이터 분석 및 처리 등을 위한 다양한 도구와 기능을 포함하고 있습니다.


### 공식 API 문서
> ❗<span style='color:green'><b><I>ResourceManager REST API’s</I></b></span>  
> 💡 ***[링크 바로 가기](https://hadoop.apache.org/docs/current/hadoop-yarn/hadoop-yarn-site/ResourceManagerRest.html#Cluster_Information_API)***  
>    
> 💡 ***현재 포스팅에서 참고할 내용***  
> 1. **Cluster Metrics API**
>     - http://rm-http-address:port/ws/v1/cluster/metrics
>   
> 2. **Cluster Information API**  
>     - http://rm-http-address:port/ws/v1/cluster
>       - http://rm-http-address:port/ws/v1/cluster/info
>   
> 3. **Cluster Applications API**
>     - http://rm-http-address:port/ws/v1/cluster/apps
>   
> ❗<span style='color:green'><b><I>API 비교</I></b></span>  
> 💡 Cluster Information API는 YARN 클러스터의 기본 정보와 ResourceManager의 상태, 버전 등을 제공하는 API로, 클러스터 전반의 구성과 상태를 조회합니다.  
>  
> 💡 Cluster Metrics API는 YARN 클러스터 내에서 실행 중인 애플리케이션의 성능 지표 및 자원 사용량과 관련된 정보를 제공하는 API로, 클러스터 내 애플리케이션들의 상태와 성능을 모니터링합니다.  
>  
> 💡 Cluster Applications API는 YARN 클러스터 내에서 실행 중인 애플리케이션들의 목록과 상세 정보를 조회하는 API입니다. 이 API를 통해 클러스터 내에서 실행 중인 애플리케이션들의 상태, ID, 이름, 시작 시간 등을 확인할 수 있습니다. 이를 통해 클러스터 내에서 실행 중인 애플리케이션들을 모니터링하고 관리할 수 있습니다.



## Cluster Metrics API (클러스터 분석) (자식)
 Cluster Metrics API는 클러스터 내의 실행 중인 애플리케이션 및 자원 사용량과 같은 성능 메트릭 정보를 제공합니다.   
- ⚠️이 API는 클러스터 내의 메트릭 정보를 제공합니다.  
- ⚠️클러스터 내에서 실행 중인 애플리케이션의 상태 및 자원 사용량 등을 모니터링하는 데 사용됩니다.  
- ⚠️클러스터 전체의 성능 및 리소스 사용량을 보다 세부적으로 모니터링하는 데 활용됩니다.
- ⚠️클러스터의 현재 상태와 성능 지표를 조회할 수 있습니다.
- ⚠️애플리케이션 제출, 실행, 종료 등의 통계 및 메트릭 정보가 포함됩니다.




### API 호출
> ❗***URI 경로***   
> 💡 http://<address:port>/ws/v1/cluster/metrics  
>  
> ❗***요청 타입***   
> 💡 GET  
>  
> ❗***파라미터***   
> 💡 없음  
   

### API 오브젝트 엘리먼트  
  
|***항목***|***데이터 유형***|***설명***|  
|:---|:---|:---|    
|appsSubmitted|int|제출된 애플리케이션 수|  
|appsCompleted|int|완료된 애플리케이션 수|  
|appsPending|int|대기 중인 애플리케이션 수|  
|appsRunning|int|실행 중인 애플리케이션 수|  
|appsFailed|int|실패한 애플리케이션 수|  
|appsKilled|int|종료된(킬된) 애플리케이션 수|  
|reservedMB|long|예약된 메모리 (메가바이트)|  
|availableMB|long|사용 가능한 메모리 (메가바이트)|  
|allocatedMB|long|할당된 메모리 (메가바이트)|  
|totalMB|long|전체 메모리 용량 (메가바이트)|  
|reservedVirtualCores|long|예약된 가상 코어 수|  
|availableVirtualCores|long|사용 가능한 가상 코어 수|  
|allocatedVirtualCores|long|할당된 가상 코어 수|  
|totalVirtualCores|long|전체 가상 코어 수|  
|containersAllocated|int|할당된 컨테이너 수|  
|containersReserved|int|예약된 컨테이너 수|  
|containersPending|int|대기 중인 컨테이너 수|  
|totalNodes|int|전체 노드 수|  
|activeNodes|int|활성 노드 수|  
|lostNodes|int|손실된 노드 수|  
|unhealthyNodes|int|비정상적인 상태의 노드 수|  
|decommissioningNodes|int|해체 중인 노드 수|  
|decommissionedNodes|int|해체된 노드 수|  
|rebootedNodes|int|재부팅된 노드 수|  
|shutdownNodes|int|종료된 노드 수|  

  
### JSON response
```bash
GET http://rm-http-address:port/ws/v1/cluster/metrics

# HTTP/1.1 200 OK
# Content-Type: application/json
# Transfer-Encoding: chunked
# Server: Jetty(6.1.26)

```

```json
{
  "clusterMetrics":
  {
    "appsSubmitted":0,
    "appsCompleted":0,
    "appsPending":0,
    "appsRunning":0,
    "appsFailed":0,
    "appsKilled":0,
    "reservedMB":0,
    "availableMB":17408,
    "allocatedMB":0,
    "reservedVirtualCores":0,
    "availableVirtualCores":7,
    "allocatedVirtualCores":1,
    "containersAllocated":0,
    "containersReserved":0,
    "containersPending":0,
    "totalMB":17408,
    "totalVirtualCores":8,
    "totalNodes":1,
    "lostNodes":0,
    "unhealthyNodes":0,
    "decommissioningNodes":0,
    "decommissionedNodes":0,
    "rebootedNodes":0,
    "activeNodes":1,
    "shutdownNodes":0
  }
}

```

### XML response
```bash
GET http://rm-http-address:port/ws/v1/cluster/metrics
Accept: application/xml

# HTTP/1.1 200 OK
# Content-Type: application/xml
# Content-Length: 432
# Server: Jetty(6.1.26)

```

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<clusterMetrics>
  <appsSubmitted>0</appsSubmitted>
  <appsCompleted>0</appsCompleted>
  <appsPending>0</appsPending>
  <appsRunning>0</appsRunning>
  <appsFailed>0</appsFailed>
  <appsKilled>0</appsKilled>
  <reservedMB>0</reservedMB>
  <availableMB>17408</availableMB>
  <allocatedMB>0</allocatedMB>
  <reservedVirtualCores>0</reservedVirtualCores>
  <availableVirtualCores>7</availableVirtualCores>
  <allocatedVirtualCores>1</allocatedVirtualCores>
  <containersAllocated>0</containersAllocated>
  <containersReserved>0</containersReserved>
  <containersPending>0</containersPending>
  <totalMB>17408</totalMB>
  <totalVirtualCores>8</totalVirtualCores>
  <totalNodes>1</totalNodes>
  <lostNodes>0</lostNodes>
  <unhealthyNodes>0</unhealthyNodes>
  <decommissioningNodes>0</decommissioningNodes>
  <decommissionedNodes>0</decommissionedNodes>
  <rebootedNodes>0</rebootedNodes>
  <activeNodes>1</activeNodes>
  <shutdownNodes>0</shutdownNodes>
</clusterMetrics>

```


## Cluster Information API (전역)
 Cluster Information API는 클러스터의 기본 정보와 ResourceManager의 상태, 버전 등을 제공합니다.  
- ⚠️이 API는 클러스터의 전반적인 정보를 제공합니다.
- ⚠️클러스터 자체의 구성, 상태 및 ResourceManager의 기본 정보를 조회할 수 있습니다.
- ⚠️클러스터 전반적인 설정 및 ResourceManager의 전역적인 상태를 나타냅니다.
- ⚠️클러스터의 기본 정보와 ResourceManager의 상태, 버전, 빌드 정보 등을 조회할 수 있습니다.
- ⚠️클러스터의 HA(High Availability) 상태, ResourceManager의 접속 정보, Hadoop 버전 및 빌드 정보 등이 포함됩니다.
- ⚠️주로 클러스터의 기본 상태 및 구성에 대한 정보를 제공하는 데 사용됩니다.




### API 호출
> ❗***URI 경로***   
> 💡 아래 두 개의 URI 모두 클러스터 정보를 제공한다.  
> 💡 http://rm-http-address:port/ws/v1/cluster  
>    - http://rm-http-address:port/ws/v1/cluster/info  
>  
> ❗***요청 타입***   
> 💡 GET  
>  
> ❗***파라미터***   
> 💡 없음  
   

### API 오브젝트 엘리먼트  
  
|***항목***|***데이터 유형***|***설명***|  
|:---|:---|:---|
|id|long|클러스터 ID|  
|startedOn|long|클러스터 시작 시간 (시간 경과(ms) 시점)|  
|state|string|ResourceManager 상태 - 가능한 값: NOTINITED, INITED, STARTED, STOPPED|  
|haState|string|ResourceManager HA 상태 - 가능한 값: INITIALIZING, ACTIVE, STANDBY, STOPPED|  
|rmStateStoreName|string|ResourceManager 상태 저장을 구현한 클래스의 완전한 이름|  
|resourceManagerVersion|string|ResourceManager 버전|  
|resourceManagerBuildVersion|string|ResourceManager 빌드 문자열 (버전, 사용자, 체크섬 포함)|  
|resourceManagerVersionBuiltOn|string|ResourceManager 빌드 시간 (시간 경과(ms) 시점)|  
|hadoopVersion|string|Hadoop Common 버전|  
|hadoopBuildVersion|string|Hadoop Common 빌드 문자열 (버전, 사용자, 체크섬 포함)|  
|hadoopVersionBuiltOn|string|Hadoop Common 빌드 시간 (시간 경과(ms) 시점)|  
|haZooKeeperConnectionState|string|고가용성 서비스의 ZooKeeper 연결 상태|  
  
  
### JSON response
```bash
GET GET http://rm-http-address:port/ws/v1/cluster/info

#HTTP/1.1 200 OK
#Content-Type: application/json
#Transfer-Encoding: chunked
#Server: Jetty(6.1.26)

```

```json
{
  "clusterInfo":
  {
    "id":1324053971963,
    "startedOn":1324053971963,
    "state":"STARTED",
    "haState":"ACTIVE",
    "rmStateStoreName":"org.apache.hadoop.yarn.server.resourcemanager.recovery.NullRMStateStore",
    "resourceManagerVersion":"3.0.0-SNAPSHOT",
    "resourceManagerBuildVersion":"3.0.0-SNAPSHOT from unknown by user1 source checksum 11111111111111111111111111111111",
    "resourceManagerVersionBuiltOn":"2016-01-01T01:00Z",
    "hadoopVersion":"3.0.0-SNAPSHOT",
    "hadoopBuildVersion":"3.0.0-SNAPSHOT from unknown by user1 source checksum 11111111111111111111111111111111",
    "hadoopVersionBuiltOn":"2016-01-01T01:00Z",
    "haZooKeeperConnectionState": "ResourceManager HA is not enabled."  }
  }
  // ....
}

```

### XML response
```bash
Accept: application/xml
GET http://rm-http-address:port/ws/v1/cluster/info

#HTTP/1.1 200 OK
#Content-Type: application/xml
#Content-Length: 712
#Server: Jetty(6.1.26)

```

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<clusterInfo>
  <id>1476912658570</id>
  <startedOn>1476912658570</startedOn>
  <state>STARTED</state>
  <haState>ACTIVE</haState>
  <rmStateStoreName>org.apache.hadoop.yarn.server.resourcemanager.recovery.NullRMStateStore</rmStateStoreName>
  <resourceManagerVersion>3.0.0-SNAPSHOT</resourceManagerVersion>
  <resourceManagerBuildVersion>3.0.0-SNAPSHOT from unknown by user1 source checksum 11111111111111111111111111111111</resourceManagerBuildVersion>
  <resourceManagerVersionBuiltOn>2016-01-01T01:00Z</resourceManagerVersionBuiltOn>
  <hadoopVersion>3.0.0-SNAPSHOT</hadoopVersion>
  <hadoopBuildVersion>3.0.0-SNAPSHOT from unknown by user1 source checksum 11111111111111111111111111111111</hadoopBuildVersion>
  <hadoopVersionBuiltOn>2016-01-01T01:00Z</hadoopVersionBuiltOn>
  <haZooKeeperConnectionState>ResourceManager HA is not enabled.</haZooKeeperConnectionState>
</clusterInfo>

```



## Cluster Running API (현재실행중인)
현재 실행중인 클러스터


### JSON response
```bash
GET http://rm-http-address:port/ws/v1/cluster/metrics

# HTTP/1.1 200 OK
# Content-Type: application/json
# Transfer-Encoding: chunked
# Server: Jetty(6.1.26)

```

```json
{
  "apps": {
      "app": [
          "app":[
              {
                "id": "application_1690277915085_69521",
                "user": "mfx000",
                "queue": "default",
                "clusterId": "1690277915085",
                "applicationTags": "",
                "startedTime": 1692854898086,
                "launchTime": 1692854898086,
                "elpsedTime": 1986715,
                "allocatedMB": 38912,
                "allocatedVCores": 6,
                "queueUsagePercentage": 1.5151521, 
                "clusterUsagePercentage": 1.439394, 
              }
              ,
              {
                "id": "application_1688944172301_1596",
                "user": "hive",
                "queue": "default",
                "clusterId": 1690277915085,
                "applicationTags": "hive_20230810153523_7a60c503-5e70-4ef7-ae0d-f0bfd8998c0a,userid=ime00820",
                "startedTime": 1691649324205,
                "launchTime": 1691649324238,
                "elpsedTime": 25581,
                "allocatedMB": 38912,
                "allocatedVCores": 8,
                "queueUsagePercentage": 1.5151521, 
                "clusterUsagePercentage": 1.439394, 
              }
            ]
      ]
  }
  
}

```


## Cluster Running API (수행예정인)
수행 대기하면서 실행 예정인 작업

### JSON response
위와 비슷


## STEP1. 현재 필요한 과정 
- Cluster Metrics API
    - 전체리소스 상태

- Cluster Information API
    - 클러스터 동작 
> ❗***1. 상태확인***   
> 💡 Active / Stanby 확인  
> 💡 내렸다가 올라갈때마다 바뀌므로 선행체크 한다.  
>   
> ```bash
> http://<address:port>/ws/v1/cluster/info 
> ```
>   
> ❗***2. 요청***   
> 💡 Active 를 찾으면 Active 해당하는 Host측의 RestAPI 요청을 수행시킨다.  
>  
> ```bash
> http://<address:port>/ws/v1/cluster/apps?states=RUNNING&states=ACCEPTED 
> ```
>   
> ❗***3. 실행중인 리소스 내용 확인***   
> 💡 accepted 애들을 확인   
> 💡 원하는 리소스 정보 개발자가 핸들링  
   
URL 은 고정적이며 Active 인 곳에 요청을 날리는 방식이다.  
{: .notice--info}


## 얀 리소스 매니저 
### 클러스터 메모리사용량 확인하기 
```bash
# Rest API XML or JSON
http://<address:port>/ws/v1/cluster/metrics 

```
> ❗***클러스터 메트릭 정보를 확인***   
> 💡 GET 방식으로 호출하면 된다.  
> 💡 URI를 헤더에 { 'Content-Type': 'application/json' }로 정보를 설정하면 json 형식으로 값을 반환한다.


### 리소스 확인하기

http://<rm http address:port>/ws/v1/cluster/metrics

## 참고
> ❗***참고 블로그***  
> 💡 https://data-wiki.tistory.com/15


