---
title:  "루비(Ruby)로 지킬(Jekyll) 사용하는 방법"
excerpt: "지킬(Jekyll)을 로컬로 실행하기 위해 루비(Ruby)를 설치한다."
categories:
  - gitpages-dev
tags:
  - [git, github, dev]
toc: true
toc_sticky: true
last_modified_at: 2022-10-23T20:00:00-05:00
---
## 루비(Ruby)

### 루비(Ruby) 이란?
Jekyll 은 Ruby 기반의 심플하고 블로그 지향적인 `정적 사이트 생성기` 컴파일러 이다. 
루비 기반의 Jekyll 은 `GitHub Pages 의 내부 엔진` 으로 있기때문에, Jekyll 페이지/블로그/웹사이트를 GitHub 서버에 무료로 호스팅이 가능하다.  

로컬에서 실행하기 위해서는 루비가 별도로 설치되어있어야 한다.
<br>

### 루비(Ruby) 설치
1. 루비 공식홈페이지 이동 ([https://rubyinstaller.org/](https://rubyinstaller.org/))
2. Download > WITH DEVKIT 항목에서 원하는 버전 선택 
3. 현재기준 `Ruby+Devkit 3.1.2-1 (x64)` 를 다운로드
4. 현재기준 `디폴트` 설치 경로에 설치
  * 각각의 대화상자에서 체크박스 모두 선택 후 Next.. Next..
  
```bash
$ ruby -v 
ruby 3.1.2p20 (2022-04-12 revision 4491bb740a) [x64-mingw-ucrt]
//설치 확인
```
<br>
<br>

## 로컬서버에서 지킬 테마 실행하기
지킬로 만들어진 minimal-mistakes 테마를 루비로 실행하는 법을 알아본다.

1. 테마 다운로드
: 내가 원하는 테마를 사이트에서 고르고 파일을 다운로드 한다. 
  * 현재 포스팅은 지킬의 minimal-mistakes 라는 테마를 채택했다.
  * [https://github.com/mmistakes/minimal-mistakes](https://github.com/mmistakes/minimal-mistakes)
2. 테마를 로컬저장소에 셋팅
: minimal-mistakes 테마 파일을 압축해제하고, 깃페이지가 있는 로컬레파지토리(나의깃허브아이디.github.com) 디렉토리에 모두 붙여넣는다.
  * 예시) C:\Users\user\Desktop\최태호\devgit\blangs.github.io
3. jekyll Ruby Gem 설치
: Ruby를 설치했다면, Ruby를 사용하여 jekyll Gem을 설치한다.
```bash
$ gem install bundler
//jekyll Gem을 설치  
```
4. jekyll 테마와 관련된 bundle 설치
: 테마가 다운된 경로에서 번들 설치를 위한 다음 명령어를 입력 합니다.
```bash
$ bundle install
//아까 넣은 테마와 관련된 bundle 을 모두 설치한다.
```
```bash
$ jekyll -v
jekyll 4.2.2
//설치 확인
```
5. 로컬 서버 실행
: github에 바로 push를 하게 되면 잘못된 커밋도 모두 로그가 남고 번거롭다. 로컬서버로 테스트하면 즉각 반영되고 확인이 가능하므로 편하다.
```bash
$ bundle exec jekyll serve
// 로컬서버실행
// 아래 주소로 접속해서 정상적으로 지킬테마가 적용된 웹사이트가 출력되면 정상.
// http://localhost:4000/ 또는  http://127.0.0.1:4000
```
<br>

### 로컬서버 실행시 Error 유형

- 유형1

```bash
# 에러내용
Configuration file: C:/Users/user/Desktop/최태호/devgit/blangs.github.io/_config.yml
  Dependency Error: Yikes! It looks like you don't have tzinfo or one of its dependencies installed. In order to use Jekyll as currently configured, you'll need to install this gem. If you've run Jekyll with `bundle exec`, ensure that you have included the tzinfo gem in your Gemfile as well. The full error message from Ruby is: 'cannot load such file -- tzinfo' If you run into trouble, you can find helpful resources at https://jekyllrb.com/help/!
jekyll 4.2.2 | Error:  tzinfo

# 해결방법
#  - [깃페이지 루트]/Gemfile 아래 내용 추가
#    gem 'tzinfo'
#    gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]
###########################  
```  

- 유형2

```bash
# 에러내용
C:/Ruby31-x64/lib/ruby/gems/3.1.0/gems/jekyll-4.2.2/lib/jekyll/commands/serve/servlet.rb:3:in `require': cannot load such file -- webrick (LoadError)
        from C:/Ruby31-x64/lib/ruby/gems/3.1.0/gems/jekyll-4.2.2/lib/jekyll/commands/serve/servlet.rb:3:in `<top (required)>'

# 해결방법
#  - webrick 설치
#   $ bundle add webrick
#   $ gem install webrick
#   
###########################  
```
  
