---
title:  "Linux 톰캣 root 계정이 아닌 계정으로 실행하기"
excerpt: "Linux 톰캣 root 계정이 아닌 계정으로 실행하기 입니다."

categories:
  - linux
tags:
  - [Linux, Ubuntu, Raspbian]

toc: true
toc_sticky: true

last_modified_at: 2023-08-20T20:00:00-05:00
---

## 개요
root 계정으로 운영중인 WAS(톰캣)를 다른 계정으로 실행해야하는 상황이 발생했다.


## STEP1. 톰캣 전용 계정의 그룹정보 생성
### 1. 계정 확인
```bash
#현재 기본적인 상태
id mfx000
uid=1001(mfx000) gid=1001(mfx000) groups=1001(mfx000)

```

### 2. 그룹 생성
```bash
sudo groupadd grmfx
sudo groupadd wheel

```

### 3. 기타그룹 추가
```bash
sudo usermod -a -G grmfx, wheel

# 확인 (자신 이외의 새로운 그룹 2개 안에도 포함시켰다.)
id mfx000
uid=1001(mfx000) gid=1001(mfx000) groups=1001(mfx000), 1002(grmfx), 1003(wheel)

```

> ❗정리  
> 💡 mfx000 계정으로 톰캣을 실행하기 위해  
> 💡 mfx000 계정을 grmfx 그룹안에 포함시켰다.  



## STEP2. 아파치톰캣 디렉토리 전체 소유권변경
### 1. chwon 수행
```bash
sudo chown -R root:grmfx apache-tomcat

```

### 2. 확인
그룹의 소유권 권한이 내부 디렉토리 레벨까지 변경되었는지 재차 확인한다. 
- mfx000 계정이 권력을 행사할 수 있다. (즉, sudo를 붙이지 않아도 된다)
- 톰캣의 모든 파일에 대해 소유그룹을 grmfx 으로 지정해뒀기 때문이다.  


### 3. mfx000 으로 톰캣실행 (==> 실패한다.)
```bash
startup.sh # 퍼미션에러 발생

```

> ❗정리  
> 💡 파일들의 권한들을 보면 각각 권한들이 제한적이다.  
> 💡 권한들을 하나씩 해결해보자  



## STEP3. 🎆아파치톰캣 logs 디렉토리 (쓰기) 권한 부여
### 1. sudo chmod -R g+w [아파치경로/logs]
```bash
# 그룹(g)에 쓰기(w)권한 부여
sudo chmod -R g+w logs/

```
  
### 2. 확인
```bash
drwxrwx--- 2 cmadmin grmfx 57344 10월 18 09:31 logs  #정상반영

```

### 3. mfx000 으로 톰캣실행 (==> 성공한다. 하지만 이상하다.)
```bash
# started 는 된다.
startup.sh 

# 안나온다.. 왜지?
ps -ef | grep tomcat 

# 이 명령어로 정말 실행되었는지 확인할 수 있다고 한다.  
# 하지만 안나온다.
w3m http://localhost:8080 

```

> ❗정리   
> 💡 logs 디렉토리말고 권한부여가 필요한 곳이 존재한다는 뜻이다.  



## STEP3. 🎆아파치톰캣 conf 디렉토리 (읽기), (실행) 권한 부여
### 1. sudo chmod -R g+rx [아파치경로/conf]
```bash
# 그룹(g)에 읽기(r)와 실행(x)권한 부여
sudo chmod -R g+rx conf/ 

```


### 2. 확인
```bash
drwxr-x--- 2 cmadmin grmfx 57344 10월 18 09:31 conf  #정상반영

```

### 3. mfx000 으로 톰캣실행 (==> 성공한다.)
```bash
# 성공
startup.sh 
w3m http://localhost:8080 

```



## 실제 테스트해보기

```bash
# 그룹생성
sudo groupadd grmfx  #생성 후 id설정은 직접 /etc/group 에서 했음.

# 계정생성
# (m:사용자명으로 자동생성, d: 디렉토리지정 skel 내용도 이기준으로 생성됨을 확인, g:그룹)
sudo useradd -m -d /fshome/mfx000 -g grmfx -u 1005 mfx000  

#################  반영 ##################################
# (mfx000 계정이 접근,실행하기 위해 필요 부분만 권한부여)
chmod 755 apache-tomcat-8.5.82/
chmod 755 /fswas/tomcat/apache-tomcat-8.5.82/bin/
chmod 755 startup.bat
chmod 755 startup.sh
#########################################################


# 테스트
su mfx000
sh startup.sh
/bin/sh: 0: Cant open ./catalina.sh  # 실패


#################  반영 ##################################
chmod 755 /fswas/tomcat/apache-tomcat-8.5.82/bin/catalina.sh
#########################################################


# 테스트
su mfx000
sh startup.sh
Cannot find /fswas/tomcat/apache-tomcat-8.5.82/bin/setclasspath.sh
This file is needed to run this program


#################  반영 ##################################
chmod 755 /fswas/tomcat/apache-tomcat-8.5.82/bin/setclasspath.sh
#########################################################


# 테스트
su mfx000
sh startup.sh
Using CATALINA_BASE:   /fswas/tomcat/apache-tomcat-8.5.82
Using CATALINA_HOME:   /fswas/tomcat/apache-tomcat-8.5.82
Using CATALINA_TMPDIR: /fswas/tomcat/apache-tomcat-8.5.82/temp
Using JRE_HOME:        /usr/lib/jvm/java-8-openjdk-armhf
Using CLASSPATH:       /fswas/tomcat/apache-tomcat-8.5.82/bin/bootstrap.jar:/fswas/tomcat/apache-tomcat-8.5.82/bin/tomcat-juli.jar
Using CATALINA_OPTS:
touch: cannot touch '/fswas/tomcat/apache-tomcat-8.5.82/logs/catalina.out': 허가 거부
./catalina.sh: 504: ./catalina.sh: cannot create /fswas/tomcat/apache-tomcat-8.5.82/logs/catalina.out: Permission denied


#################  반영 ##################################
# (로그 디렉토리에 쓰기권한 부여)
sudo chown -R wasadm:grmfx /fswas/tomcat/apache-tomcat-8.5.82/logs/
sudo chmod -R 775 /fswas/tomcat/apache-tomcat-8.5.82/logs 
#########################################################


# 테스트 (쓰기권한주고 하니까 성공)
sh ./bin/startup.sh
Using CATALINA_BASE:   /fswas/tomcat/apache-tomcat-8.5.82
Using CATALINA_HOME:   /fswas/tomcat/apache-tomcat-8.5.82
Using CATALINA_TMPDIR: /fswas/tomcat/apache-tomcat-8.5.82/temp
Using JRE_HOME:        /usr/lib/jvm/java-8-openjdk-armhf
Using CLASSPATH:       /fswas/tomcat/apache-tomcat-8.5.82/bin/bootstrap.jar:/fswas/tomcat/apache-tomcat-8.5.82/bin/tomcat-juli.jar
Using CATALINA_OPTS:
Tomcat started.


# 실행은 되었는데 뭔가 이상함.. 실제 프로세스는 안띄워짐!!!!
ps -ef | grep java 
wasadm    5676  5674  0 11:47 pts/0    00:00:00 grep java

# 에러 로그 확인 해보기...
20-Oct-2023 11:58:01.164 경고 [localhost-startStop-2] org.apache.catalina.loader.WebappClassLoaderBase.clearReferencesThreads 웹 애플리>케이션 [bck]이(가) [mysql-cj-abandoned-connection-cleanup](이)라는 이름의 쓰레드를 시작시킨 것으로 보이지만, 해당 쓰레드를 중지시키지 못했습니다. 이는 메모리 누수를 유발할 가능성이 큽니다. 해당 쓰레드의 스택 트레이스:                                                        java.lang.Object.wait(Native Method)
 java.lang.ref.ReferenceQueue.remove(ReferenceQueue.java:144)                                                                            com.mysql.cj.jdbc.AbandonedConnectionCleanupThread.run(AbandonedConnectionCleanupThread.java:91)
 java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149)                                                         java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624)
 java.lang.Thread.run(Thread.java:748)                                                                                                  20-Oct-2023 11:58:01.180 정보 [main] org.apache.catalina.ha.deploy.FarmWarDeployer.stop 클러스터 FarmWarDeployer가 중지되었습니다.
20-Oct-2023 11:58:01.283 정보 [main] org.apache.coyote.AbstractProtocol.stop 프로토콜 핸들러 ["ajp-nio-0.0.0.0-18009"]을(를) 중지시킵니>다.                                                                                                                                     20-Oct-2023 11:58:01.287 정보 [main] org.apache.coyote.AbstractProtocol.destroy 프로토콜 핸들러 ["ajp-nio-0.0.0.0-18009"]을(를) 소멸시킵니다.                                                                                                                                   오류: 기본 클래스 org.apache.catalina.startup.Bootstrap을(를) 찾거나 로드할 수 없습니다.

# 리서치 해본 결과
# ==> MySql 기준으로 MySql JDBC Driver는 응용프록램간 공유되는 드라이버가 있어야 한다.
# ==> 그렇지 않고 위와 같이 되어 있으면 Tomcat에서 Driver를 구동할 수 없기 때문에 나오는 에러. 


#################  반영 ##################################
sudo chmod -R 755 /fswas/tomcat/apache-tomcat-8.5.82/lib
#########################################################


# 테스트 (오류가 많이 사라졌다.!)
sh ./bin/startup.sh
오류: 기본 클래스 org.apache.catalina.startup.Bootstrap을(를) 찾거나 로드할 수 없습니다.

# 리서치해본결과 위 내용은 boostrab.jar 를 못찾아서 그허다. 
# 톰캣/bin 안에 들어있는데.. PATH 환경변수가 안잡혀있는것같다. 어디서든 실행되도록 잡도록하자.


#################  반영 ##################################
sudo vi /etc/profile
# TOMCAT
export TOMCAT_HOME=/fswas/tomcat/latest
export PATH=$PATH:$TOMCAT_HOME/binexport PATH=$PATH:$TOMCAT_HOME/bin
#########################################################


# 테스트(똑같다.. 이 문제가아니라 못읽나보다.)
sh ./bin/startup.sh
오류: 기본 클래스 org.apache.catalina.startup.Bootstrap을(를) 찾거나 로드할 수 없습니다.


#################  반영 ##################################
sudo chmod -R 755 /fswas/tomcat/apache-tomcat-8.5.82/bin/bootstrap.jar
#########################################################


# 테스트(새로운오류다!)
Exception in thread "main" java.lang.NoClassDefFoundError: org/apache/juli/logging/LogFactory
        at org.apache.catalina.startup.Bootstrap.<clinit>(Bootstrap.java:50)
Caused by: java.lang.ClassNotFoundException: org.apache.juli.logging.LogFactory
        at java.net.URLClassLoader.findClass(URLClassLoader.java:387)
        at java.lang.ClassLoader.loadClass(ClassLoader.java:418)
        at sun.misc.Launcher$AppClassLoader.loadClass(Launcher.java:352)
        at java.lang.ClassLoader.loadClass(ClassLoader.java:351)
        ... 1 more


#################  반영 ##################################
sudo chmod 755 ./apache-tomcat-8.5.82/bin/tomcat-juli.jar


# 테스트(또 새로운 오류다!)
20-Oct-2023 14:36:35.291 심각 [Catalina-startStop-1] org.apache.catalina.core.ContainerBase.startInternal 자식 컨테이너를 시작 중 실패했습니다.
        java.util.concurrent.ExecutionException: org.apache.catalina.LifecycleException: 구성요소 [org.apache.catalina.webresources.StandardRoot@cf29b1]을(를) 시작하지 못했습니다.
                at java.util.concurrent.FutureTask.report(FutureTask.java:122)
                at java.util.concurrent.FutureTask.get(FutureTask.java:192)


#################  반영 ##################################
chmod -R 755 /fswas/tomcat/apache-tomcat-8.5.82/webapps


# 테스트(웹어플리케이션 쪽을 모두 읽기 실행권한을 주었더니 된다.)
## 웹어플리케이션 쪽을 모두 읽기 실행권한을 주었더니 된다.!!
sh $TOMCAT_HOME/bin/startup.sh
ps -ef | grep java
mfx000    8956     1  5 14:51 pts/1    00:00:05 /usr/lib/jvm/java-8-openjdk-armhf/bin/java -Djava.util.logging.config.file=/fswas/tomcat/latest/conf/logging.properties -Djava.util.logging.manager=org.apache.juli.ClassLoaderLogManager -Djdk.tls.ephemeralDHKeySize=2048 -Djava.protocol.handler.pkgs=org.apache.catalina.webresources -Dorg.apache.catalina.security.SecurityListener.UMASK=0027 -Dignore.endorsed.dirs= -classpath /fswas/tomcat/latest/bin/bootstrap.jar:/fswas/tomcat/latest/bin/tomcat-juli.jar -Dcatalina.base=/fswas/tomcat/latest -Dcatalina.home=/fswas/tomcat/latest -Djava.io.tmpdir=/fswas/tomcat/latest/temp org.apache.catalina.startup.Bootstrap start
mfx000    8998  8996  0 14:53 pts/1    00:00:00 grep java

```





## 정리
tomcat을 실행할때 root계정이냐, tomcat user계정이냐가 중요하며, Ap파일의 권한은 tomcat jvm이 읽을 수만 있으면 된다 즉. Ap파일을 root계정으로 작업 해도 실제 tomcat을 구동한 계정만 획득되기 때문 왜냐면 comtainer가 해당 파일일 읽고 컴파일 하는데 tomcat을 실행한 user로 수행중이기 때문..