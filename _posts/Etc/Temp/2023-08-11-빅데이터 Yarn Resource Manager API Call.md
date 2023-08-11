---
title: "빅데이터 Yarn Resource Manager Call"
excerpt: "빅데이터 Yarn Resource Manager Call 입니다."

categories:
  - temp
tags:
  - [oracle, schema]
toc: true
toc-stiky: true
last_modified_at: 2023-08-11T13:00:00-05:00
---

## 개요
> ❗***hive query 또는 spark 작업 확인용도***   
> 💡 리소스가 가득차면 여유까지 기다리게 된다.  
> 💡 사용자가 현 상황을 파악하기 위해 Yarn Resource Manager 를 참조한다.  


### 과정
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

```

### 리소스 확인하기




http://<rm http address:port>/ws/v1/cluster/metrics

## 참고
> ❗***참고 블로그***  
> 💡 https://data-wiki.tistory.com/15