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

3. GitHub(원격레파지토리)에 올리기
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
: 원격레파지토리 서버에서 실제로 반영되고 정상 작동하는지 확인한다.  
http://localhost:4000/ 또는  http://127.0.0.1:4000

<br>
<br>

## 루비(Ruby)
지킬은 루비 기반으로 만들어졌기 때문에 로컬에서 CLI으로 핸들링을 원하면 루비 설치가 필요하다.
현재 작성글은 기본적으로 엔진이 탑재된 GitHub를 이용한 방법을 기준으로 작성한다.
- 포스트: [루비(Ruby)로 지킬(Jekyll) 사용하는 방법](http://localhost:4000/gitpages-dev/%EB%A3%A8%EB%B9%84(Ruby)%EB%A1%9C-%EC%A7%80%ED%82%AC(Jekyll)-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95/)
<br>
<br>


<br>


### 로컬서버에서 지킬 테마 실행하기
웹을  구성하는  파일(HTML, CSS, JS ...)이  업로드될  저장소(Repository)를  만들어야  한다.

1. ![image](blangs.github.io/assets/images/ToyDev/GitPagesDev/2022-10-24-assignError.png)
2. new 버튼 > Create a new repository 정보 입력
    * Repository name  
    : 반드시  `사용자이름.github.io` 형태로 작성한다. 이렇게 하면 원래대로면 `https://사용자이름.github.io/저장소이름/` 으로 접속하던것을 저장소이름을 제외하고 `https://사용자이름.github.io/` 처럼 접근이 가능해진다.   

      ***GitHub Pages URL 뒤에 저장소 이름없이 생성하기***  
	  repository생성후 page를 활성화하면 `https://사용자이름.github.io/저장소이름/` 으로 사이트가 생성된다.  
	  `https://사용자이름.github.io/` 주소로 바로 연결되게 하고 싶으면 깃허브 저장소 생성 시 Repository name에 `사용자이름.github.io` 로 생성을 하면 된다.
	  {:  .notice--info}

    * Description  
    : (선택) 자유롭게 기입
    * Public 또는 Private
    : Public 선택
    * Initialize this repo....  
    : 'Add a README file' 공식 가이드에서는 체크표시를 해두라고 하지만, 체크를 하거나 안 하거나 아무 문제 없다.

3. Create repository 버튼 
4. Repository 최종 생성 완료  
<br>

### 브랜치(Branch) 설정
자신이 보여주고자 하는 분기점을 선택해야한다.  
Github Pages의 호스팅 원리는, 해당 리파지토리에 푸시된 브랜치를 루트 폴더로 삼아 호스팅을 하게 된다.  
브랜치 이름은 아무거나 해도 상관없다.

Github Pages에 호스팅하는 브랜치 이름은 관습적으로 gh-pages 라는 이름을 쓴다고 하며, 다른 이름을 써도 무방하다. 
{:  .notice--info}

1. 생성한 Repository 진입 > Settings 탭 > 좌측 Pages 섹션 진입
2. Branch 에서 분기점을 선택한다.
* 기본적으로 main 브런치가 있었다. 없다면 push를 1회 진행해본다.

> #### ***기본 브런치가 안보이는 경우***  
> {: .no_toc}
> a. 생성한 레파지토리 clone 해서 로컬에 최신내용 내려받기  
> b. 루트 폴더에 아래 코드로 index.html 정적파일 생성  
> ```html
> <!DOCTYPE html>
>   <head>
>     <title>Blog by Github Pages</title>
>   </head>
>   <body>
>     <h1>Hello, Pages!</h1>
>   </body>
> </html>
> ```
> c. add, commit, push 진행  
> d. 생성한 Repository 진입 > Settings 탭 > 좌측 Pages 섹션 진입  
> e. Branch 에서 `main` 브런치가 생성되었는지 확인 후 분기점을 선택한다.
<br>
<br>

## Git Pages 정상작동 확인
자신의 깃블로그 주소로 접속하여 결과를 확인하자. 

* `GitHub Pages URL 뒤에 저장소 이름없이 생성하기` GitPage URL 인 경우
    * https://사용자이름.github.io/
* 적용하지 않은 경우
    * https://사용자이름.github.io/저장소이름/