---
title:  "Linux 검색 명령어"
excerpt: "Linux 검색 명령어 입니다."

categories:
  - linux
tags:
  - [Linux, Ubuntu, Raspbian]

toc: true
toc_sticky: true

last_modified_at: 2021-10-23T20:00:00-05:00
---


## find : 파일명 으로 찾기
```bash
find . -type f -name "파일명"
find . -type f -name "*.txt"

```

> 💡 기본적인 명령어  

## find : 특정문자열이 포함된 파일 이름을 찾기
```bash

find . -type f -exec grep -l '홍길동' {} +   #파일명만 출력.

```

> 💡 문자열을 재귀적으로 탐색하며 파일명만 간단하게 볼 수 있음.  



## find : 특정날짜 이후 검색하기
```bash
find . -type f ! -name "*.log" -newermt '2018-10-10'
find /특정폴더 -type f -newermt 2018-10-10 ! -newermt 2018-10-11

```

> 💡 특정날짜 이후 및 이전  


## grep : 특정문자열이 포함된 파일 이름+내용(중략) 찾기
```bash
# 전체검색 결과
grep -r 'wso2carbonMethod' .

# 특정 확장자 제외검색 
grep -r --exclude="*.log" 'wso2carbonMethod' .
grep -r --exclude="*.log" --exclude="*.xml" 'wso2carbonMethod' .
```

> 💡 특정날짜 이후 및 이전   
> 💡 자꾸 잊어버려서 포스팅    

