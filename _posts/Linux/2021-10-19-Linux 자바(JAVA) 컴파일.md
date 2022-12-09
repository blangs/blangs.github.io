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
  : 간단하게 서버에서 자바를 수정해야하는 경우가 있다. 리눅스에서 컴파일하는 방법을 알아본다.

### import 없는 단순 자바파일 컴파일 시
  : 라이브러리가 없는 환경에서 컴파일 한다.

1. .java 파일 작성

  ```java
  public class Test {
      /* 테스트코드 입니다. */
      public static void main(String args[]) {
          System.out.println("안녕!");
      }
  }

  ```

2. java 파일 컴파일
  : 컴파일한다.

```bash
# javac [파일명].java


```

3. 컴파일 완료
  : 컴파일 완료했다..class 파일이 떨어졌는지 확인한다.
