---
title: "MarkDown Example"
categories:
  - 정리
use_math: true
layout: single
author_profile: true
read_time: true
comments: true
share: true
related: true
toc: true
toc_sticky: true
toc_label: Table of contents
---

# 내가 보려고 만든 마크다운 문법 가이드

**목차이자 목차(내부링크) 만드는법**

- 내부링크

```
사용문법: [Title](#이동할위치의 텍스트(띄어쓰기는 '-'))
적용예: [1.제목과 호라이즌](#1.제목과-호라이즌)
```

## 목차

[제목과 호라이즌](#제목과-호라이즌)  
[리스트와 인용구](#리스트와-인용구)  
[문자강조](#문자강조)  
[링크와 이미지](#링크와-이미지)  
[코드블럭과 테이블](#코드블럭과-테이블)  
[텍(TeX)](#텍)

# 제목과 호라이즌

- 제목(헤더): #으로 크기를 지정함 #이 많을 수록 크키가 작아짐 (h1~h6까지)
- 호라이즌: '\*','-','\_' 기호들중 아무거나 연속으로 3번 쓰면됨

```
예시
# this is h1
## this is h2
### this is h3
#### this is h4
##### this is h5
--- (h5와 h6사이에 줄(호라이즌)이 간걸 확인 할 수 있다)
###### this is h6
```

# this is h1

## this is h2

### this is h3

#### this is h4

##### this is h5

---

###### this is h6

---

# 리스트와 인용구

## 리스트

### ● 순서있는 목록(번호)

순서있는 목록은 숫자와 점을 사용한다

```
예시
1. 첫번째
2. 두번째
3. 세번째
```

1. 첫번째
2. 두번째
3. 세번째

### ● 순서없는 목록(글머리 기호: `*`, `+`, `-` )

```
예시
- 빨강
  - 녹색
    - 파랑
```

- 빨강
  - 녹색
    - 파랑

혼합해서 사용하는 것도 가능함

```
* 1단계
  - 2단계
    + 3단계
      + 4단계
```

- 1단계
  - 2단계
    - 3단계
      - 4단계

## 인용구(BlockQuote)

어떤 부분을 인용하거나 강조 하고 싶을때 사용

```
> This is a first blockqute.
>> This is a second blockqute.
>>> This is a third blockqute.

```

> This is a first blockqute.
>
> > This is a second blockqute.
> >
> > > This is a third blockqute.

이 안에서는 다른 마크다운 요소를 포함할 수 있다

> ### This is a H3
>
> - List
>   `textbox`

## 개행

문장줄바꾸기

- 스페이스바 최소 2번

## 문자강조

```
*single asterisks* 이텔릭체
_single underscores_
**double asterisks** 볼드체
__double underscores__
~~cancelline~~ 취소선
```

> - _single asterisks_
> - _single underscores_
> - **double asterisks**
> - **double underscores**
> - ~~cancelline~~

> `문장 중간에 사용할 경우에는 **띄어쓰기** 를 사용하는 것이 좋음`  
> 문장 중간에 사용할 경우에는 **띄어쓰기**를 사용하는 것이 좋음

## 링크와 이미지

## 링크

- 자동연결- 가장 간단

```
일반적인 URL 혹은 이메일주소 적기(좀더 명시하기 위해 <>로 감싸줌)

* 외부링크: <http://example.com/>
* 이메일링크: <address@example.com>

```

- 외부링크: <http://example.com/>
- 이메일링크: <address@example.com>

---

- 외부링크

```
사용문법: [Title](URL)
적용예: [Google](https://google.com, "google link")

```

Link: [Google](https://google.com)

## 이미지

```
![Alt text](/path/to/img.jpg)
![Alt text](URL)
![Alt text](/path/to/img.jpg "Optional title")
![Alt text](URL "Optional title")
이미지 크기를 조절 하기 위해 주로 쓰는 방식
<img src = "/path/to/img.jpg" width="400px" height="300px" title="px(픽셀) 크기 설정" >

```

## 코드블럭과 테이블

## 코드블럭

" ` " 기호를 1번 또는 3번씩 써서 감싸준다 또한 어떤 언어인지 명시도 가능하다
(사실 코드는 주피터노트북에서 실행후 마크다운으로 변환해 가져오기 때문에 잘 안쓴다)

````
```python
print("hello world")
``` 파이썬이라 하면
````

```python
print("hello world")
```

## 테이블

테이블은 "|" (수평선,vertical var이다 백슬래쉬+shift)와 "----" 으로 만들수있다

```
|제목|내용|설명|
|---|---|---|
|o|o|o|
|o|x|o|

```

| 제목 | 내용 | 설명 |
| ---- | ---- | ---- |
| o    | o    | o    |
| o    | x    | o    |

간단한 셸 명령어를 표로 만들어 보았다

| <center>명령</center>              |      <center>윈도우 셸</center>      | <center>맥/ 리눅스 셸</center> |
| :--------------------------------- | :----------------------------------: | -----------------------------: |
| **화면지우기**                     |        <center>cls </center>         |                       _ctrl+l_ |
| **현재 디렉터리 이름 출력**        |         <center>cd </center>         |                          _pwd_ |
| **현재 디렉터리의 파일 목록 출력** |        <center> dir </center>        |                     _ls -Fcal_ |
| **한 칸 위의 디렉터리로 이동**     |       <center>cd .. </center>        |                       _cd ../_ |
| **한 칸 아래의 디렉터리로 이동**   |  <center>cd 디렉터리이름 </center>   |             _cd 디렉터리 이름_ |
| **파일 지우기**                    |    <center>del 파일이름 </center>    |                  _rm 파일이름_ |
| **디렉터리 만들기**                | <center>mkdir 디렉터리이름 </center> |           _mkdir 디렉터리이름_ |
| **디렉터리 지우기**                | <center>rmdir 디렉터리이름 </center> |           _rmdir 디렉터리이름_ |
| **셀 나가기**                      |        <center>exit </center>        |                         _exit_ |
| **홈디렉터리 이동**                |   <center>cd %HOMEPATH% </center>    |                         _cd ~_ |

## 텍

수식을 표현 할 수 있다  
[자세한 문법은 여기서!](https://en.wikibooks.org/wiki/LaTeX/Mathematics)  
[아니면 여기서!](https://ko.wikipedia.org/wiki/%EC%9C%84%ED%82%A4%EB%B0%B1%EA%B3%BC:TeX_%EB%AC%B8%EB%B2%95)  
주피터 노트북에서는 수식을 `$` (문장안에서 인라인) 또는 `$$` (독립된 디스플레이) 기호로 감싸주고 문자를 표기하려면 \를 붙힌다.

```
예)
$\alpha = \beta$

$y=x^2$

$e^{i\pi} + 1 = 0$

$e^x=\sum_{i=0}^\infty \frac{1}{i!}x^i$

$\frac{n!}{k!(n-k)!} = {n \choose k}$


```

$\alpha = \beta$

$y=x^2$

$e^{i\pi} + 1 = 0$

$e^x=\sum_{i=0}^\infty \frac{1}{i!}x^i$

$\frac{n!}{k!(n-k)!} = {n \choose k}$
