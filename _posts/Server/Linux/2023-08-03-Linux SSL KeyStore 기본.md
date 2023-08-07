---
title:  "Linux SSL KeyStore 기본"
excerpt: "Lunux SSL KeyStore 기본 입니다."

categories:
  - linux
tags:
  - [Linux, Ubuntu, Raspbian]

toc: true
toc_sticky: true

last_modified_at: 2022-10-22T20:00:00-05:00
---

## 개요
## 목적
제 경우엔 회사 네트워크를 사용하려면 사설 인증서를 등록해서 사용하는 환경입니다.

회사 전용 cer 확장자의 인증서 파일을 더블클릭하여 시스템에 인증서를 등록하면 웹브라우저를 비롯한 대부분 프로그램은 문제없이 SSL 통신을 하면서 사용할 수 있습니다.

그러나 자바의 경우엔 시스템에 설치된 인증서가 아닌 자체 인증서 저장소를 가지고 있어서 자바의 Keystore 에 추가하는 작업을 해 주어야 합니다.

자바의 인증서 저장소에 인증서를 추가하지 않으면 자바로 만들어진 개발 툴(Eclipse, IntelliJ, Android Studio 등)를 사용할 때 https 통신 중 SSLHandshakeException, PKIX Exception 등의 오류가 발생하게 됩니다.
  

## JAVA Keytool을 이용한 인증서 등록
### 생성
```bash
keytool -import -keystore "루트인증서 저장소" -file "루트인증서 파일명" -alias "루트인증서 구분용 이름"

```  

```bash
keytool -import -keystore "C:\Program Files\Java\jre1.8.0_251\lib\security\cacerts" -file my_cert.cer -alias my_cert

```

> 💡 명령어를 입력하면 저장소 패스워드를 입력하라고 나오는데 기본 패스워드는 “changeit” 이다.


### 등록 정상 확인
```bash
keytool -list -keystore "C:\Program Files\Java\jre1.8.0_251\lib\security\cacerts"

```
> 등록된 인증서 목록을 조회하여 인증서 등록이 잘 진행되었는지 확인



### 제거
```bash
rm [링크 경로]

```

### 심볼릭링크 무시하고 디렉토리 이동
```bash
# -P 옵션을 사용하면 심볼릭 링크를 무시하고 
# 직접 경로를 따라 원본 디렉터리로 이동.

cd -P ../ 

```