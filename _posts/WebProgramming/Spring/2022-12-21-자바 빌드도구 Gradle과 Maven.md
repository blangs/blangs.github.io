---
title:  "자바 빌드도구 Gradle과 Maven"
excerpt: "자바 빌드도구 Gradle과 Maven 입니다."

categories:
  - spring
tags:
  - [spring, 프레임워크]

toc: true
toc_sticky: true

last_modified_at: 2022-12-21T13:17:00-17:00
---

## 메이븐(Maven)과 그래들(Gradle) 이란?
: Maven과 Gradle은 둘 다 자바 기반의 빌드 도구로, 프로젝트 빌드 및 관리에 사용된다.


## 메이븐(Maven)과 그래들(Gradle) 차이점
### (1) 빌드 파일 포맷
Maven은 XML을 사용하여 빌드 파일을 정의하고, Gradle은 Groovy나 Kotlin 등의 스크립트 언어를 사용하여 빌드 파일을 정의한다.


### (2) 의존성 관리
: Maven은 중앙 저장소에서 의존성을 가져오며, 의존성 버전 관리를 위해 버전을 명시해야 합니다. Gradle은 Maven과 마찬가지로 중앙 저장소에서 의존성을 가져올 수 있지만, 더욱 유연하게 의존성 관리를 할 수 있다.


### (3) 빌드 성능
: Maven은 빌드 속도가 느리고, 의존성 해결을 위해 중앙 저장소에 요청을 보내는 등의 네트워크 지연이 발생할 수 있다. 반면, Gradle은 빌드 캐시를 사용하여 이전에 빌드된 결과를 재사용하므로 빌드 속도가 빠르다.


### (4) 다중 프로젝트 지원
: Maven은 다중 프로젝트를 지원하지만, Gradle은 Maven보다 더 유연한 다중 프로젝트 구성을 제공한다.


### (5) IDE 통합
: Maven은 IntelliJ IDEA, Eclipse 등 대부분의 IDE에서 지원되며, Gradle도 이와 같은 IDE에서 지원된다. 그러나 Gradle은 IntelliJ IDEA에서 더 많은 통합 기능을 제공한다.


### (6) 유지보수성
: Maven은 XML 파일 형식으로 작성되기 때문에 가독성이 좋으며, 빌드 파일의 유지보수가 쉽다. Gradle은 코드 형식으로 작성되기 때문에 가독성이 떨어지지만, 스크립트 언어를 사용하므로 더욱 유연한 빌드 설정이 가능하다. 
  
즉, Maven은 간단하고 사용하기 쉽지만, 빌드 속도가 느리며 의존성 관리가 복잡할 수 있다. 반면, Gradle은 유연성이 높고 빌드 속도가 빠르지만, 학습 곡선이 높을 수 있다. 따라서 프로젝트의 요구사항에 맞게 선택해야 한다.
{: .notice--info}


## 메이븐(Maven) 예제
### 요약
: Maven은 프로젝트에서 필요한 라이브러리를 중앙레파지토리에서 자동으로 가져오므로, 이클립스에서 따로 라이브러리를 추가할 필요가 없다. 아래는 junit을 추가한 예제이다.
  
    ```xml
    <dependencies>
      <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.13.1</version>
        <scope>test</scope>
      </dependency>
    </dependencies>

    ```
    
## 그래들(Gradle) 예제
### 설치
1. 그래들 홈페이지[https://gradle.org/](https://gradle.org/) 에서 OS에 맞도록 설치
2. 제어판 > 시스템 > 고급 시스템 설정 > 환경변수 - 시스템변수(새로만들기) 클릭
3. 그래들홈(GADLE_HOME) 설정
    - ex) C:\Users\MT01301\.gradle\wrapper\dists\gradle-7.6-bin\9l9tetv7ltxvx3i8an4pb86ye\gradle-7.6
4. 패스(GRADLE_HOME + /bin) 설정
    - ex) C:\Users\MT01301\.gradle\wrapper\dists\gradle-7.6-bin\9l9tetv7ltxvx3i8an4pb86ye\gradle-7.6\bin
5. 완료
    ```bash
    gradle -v  #정상이면 정보가 출력된다
    
    ```
    
## 이클립스에서 Gradle 사용법  
### 이클립스 설정
: 이클립스 또는 STS 에서 사용하려면 아래 내용을 설정한다.

1. IDE 실행
2. 그래들경로 설정 Window - Preferences - Gradle - Local installation directory 클릭
    - 그래들(Gradle) 설치경로(GRADLE_HOME)를 지정해준다. (bin 경로아님)
3. 자바경로 설정
    - 자바(JDK) 설치경로(JAVA_HOME)를 지정해준다. (bin 경로아님)

### 이클립스 Gradle Project 임포트
1. File - Import - Existing Gradle Project - (위에서 디폴트설정했으므로 계속 NEXT)
2. 완료

### 이클립스 스프링부트 Gradle Poject 시작 설정
1. 실행파일 App.java 우클릭 - Run Configurations - 스프링부트TAB
    - Profile 콤보박스에서 local 선택 (나는 로컬환경이므로 참조를 로컬로 셋팅했다.)
2. 실행 App.java 우클릭 - Run Configurations - 아규먼트TAB
    - Program arguments 박스에서 "start" 입력
    - VM arguments 박스에서 "-Dspring.profiles.active=local" 입력
3. 설정 완료
4. 실행파일 App.java 우클릭 - Run As - Spring Boot App 클릭
5. 정상 실행..!

