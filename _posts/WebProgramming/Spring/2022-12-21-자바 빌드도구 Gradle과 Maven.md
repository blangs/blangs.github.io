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
**(1) 빌드 파일 포맷**  
Maven은 XML을 사용하여 빌드 파일을 정의하고, Gradle은 Groovy나 Kotlin 등의 스크립트 언어를 사용하여 빌드 파일을 정의한다.

**(2) 의존성 관리**  
: Maven은 중앙 저장소에서 의존성을 가져오며, 의존성 버전 관리를 위해 버전을 명시해야 합니다. Gradle은 Maven과 마찬가지로 중앙 저장소에서 의존성을 가져올 수 있지만, 더욱 유연하게 의존성 관리를 할 수 있다.


**(3) 빌드 성능**  
: Maven은 빌드 속도가 느리고, 의존성 해결을 위해 중앙 저장소에 요청을 보내는 등의 네트워크 지연이 발생할 수 있다. 반면, Gradle은 빌드 캐시를 사용하여 이전에 빌드된 결과를 재사용하므로 빌드 속도가 빠르다.


**(4) 다중 프로젝트 지원**  
: Maven은 다중 프로젝트를 지원하지만, Gradle은 Maven보다 더 유연한 다중 프로젝트 구성을 제공한다.


**(5) IDE 통합**  
: Maven은 IntelliJ IDEA, Eclipse 등 대부분의 IDE에서 지원되며, Gradle도 이와 같은 IDE에서 지원된다. 그러나 Gradle은 IntelliJ IDEA에서 더 많은 통합 기능을 제공한다.


**(6) 유지보수성**  
: Maven은 XML 파일 형식으로 작성되기 때문에 가독성이 좋으며, 빌드 파일의 유지보수가 쉽다. Gradle은 코드 형식으로 작성되기 때문에 가독성이 떨어지지만, 스크립트 언어를 사용하므로 더욱 유연한 빌드 설정이 가능하다. 
  
즉, Maven은 간단하고 사용하기 쉽지만, 빌드 속도가 느리며 의존성 관리가 복잡할 수 있다. 반면, Gradle은 유연성이 높고 빌드 속도가 빠르지만, 학습 곡선이 높을 수 있다. 따라서 프로젝트의 요구사항에 맞게 선택해야 한다.
{: .notice--info}


## 메이븐(Maven)
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
    
## 그래들(Gradle)
- gradle Download
- groovy Download
- 각 설치 파일 압축 해제
- 환경 변수 또는 path 등록

### 설치
1. 그래들 홈페이지[https://gradle.org/](https://gradle.org/) 에서 OS에 맞도록 설치
2. 제어판 > 시스템 > 고급 시스템 설정 > 환경변수 - 시스템변수(새로만들기) 클릭
3. 그래들홈(GADLE_HOME) 설정
    - ex) C:\Users\MT01301\.gradle\wrapper\dists\gradle-7.6-bin\9l9tetv7ltxvx3i8an4pb86ye\gradle-7.6
4. 패스(GRADLE_HOME + /bin) 설정
    - ex) C:\Users\MT01301\.gradle\wrapper\dists\gradle-7.6-bin\9l9tetv7ltxvx3i8an4pb86ye\gradle-7.6\bin
5. 완료
    ```bash
    gradle -v   # 정상이면 정보가 출력된다
    
    ```
## 기본 Gradle 사용법

### (1) 어플리케이션 생성

```bash 
# Gradle 프로젝트를 생성할 폴더 생성
mkdir gradle-study

```
  
. init 옵션을 통해서 project 기본 파일과 폴더를 생성한다
  
```bash
# gradle init --type java-application 한번에 자바프로젝트 생성 진행하는 방법

gradle init

Select type of project to generate:
  1: basic
  2: application
  3: library
  4: Gradle plugin
Enter selection (default: basic) [1..4] 2

```

> basic: 기본 프로젝트 타입, 수동으로 구성해야 함  
> application: java application 타입, App.java 파일을 포함  
> library: java library 타입, Library.java 파일을 포함  
> Gradle plugin: java로 구현 된 gradle 플러그인 타입  


### (2) 프로젝트 언어 설정

```bash
Select implementation language:
  1: C++
  2: Groovy
  3: Java
  4: Kotlin
  5: Swift
Enter selection (default: Java) [1..5] 3

```

### (3) 싱글모듈, 멀티모듈 프로젝트 설정

```bash
Split functionality across multiple subprojects?:
1: no - only one application project
2: yes - application and library projects
Enter selection (default: no - only one application project) [1.. 2] 1

```
    
### (4) DSL 설정(Gradle 스크립트를 작성할 언어)

```bash
Select build script DSL:
  1: Groovy
  2: Kotlin
Enter selection (default: Groovy) [1..2] 1

# 이후 새로운 API 를 사용해서 build 를 생성하겠냐는 질문에 기본 값을 선택. (새로운 API 가 어떤 변경이 있는지 잘 모름..)
Generate build using new APIs and behavior (some features may change in the next minor release)? (default: no) [yes, no]no

```

### (5) 테스트 프레임워크 선택. 익숙한 JUnit 4 선택

```bash
Select test framework:
  1: JUnit 4
  2: TestNG
  3: Spock
  4: JUnit Jupiter
Enter selection (default: JUnit 4) [1..4] 1

```

이후 프로젝트 이름 설정이 나오는데 이 부분은 생략한다.  
  
### 실행
: Project를 실행하기 위해 gradle run 을 수행한다. 예상 결과는 다음과 같다.

1. gradle run 명령어 입력
2. gradle-study\app\src\main\java\gradle\study\App.java 자바파일 실행
3. "Hello Java" 수행

```bash
gradle run   # 폐쇄망에서 에러 발생

```
  
폐쇄망에서는 gradle 을 통해 레파지토리에서 받지 못하도록 해야하므로 아래 빌드 내용을 지워준다
  
```bash
cd gradle-study\app\
vi bulid.gradle

dpendencies {
    // 외부를 참조하는 implementation 항목을 제거
}

```
  
재시도 하면 정상작동 하는 것을 확인할 수 있다.
  
```bash
gradle run

> Task :app:run
Hello World!

BUILD SUCCESSFUL in 4s
2 actionable tasks: 2 executed
<-------------> 0% WAITING
> IDLE

```

###  프로젝트 jar 패키징

```bash
gradle jar
BUILD SUCCESSFUL in 3s
2 actionable tasks: 1 executed, 1 up-to-date

```

***build/libs/app.jar 이 경로에 jar 파일이 생성된다.***  

### 프로젝트 jar 패키징 실행

```bash
java -jar build\libs\app.jar
build\libs\app.jar에 기본 Manifest 속성이 없습니다.

```

Manifest 속성을 아래와 같이 선언해주자.

### Manifest 속성 선언
```bash
cd gradle-study\app\
vi bulid.gradle

jar {
    manifest {
        attributes 'Main-Class': 'gradle.study.App' 
    }
}

```

```bash
# 재시도 한다.

# 정리 
$ gradle clean
BUILD SUCCESSFUL in 3s
1 actionable task: 1 executed
--------------------------------------------------------------
# 패키징 
$ gradle jar
BUILD SUCCESSFUL in 3s
2 actionable tasks: 1 executed, 1 up-to-date
--------------------------------------------------------------
# 실행
$ java -jar build\libs\myfirst-app.jar
Hello world!

```
  
> 지금까지 그래들(Gradle) 사용방법을 알아보았다.
  


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

