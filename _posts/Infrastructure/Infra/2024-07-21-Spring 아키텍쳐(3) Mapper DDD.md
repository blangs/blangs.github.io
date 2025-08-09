---
title:  "Spring 아키텍쳐(3) Mapper DDD"
excerpt: "Spring 아키텍쳐(3) Mapper DDD 입니다."

categories:
  - infra
tags:
  - [인프라, 아키텍처]

toc: true
toc_sticky: true

last_modified_at: 2024-07-21T20:00:00-05:00:00
---

## 패턴
### 전통적인 Mybatis 사용 시 DAO / Mapper 패턴 
```bash
src/main/java
└── com.example.project
    ├── controller
    │   └── AdController.java
    ├── service
    │   └── AdService.java
    │   └── AdServiceImpl.java
    ├── dao
    │   └── AdDao.java                   // SQL 호출 메서드
    ├── mapper
    │   └── AdMapper.java                // MyBatis Mapper 인터페이스
    ├── dto
    │   └── AdDto.java
src/main/resources
    └── mapper
        └── AdMapper.xml                 // 실제 SQL

``` 

- 특징
  - JPA → Repository + Entity 구조
  - MyBatis → DAO(혹은 Mapper) + DTO 구조
  - Repository라는 이름은 JPA에서 훨씬 더 의미가 분명하고 표준적임
  - MyBatis에서 Repository를 쓰면 JPA 스타일로 착각할 수 있음 → 가급적 Dao 또는 Mapper 권장


## DDD를 적용한 Mybatis 사용 시 DAO / Mapper 패턴 
### 1. Controller → Service → Repository → mapper.xml
```bash
src/main/java
└── com.example.project
    ├── controller
    │   └── AdController.java
    ├── service
    │   └── AdService.java
    ├── domain
    │   ├── entity
    │   │    └── Ad.java             // 도메인 엔티티
    │   └── repository
    │        └── AdRepository.java   // Repository 인터페이스 (DAO 역할)
src/main/resources
    └── mapper
        └── AdMapper.xml             // SQL XML 파일 (Repository와 매핑)
```

- 특징
  - Repository 는 도메인 객체를 DB에 저장/조회하는 역할
  - AdRepository 는 mapper.xml 과 연결된 MyBatis 매퍼를 호출하거나 직접 SQL 실행 담당
  - 서비스는 Repository 인터페이스를 통해 도메인 작업



### 2. Controller → Service → Repository → Mapper → mapper.xml
```bash
src/main/java
└── com.example.project
    ├── controller
    │   └── AdController.java
    ├── service
    │   └── AdService.java
    ├── domain
    │   ├── entity
    │   │    └── Ad.java              // 도메인 엔티티
    │   ├── repository
    │   │    ├── AdRepository.java   // Repository 인터페이스
    │   │    └── AdMapper.java       // Mapper 인터페이스 (MyBatis)
src/main/resources
    └── mapper
        └── AdMapper.xml             // SQL XML 파일

```

- 특징
  - AdRepository 가 Repository 인터페이스 역할만 수행
  - 실제 DB 호출은 MyBatis AdMapper가 담당
  - AdRepository 는 AdMapper를 의존(내부 호출)해서 역할 분리
  - 서비스는 AdRepository 인터페이스를 통해 도메인 처리
  - 이 구조는 인터페이스 분리와 테스트 용이성을 높임


### 3. Controller → Service → Mapper → mapper.xml
```bash
src/main/java
└── com.example.project
    ├── controller
    │   └── AdController.java
    ├── service
    │   └── AdService.java
    ├── domain
    │   ├── entity
    │   │    └── Ad.java              // 도메인 엔티티
    │   └── repository
    │        └── AdMapper.java       // Mapper 인터페이스가 DAO 역할 수행
src/main/resources
    └── mapper
        └── AdMapper.xml             // SQL XML 파일

```

- 특징
  1. AdMapper 가 Repository와 DAO 역할을 겸함
  2. 서비스가 직접 Mapper를 호출
  3. 구조가 간단해지고 개발 속도 빠름
  4. 규모 커지면 역할이 혼재돼서 유지보수가 어려울 수 있음


## 결론  
    
| 유형                                                        | Repository 역할                           | Mapper 역할         | 장점                       | 단점                         |  
|:-----------------------------------------------------------|:-----------------------------------------:|:------------------:|:-------------------------:|------------------------------:|  
| 1. Controller → Service → Repository → mapper.xml          | Repository가 직접 SQL 실행 또는 Mapper 호출  | XML만 존재          | 간단하고 명확한 책임 분리     | Repository에 DB 호출 로직 포함 |  
| 2. Controller → Service → Repository → Mapper → mapper.xml | Repository는 Mapper 호출자 역할             | Mapper가 SQL 실행   | 역할 분리, 테스트 용이성 ↑    | 코드가 다소 복잡해짐           |  
| 3. Controller → Service → Mapper → mapper.xml              | 없음 (Mapper가 DAO+Repository 역할 겸함)    | Mapper가 SQL 실행   | 단순, 빠른 개발              | 역할 혼재, 유지보수 어려움      |  
  
  
| 구조 유형  | 용도 | 핵심 장점 | 추천 |  
|:--------|:-------:|--------:|--------:|  
| Controller → Service → Repository → mapper.xml | 소규모, 단순 프로젝트   | 구조 단순, 빠른 개발 가능 | 유지보수성, 추상화 부족 |  
|---------------------------------------|  
| Controller → Service → Repository → Mapper → mapper.xml | 중대형, 확장성 요구 프로젝트 | 책임 분리 명확, 테스트 용이   | 계층 많아 코드량 증가 |  
|---------------------------------------|  
| Controller → Service → Mapper → mapper.xml | 빠른 개발, 간단한 요구사항   | 구조 매우 단순, 구현 빠름   | 결합도 증가, 테스트/확장 어려움   |  
|=======================================|  
| Foot1   | Foot2   | Foot3   | cell3   |  
  