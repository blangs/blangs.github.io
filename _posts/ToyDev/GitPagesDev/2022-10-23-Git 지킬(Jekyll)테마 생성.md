---
title:  "지킬(Jekyll) 테마 적용"
excerpt: "깃페이지(Git Pages) 블로그에 지킬(Jekyll) 테마를 적용한다."
categories:
  - gitpages-dev
tags:
  - [git, github, dev]
toc: true
toc_sticky: true
last_modified_at: 2022-10-23T20:00:00-05:00
---
## 지킬(Jekyll)

### 지킬(Jekyll) 이란?
Jekyll 은 Ruby 기반의 심플하고 블로그 지향적인 `정적 사이트 생성기` 이다. 

* Jekyll에서 정의해 놓은 규칙에 따라 마크업 언어(Liquid 기능이 추가된 HTML, Markdown 등)로 작성한 문서에 Markdown 등의 변환기와 Liquid 렌더러를 통해 가공하여만든 레이아웃으로 `정적 사이트` 를 만들어 준다.
* 정적 사이트 엔진은 Hugo, Hexo, Gatsby 등 수백가지가 존재 하지만 Jekyll 은 `GitHub Pages 의 내부 엔진` 으로 있기때문에, Jekyll 페이지/블로그/웹사이트를 GitHub 서버에 무료로 호스팅이 가능하다.
<br>

### 지킬(Jekyll) 사용하는 이유
다음과 같은 장점이 있다.
- GitHub Pages를 통해 무료로 내가 만든 웹페이지를 인터넷상에 공개 할 수 있다.
- 마크다운을 통해 손쉽게 글을 작성할 수 있습니다.
- 테마, 플러그인이 다수 존재하고, 커스터마이징이 가능하다.
<br>

### 지킬(Jekyll) 테마
- Jekyll theme은 다른 사용자들이 이미 구성해놓은 template이다.
- 현재기준 무료 theme 중에 Jekyll theme에서 많이 사용되고 있는 인기있는 minimal-mistakes를 채택했다.
  - [https://github.com/mmistakes/minimal-mistakes](https://github.com/mmistakes/minimal-mistakes)
<br>
<br>

### 지킬(Jekyll) 테마 설치
지킬로 만들어진 minimal-mistakes 테마를 루비로 실행하는 법을 알아본다.

1. 테마 다운로드
: 내가 원하는 테마를 사이트에서 고르고 파일을 다운로드 한다. 
  * 현재 포스팅은 지킬의 minimal-mistakes 라는 테마를 채택했다.
  * [https://github.com/mmistakes/minimal-mistakes](https://github.com/mmistakes/minimal-mistakes)

2. 테마를 로컬저장소에 셋팅
: minimal-mistakes 테마 파일을 압축해제하고, 깃페이지가 있는 로컬레파지토리(나의깃허브아이디.github.com) 디렉토리에 압축된 폴더 내의 파일들을 모두 붙여넣는다.

3. GitHub(원격레파지토리)에 테마 올리기
: 실제 호스팅서비스가 되고있는 GitHub의 원격레파지토리로 업로드 한다.
```bash
$ git add .
// Git Bash를 실행한 후, 아래 코드와 같이 수정한 파일을 포함한 모든 파일을 로컬 저장소에 업로드 한다.  
//설치 확인
$ git commit -m "updates"
// 수정된 파일들을 로컬저장소에 커밋  
$ git push
// 로컬저장소에 커밋된 파일을 `원격저장소`에 업로드한다.  
// 업로드 도중 본인의 GitHub 아이디와 비밀번호 인증을 통과해야 업로드가 성공적으로 완료된다.  
```

4. 테마 정상작동 확인
: 원격레파지토리 서버에서 실제로 `push` 가 반영되고 정상 작동하는지 확인한다.  
http://localhost:4000/ 또는  http://127.0.0.1:4000