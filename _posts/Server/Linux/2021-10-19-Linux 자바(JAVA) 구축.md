---
title:  "Linux 자바(JAVA) 구축"
excerpt: "Linux 자바(JAVA) 구축 입니다."

categories:
  - linux
tags:
  - [Linux, Ubuntu, Raspbian]

toc: true
toc_sticky: true

last_modified_at: 2022-10-12T20:00:00-05:00
---

## JDK
  : 자바를 사용하기 위해서는 JDK 가 필요하다. (설치방법 생략)

### Oracle JDK
  : 우리가 흔히 개발에 사용하는 JDK (Java Development Kit)이다. Java 플랫폼 프로그래밍에 사용되는 소프트웨어 개발 도구이자 환경이다.

### Open JDK
  : OpenJDK는 Java SE Platform Edition의 무료 오픈 소스 구현이다.

### Oracle JDK 와 OpenJDK 차이
  : OpenJDK 에는 JavaFX가 포함되지 않았다. (별도로 OpenJFX라는게 나온다고는 한다.) 이것 외에는 큰 차이는 없는듯하다. 개발비 충당도 있겠지만, 더 중요한건   오라클JDK에도 일부 타사의 유료 라이브러리가 쓰였다는 것이다. OpenJDK는 그 유료 라이브러리를 다른걸로 대체해 구현했거나 빼버렸다.

> Oracle jdk 가 유료로 바뀌어서 openjdk로 많이 바꾸는 추세라고 한다.
> 즉, 일부 라이브러리를 제외하곤 큰 차이는 없다.

## 자바(JAVA) 구축
### JDK 설치
  : 다음과 같이 설치한다.

```bash
# 설치 가능한 목록을 조회.
java-version  

# 설치
apt-get install openjdk-8-jdk  

# 설치완료 확인
java -version 

```

### JAVA 설치된 경로 찾기
  : 설치를 완료하면 어디서든 사용할 수 있도록 환경변수를 잡아야한다.

```bash
# 자바 명령어파일 위치찾기
which javac
/usr/bin/javac

# 자바 명령어파일 실제 경로 찾기
readlink -f /usr/bin/javac
/usr/lib/jvm/java-8-openjdk-armhf/bin/javac

# 자바가 설치된 실제경로를 찾았다!
# /usr/lib/jvm/java-8-openjdk-armhf/

```

> **which**  
> : 위치를 찾아주는 명령어. 버전마다 폴더명이 다르다. 결과는 폴더가 아닌 명령어 파일의 경로이다. 그래서 자바가 설치된 경로는 명령어파일이 속한 폴더가 된다. 하지만 지금은 심볼릭링크가 걸려있어 못보는 상황이다.
>  
> **readlink -f**  
> : witch로 찾은 파일에 걸린 심볼릭링크의 실제경로를 출력한다. javac 파일이 나오게되며 파일을 포함하고있는 폴더가 자바가 설치된 경로가 된다.


### JAVA 환경변수 설정
  : 설치된 경로를 찾았으면 환경변수를 설정을 할 수 있다.

```bash
# 환경변수 설정파일 열기
sudo vi /etc/profile

# 최하단에 작성하고 저장
# (일단보류)export CLASS_PATH=$JAVA_HOME/lib:$CLASS_PATH
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-armhf  # 자바설치경로
export PATH=$PATH:$JAVA_HOME/bin


# 반영
source /etc/profile

```

> **/etc/profile**  
> user가 쉘에 로그인 하게 되면 가장 먼저 `/etc/profile` 파일을 읽는다. `/etc/profile` 파일에는 USER, LOGNAME, HOSTNAME 등의 쉘 변수들이 선언되어 있다.
> `/etc/profile` 파일을 통해 이러한 시스템 전영 쉘 변수들을 초기화한다. 그 다음으로 전역 리드라인 초기화 파일인 /etc/inputrc 파일을 읽고, 기타 특수 프로그램들의 전역 환경 설정 파일을 포함하고 있는 /etc/profile.d 디렉터리를 읽는다.


## 테스트
  : 정상적으로 반영되었는지 테스트 한다.

```bash
# 어느 경로에서든 환경변수가 잘 출력된다.

# 1. echo 으로 환경변수 출력 
echo $JAVA_HOME
/usr/lib/jvm/java-8-openjdk-armhf


# 2. env 으로 환경변수 출력
env
JAVA_HOME=/usr/lib/jvm/java-8-openjdk-armhf
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/local/games:/usr/games:/snap/bin:/usr/lib/jvm/java-8-openjdk-armhf/bin

```

