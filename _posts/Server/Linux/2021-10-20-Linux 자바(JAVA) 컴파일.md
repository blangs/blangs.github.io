---
title:  "Linux 자바(JAVA) 컴파일"
excerpt: "Linux 자바(JAVA) 컴파일 입니다."

categories:
  - linux
tags:
  - [Linux, Ubuntu, Raspbian]

toc: true
toc_sticky: true

last_modified_at: 2021-10-20T20:00:00-05:00
---

## 🎆자바 컴파일
  : 간단하게 서버에서 자바를 수정해야하는 경우가 있다. 이때 이클립스 같이 익숙한 IDE 를 사용하지 않고 리눅스에서 컴파일하는 방법을 알아본다.

## 🎆lib import 없는 단순 자바파일 컴파일 시
  : 라이브러리가 없는 환경에서 컴파일 한다.

### (1) .java 파일 작성
: 우선 java 파일을 작성한다.

```java
# 작성
vi Test.java


public class Test {
    /* 테스트코드 입니다. */
    public static void main(String args[]) {
        System.out.println("안녕!");
    }
}

```

### (2). java 파일 컴파일
  : 작성한 java 파일을 컴파일 한다.

```bash
# javac [파일명].java
javac Test.java

# 정상적으로 컴파일되어 .class 파일이 떨어진다.
ls
Test.class   Test.java

```

### (3). Java 파일 실행 
  : 컴파일이 완료된 .class 파일을 실행한다.

```bash
# 정상 실행된다.
java Test
안녕!

```


## 🎆lib import가 필요한 자바파일 컴파일 시1
  : 라이브러리가 포함되어야 하는 경우이다.

### (1) .java 파일 작성(import lib)
: 우선 java 파일을 작성한다. (테스트용 라이브러리를 임포트 시켰다.)

```java
# 작성
vi Test.java


# 상단에 Import 라이브러리를 넣어주었다.
import javax.servlet.http.HttpServlet;
public class Test {
    /* 테스트코드 입니다. */
    public static void main(String args[]) {
        System.out.println("안녕!");
    }
}

```

### (2). java 파일 컴파일
  : 작성한 라이브러리가 포함된 자바파일을 컴파일한다.

```bash
# 라이브러리가 없어서 컴파일 에러가 발생한다.
javac Test.java
Test.java:1: error: package javax.servlet.http does not exist
  import javax.servlet.http.HttpServlet;
                           ^
1 error

```
  
```bash
# 라이브러리를 포함하여 재시도 한다.
# n개면 구분자는 ':' 콜론으로 주고 작성한다.
javac -cp "./servlet-api.jar" Test.java

# 정상적으로 컴파일되어 .class 파일이 떨어진다.
ls
Test.class   Test.java

#################################################
# (이런 방법도 있다)
# env 에서 CLASSPATH 경로에 한번만 등록해 두니까
# 전역으로 알아서 잘잡는다.
javac DeInfoView.java  # 실패
export CLASSPATH=$CLASSPATH:~/servlet-api.jar
javac DeInfoView.java  # 성공

#################################################

```

### (3). Java 파일 실행 
  : 컴파일이 완료된 .class 파일을 실행한다.

```bash
# 정상 실행된다.
java Test
안녕!


#################################################
# 실행시점에 라이브러리를 포함하여 실행해야 하는 상황이 있다.
# 그럴땐 아래처럼 가능하다.
java -cp ".:~/servlet-api.jar" DeInfoView
안녕!


#################################################
# jar 파일을 실행하는 상황이 있다.
java -cp build\libs\app.jar com.example.App

# 이 명령어는 -cp 또는 -classpath 옵션을 사용하여 클래스 패스를 지정한다. 
# build\libs\app.jar를 클래스 패스로 지정하여 해당 JAR 파일 안에 있는 클래스를 찾는다. 
# 메인 클래스를 직접 명시하므로, JAR 파일에 메인 클래스가 포함되어 있지 않아도 실행할 수 있다.
# 클래스 패스에 포함된 다른 라이브러리 또는 의존성을 사용하고자 할 때 편리하다.


#################################################
# jar 파일을 실행하는 상황이 있다.
java -jar build\libs\app.jar

# 이 명령어는 -jar 옵션을 사용하여 JAR 파일을 실행행다. 
# JAR 파일에는 메인 클래스(main class)가 META-INF/MANIFEST.MF 파일에 정의되어 있어야 한다.
# JAR 파일 내에 클래스 패스를 지정하는 것이 아니라, 해당 JAR 파일 안에 있는 메인 클래스를 실행한다. 
# JAR 파일에 내장된 라이브러리 또는 의존성을 사용하고자 할 때 편리하다. 



# 만약 프로젝트가 단일 JAR 파일로 패키징되어 있고 메인 클래스가 
# JAR 파일에 # 정의되어 있다면, java -jar build\libs\app.jar 
# 명령어를 사용하는 것이 간단하고 편리합니다.
# 그러나 프로젝트가 여러 개의 JAR 파일과 의존성으로 구성되어 있거나, 
# 메인 클래스가 JAR 파일에 포함되어 있지 않을 때는 
# java -cp build\libs\app.app.# jar com.example.App 
# 명령어를 사용하여 클래스 패스를 지정하여 실행하는 것이 유용합니다.

```

## 🎆lib import가 필요한 자바파일 컴파일 시2
  : 라이브러리 위치를 환경설정에서 미리 정해준다.

### 


## 🎆인코딩이 필요한 자바파일 컴파일 시
  : 인코딩을 주면서 컴파일 한다.

```bash
java -cp ".:~/servlet-api.jar" DeInfoView -encoding UTF-8

```



## 🎆(다시연습)타 클래스파일, 라이브러리를 참조하는 자바파일 컴파일 시
### 의존하는 클래스 파일 선행컴파일
  : 컴파일 하려는 자바파일이 의존하는 클래스 파일을 가장 먼저 컴파일 의존하는 클래스 파일을 먼저 컴파일한다.
  
```bash
javac DependentClass.java

```

### 의존 라이브러리 포함하여 클래스 파일 컴파일
  : 필요한 외부 라이브러리를 -cp 옵션을 사용하여 포함하여 클래스 파일을 컴파일한다. 

```bash
# 예시) /path/to/library.jar 경로에 있는 라이브러리를 포함.
javac -cp "/path/to/library.jar" YourClass.java

```  

> ❗배포   
> 💡 컴파일된 클래스 파일을 웹 애플리케이션 서버의 적절한 위치로 복사하여 배포한다.  
> 💡 이 방법은 간단한 프로젝트에는 적용할 수 있지만, 프로젝트의 규모가 커지고 의존성이 복잡해질수록 이러한 수동 작업이 관리하기 어려워진다.   
> 💡 이러한 상황에서는 Maven 또는 Gradle과 같은 빌드 도구를 사용하여 의존성을 관리하고 자동으로 컴파일 및 배포를 수행하는 것이 효과적이다.  




## 참고) 실시간 이슈
### 외부 jar 파일을 추가하여 컴파일하는 방법
  : 자바실행시 lib를 임포트했는데도 안되면 다음과 같이 해본다.

```bash
SERVLET_API_HOME=~/
export LD_LIBRARY_PATH=$SERVLET_API_HOME

# 성공! 이제는 된다.
java -cp ".:~/servlet-api.jar DeInfoView

```

