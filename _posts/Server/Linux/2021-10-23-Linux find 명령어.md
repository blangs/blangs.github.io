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
find ./ -type f -name "파일명"
find ./ -type f -name "*.txt"

```

## find : 특정문자열이 포함된 파일 이름을 찾기
```bash

find ./ -type f -exec grep -l '홍길동' {} +   #파일명만 출력.

```

## grep : 특정문자열이 포함된 파일 이름+내용(중략) 찾기
```bash
# 전체검색 결과
grep -r 'wso2carbonMethod' ./

# 특정 확장자 제외검색 
grep -r --exclude="*.log" 'wso2carbonMethod' ./
grep -r --exclude="*.xml" --exclude="*.log" 'wso2carbonMethod' ./
```


> 💡 자꾸 잊어버려서 포스팅  

