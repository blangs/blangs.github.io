---
title:  "github.io 블로그 시작하기"
excerpt: "GitHub Blog 서비스인 github.io 블로그 시작하기로 했다."

categories:
  - Blog
tags:
  - Blog
last_modified_at: 2022-10-17T22:30:00-05:00
---

GitHub Blog 서비스인 github.io 블로그 시작하기로 했다.  
* GitHub Blog 서비스의 이름은 Pages이다.
  * 첫번째 내용
    1. 첫번째 하위(기본)
      ```
      public void plus() {
        int a = 1;
        int b = 2;
        system.out.println(a+b);
      }
      ```
    2. 첫번째 하위(자바)
      ```java
      public void plus() {
        int a = 1;
        int b = 2;
        system.out.println(a+b);
      }
      ```
    3. 첫번째 하위(sql)
      ```sql
      public void plus() {
        int a = 1;
        int b = 2;
        system.out.println(a+b);
      }
      ```

  * 두번째 내용(인용부호구문)
    1. 두번째 하위(기본)
      > 인용 부호 구문입니다 안녕하세요1  
      > 인용 부호 구문입니다 안녕하세요2  
      > 인용 부호 구문입니다 안녕하세요3  
    2. 두번째 하위(잘못된사용)
      > 인용 부호 구문입니다 안녕하세요1  
        > 인용 부호 구문입니다 안녕하세요2
          > 인용 부호 구문입니다 안녕하세요3
    3. 두번째 하위(트리이해)
      > 인용 부호 구문입니다 안녕하세요1
      > > 인용 부호 구문입니다 안녕하세요2
      > > > 인용 부호 구문입니다 안녕하세요3
    4. 두번째 하위(포함)
      이 안에서는 다른 마크다운 요소를 포함할 수 있다.
      > ### This is a H3 (H3포함)
      > * List (*를사용)
      >      	```
      >      	code (코드블럭사용)
      >      	```
  * 세번째 내용(작성중)
    1. 세번째 하위
    2. 세번째 하위
    3. 세번째 하위


Pages가 다른 블로그 플랫폼 보다 편한 것 같아서 마음에 든다.
다른 사람들도 같이 많이 사용했으면 좋겠다는 생각이 든다.

YFM에서 정의한 제목을 이중 괄호 구문으로 본문에 추가할 수 있다.
이 글의 제목은 {{ page.title }}이고
마지막으로 수정된 시간은 {{ page.last_modified_at }}이다.
