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

## import 없는 단순 자바파일 컴파일 시
  : 라이브러리가 없는 환경에서 컴파일 한다.

### (1) .java 파일 작성

    ```java
    public class Test {
        /* 테스트코드 입니다. */
        public static void main(String args[]) {
            System.out.println("안녕!");
        }
    }

    ```

### (2). java 파일 컴파일
  : 컴파일한다.

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
  : 테스트 용도로 서블릿 라이브러리를 추가 시킨다.

```bash
vi Test.java  # 열어보면

# 상단에 Import 라이브러리를 넣어주었다.
import javax.servlet.http.HttpServlet;

```

### (2). java 파일 컴파일
  : 라이브러리가 포함된 자바파일을 컴파일한다.

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
javac -cp "./servlet-api.jar" Test.java

# 이렇게도 가능
# javac -cp "./*" Test.java 
# javac -cp "./*" Test.java 


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



