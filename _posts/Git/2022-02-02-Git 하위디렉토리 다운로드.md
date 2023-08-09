---
title:  "Git 하위디렉토리 다운로드"
excerpt: "Git 하위디렉토리 다운로드 입니다."

categories:
  - git
tags:
  - [git, gitgub]

toc: true
toc_sticky: true

last_modified_at: 2022-02-02T20:00:00-05:00
---


### STEP1. Clone 대상 로컬 저장소 생성
```bash
git init "로컬저장소명"
cd "로컬저장소명"

```

### STEP2. sparse Checkout 을 True 로 설정

```bash
# 일부 경로의 파일만 다운로드 가능하도록 한다.
git config core.sparseCheckout true

```

### STEP3. 다운로드 할 원격 저장소 주소 설정
```bash
  git remote add -f origin "원격저장소주소"

```

### STEP4 .git/info/sparse-checkout 파일 기술
```bash
# 다운로드 받길 원하는 폴더나 파일의 경로를 기술한다
# 폴더일 경우, 자동으로 하위 폴더가 포함된다.
echo "파일및폴더경로" >> .git/info/sparse-checkout

```

### STEP5. git pull (sparse-checkout 기술된 경로의 파일만 다운)
```bash
git pull origin main

```


> 💡 자꾸 잊어버려서 포스팅  

