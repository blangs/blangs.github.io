---
title:  "Git 병합충돌 Repo내용으로 pull"
excerpt: "Git 병합충돌 Repo내용으로 pull 입니다."

categories:
  - git
tags:
  - [git, gitgub]

toc: true
toc_sticky: true

last_modified_at: 2022-02-02T20:00:00-05:00
---

## 내용
### STEP1. 최신 Repo(원격브랜치) 내용 GET
```bash
# 원격 브랜치의 최신 변경사항을 가져온다.
# 여기서 origin은 원격 저장소의 이름일 수 있을것이다. (해당 저장소의 이름으로 변경하길..)
git fetch origin

```

### STEP2. 로컬 브랜치를 강제로 Repo(원격브랜치) 내용으로 업데이트

```bash
# 로컬 브랜치를 강제로 원격 브랜치로 업데이트한다. 
git reset --hard origin/<원격-브랜치명>    # origin/main

```

> 💡 위 명령어는 로컬 브랜치의 변경사항을 모두 지우고 원격 브랜치의 최신내용으로 덮어씌우므로 주의.  
> 💡 따라서 이 작업을 수행하기 전에 로컬 브랜치에 필요한 변경 사항을 백업하거나 커밋하여 보존하는 것이 좋다.  

