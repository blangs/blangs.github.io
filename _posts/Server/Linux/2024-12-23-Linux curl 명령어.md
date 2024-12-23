---
title:  "Linux curl 명령어"
excerpt: "Linux curl 명령어 입니다."

categories:
  - linux
tags:
  - [Linux, Ubuntu, Raspbian]

toc: true
toc_sticky: true

last_modified_at: 2024-12-23T20:10:00-12:00:00
---


## 리디렉션 없이 간단히 GET 요청 보내기
```bash
curl -v blang.co.kr

```
  
> ❗<span style='color:green'>***설명***</span>  
> 💡 * <span style='color:blue'>-v 옵션은 디버그 모드로, 요청과 응답의 상세 정보를 출력합니다.</span>  
> 💡 * <span style='color:blue'>리디렉션이 발생하면, 응답 헤더에 Location 필드가 표시됩니다.</span>  



## 리디렉션을 따라가며 요청 수행하기
```bash
#LINUX
curl -v -L blang.co.kr

```

> ❗<span style='color:green'>***설명***</span>  
> 💡 * <span style='color:blue'>-L 옵션을 추가하면, 리디렉션을 따라가서 최종 결과를 출력합니다.</span>  
  
  
  
## 추가적인 참고 옵션
### HTTP 헤더 확인
```bash
curl -I blang.co.kr

```

> ❗<span style='color:green'>***설명***</span>  
> 💡 * <span style='color:blue'>-I 옵션은 헤더 정보만 출력합니다.</span>  


### 응답 내용을 파일로 저장
```bash
curl -L blang.co.kr -o output.html

```

