---
title:  "Linux tree 명령어"
excerpt: "Linux tree 명령어 입니다."

categories:
  - linux
tags:
  - [Linux, Ubuntu, Raspbian]

toc: true
toc_sticky: true

last_modified_at: 2022-10-25T20:00:00-05:00
---

## tree 사용법
### 특정 확장자 필터링  
```bash
tree . -P '*.xml'

```

> ❗정리   
> 💡 .xml 확장자를 가진 파일만 필터링  


### 패턴 필터링  
```bash
tree /경로/ -P '*.xml' -I '패턴1|패턴2|...'

```

> ❗I 플래그를 사용하여 특정 패턴을 제외  
> 💡 .xml 확장자를 가진 파일만 필터링  
> 💡 '패턴1|패턴2|...' 부분에 원하는 패턴을 파이프(|)로 구분하여 추가  