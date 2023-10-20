---
title:  "Linux find 명령어"
excerpt: "Linux find 명령어 입니다."

categories:
  - linux
tags:
  - [Linux, Ubuntu, Raspbian]

toc: true
toc_sticky: true

last_modified_at: 2021-10-23T20:00:00-05:00
---


### 파일 찾기(모든 하위 디렉토리를 탐색)
```bash
find /path/to/directory -type f -name "파일명"

```
```bash
find /home/user/documents -type f -name "*.txt"

```

### 특정문자열 포함된 모든 파일 찾기(모든 하위 디렉토리를 탐색)
```
find /경로/ -type f -exec grep -l '홍길동' {} +

```

> 💡 자꾸 잊어버려서 포스팅  

