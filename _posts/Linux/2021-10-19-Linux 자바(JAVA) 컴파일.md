---
title:  "Linux 자바(JAVA) 컴파일"
excerpt: "Linux 자바(JAVA) 컴파일 입니다."

categories:
  - linux
tags:
  - [Linux, Ubuntu, Raspbian]

toc: true
toc_sticky: true

last_modified_at: 2022-10-12T20:00:00-05:00
---

## 자바 컴파일
  : 간단하게 서버에서 자바를 수정해야하는 경우가 있다. 이때 이클립스 같이 익숙한 IDE 를 사용하지 않고 리눅스에서 컴파일하는 방법을 알아본다.

## lib import 없는 단순 자바파일 컴파일 시
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


## lib import가 필요한 자바파일 컴파일 시
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

```


## 인코딩이 필요한 자바파일 컴파일 시
  : 인코딩을 주면서 컴파일 한다.

```bash
java -cp ".:~/servlet-api.jar" DeInfoView -encoding UTF-8

```

## 참고) 실시간 이슈
### 외부 jar 파일을 추가하여 컴파일하는 방법
  : 자바실행시 lib를 임포트했는데도 안되면 다음과 같이 해본다.

```bash
SERVLET_API_HOME=~/
export LD_LIBRARY_PATH=$SERVLET_API_HOME

# 성공! 이제는 된다.
java -cp ".:~/servlet-api.jar DeInfoView

```

