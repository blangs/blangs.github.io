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

### YARN Resource Manager 이란?   
> ❗<span style='color:green'><b><I>Yet Another Resource Negotiator</I></b></span>  
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
> ❗<span style='color:green'><b><I>ResourceManager REST API’s***</I></b></span>  
> 💡 **현재 포스팅에서 참고할 내용**  
> 1. Cluster Metrics API
>     - [http://rm-http-address:port/ws/v1/cluster/metrics](http://rm-http-address:port/ws/v1/cluster/metrics)
> 1. Cluster Applications API
>     - [http://rm-http-address:port/ws/v1/cluster/apps](http://rm-http-address:port/ws/v1/cluster/apps)


### 현재 필요한 과정
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



## Cluster Metrics API (클러스터 분석)
### 






  



  
 

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