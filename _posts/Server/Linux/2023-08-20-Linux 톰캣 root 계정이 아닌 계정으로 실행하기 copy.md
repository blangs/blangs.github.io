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

## [필독] root 계정으로 실행한 환경에서..
- root 계정으로 톰캣을 기동하는 동시에 여러곳의 소유권이 변경된다. 
- 이러한 일부파일들로 인해 다른 사용자 계정으로 기동이 되지 않게 된다.
- 권한변환작업 필수다.

## [필독] LDAP 적용한 환경에서...
```bash
# 스프링 웹프로젝트에서 ldap 을 사용하고있음.
# 스프링 웹프로젝트에서 ldap 모듈을 초기화 하는 클래스가 존재.
# 해당 클래스는 jdk의 jre 내부의 rx.jar 라는 파일을 사용하고있음.
chmod 777 /[톰캣이 사용하는 JAVA_HOME]/jre/lib/rx.jar

```

> ❗잠깐)  
> 💡 rx.jar 가 실행되는 원리는 시스템변수이다.   
> 💡 env 에서 톰캣이 사용하는 JAVA_HOME 경로에 대해 등록은 필수다.  



## [공통] 서버기동전용 그룹 생성하기
<span style="color:red"><b>1.현재 계정 정보확인</b></span>  

```bash
# 현재 기본적인 상태
id mfx000
uid=1001(mfx000) gid=1001(mfx000) groups=1001(mfx000)

```

<span style="color:red"><b>2.그룹 생성</b></span>  

```bash
# grmfx 그룹을 생성
sudo groupadd grmfx
sudo groupadd wheel

```

<span style="color:red"><b>3.기타그룹 추가</b></span>  

```bash
# 현재 사용자인 mfx000 접속상태에서 생성한 그룹을 추가
sudo usermod -a -G grmfx, wheel

# 확인 (자신 이외의 새로운 그룹 2개 안에도 포함시켰다.)
id mfx000
uid=1001(mfx000) gid=1001(mfx000) groups=1001(mfx000), 1002(grmfx), 1003(wheel)

```

> ❗정리  
> 💡 mfx000 계정으로 톰캣을 실행하기 위해  
> 💡 mfx000 계정을 grmfx 그룹안에 포함시켰다.  

## 방법1. 가장 간단한 방법(ROOT권한 존재시)  
### STEP1. 톰캣디렉토리 [ALL 소유권] 부여
<span style="color:red"><b>아파치경로/*</b></span>  

```bash
sudo chown -R root:grmfx /fswas/apache-tomcat

# 그룹의 소유권 권한이 내부 디렉토리 레벨까지 변경되었는지 확인해본다.
#   - mfx000 계정이 권력을 행사할 수 있다. (즉, sudo를 붙이지 않아도 된다)
#   - 톰캣의 모든 파일에 대해 소유그룹을 grmfx 으로 지정해뒀기 때문이다.  

```

> ❗현재 상태에서 mfx000 계정으로 서버를 시작하면?  
> 💡 전체 오너십 소유권을 부여했음에도 실패한다. (Permision 에러)  
> 💡 tomcat 디렉토리의 전부가 mfx000 소유권 이외에 [쓰기] 권한이 필요하다.  


### STEP2. 로그파일 [쓰기] 부여
<span style="color:red"><b>아파치경로/logs/*</b></span>  

```bash
# 그룹(g)에 쓰기(w) 권한 부여
sudo chmod -R g+w /fswas/apache-tomcat/logs

# 정상반영
ls -al 
drwxrwx--- 2 cmadmin grmfx 57344 10월 18 09:31 logs  

```
  
> ❗현재 상태에서 mfx000 계정으로 서버를 시작하면?  
> 💡 실행은 되지만 프로세스가 띄워지지 않는다.  
> 💡 설정파일에 대한 [읽기], [실행] 권한이 필요하다.  


### STEP3. 설정파일 [읽기], [실행] 부여
<span style="color:red"><b>아파치경로/conf/*</b></span>  

```bash
# 그룹(g)에 읽기(r), 실행(x) 권한 부여
sudo chmod -R g+rx /fswas/apache-tomcat/conf 

# 정상반영
ls -al
drwxr-x--- 2 cmadmin grmfx 57344 10월 18 09:31 conf  

```

> ❗mfx000 계정으로 서버기동   
> 💡 정상작동



## 방법2. 상세한 방법(ROOT권한 미존재시)  
### STEP1. 톰캣디렉토리 [읽기], [실행] 부여
<span style="color:red"><b>아파치경로/</b></span>  

```bash
sudo chmod 755 /fswas/apache-tomcat/

# 정상반영
ls -al 
drwxr-xr-x 2 cmadmin grcmd 57344 10월 18 09:31 apache-tomcat  

```
  
### STEP2. 실행관련파일 [읽기], [실행] 부여
<span style="color:red"><b>아파치경로/bin/*</b></span>  

```bash
sudo chmod -R 755  /fswas/apache-tomcat/bin/

# 정상반영
ls -al 
drwxr-xr-x 2 cmadmin grcmd 57344 10월 18 09:31 bin  

# 실제 권한부여가 필요한 파일
# chmod 755 /fswas/apache-tomcat/bin/
# chmod 755 /fswas/apache-tomcat/bin/catalina.sh
# chmod 755 /fswas/apache-tomcat/bin/startup.bat
# chmod 755 /fswas/apache-tomcat/bin/startup.sh
# chmod 755 /fswas/apache-tomcat/bin/startdown.sh
# chmod 755 /fswas/apache-tomcat/bin/bootstrap.jar (전역 PATH환경변수필요)
# chmod 755 /fswas/apache-tomcat/bin/tomcat-juli.jar (전역 PATH환경변수설정필요)

```

### STEP3. 로그파일 [쓰기] 부여
<span style="color:red"><b>아파치경로/logs/*</b></span>  

```bash
# 그룹(g)에 쓰기(w)권한 부여
sudo chmod -R 775 /fswas/apache-tomcat/logs/

# 정상반영
ls -al 
drwxrwx--- 2 mfx000 grmfx 57344 10월 18 09:31 logs  


# 실제 권한부여가 필요한 파일
# chmod 755 /fswas/apache-tomcat/logs/catalina.out
# chmod 755 /fswas/apache-tomcat/logs/manager.log
# chmod 755 /fswas/apache-tomcat/logs/localhost_access.log

```
  
<span style="color:red"><b>루트/별도로그경로/*</b></span>  

```bash
# 그룹(g)에 쓰기(w)권한 부여
sudo chmod -R 775 /fslog/portal/

# 정상반영
ls -al 
drwxrwxr-x 2 mfx000 grmfx 57344 10월 18 09:31 portal  

```



### STEP4. 설정파일 [읽기], [실행] 부여
<span style="color:red"><b>아파치경로/conf/*</b></span>  

```bash
# 그룹(g)에 읽기(r), 실행(x) 권한 부여
sudo chmod -R 755 /fswas/apache-tomcat/conf 

# 정상반영
ls -al
drwxr-xr-x 2 cmadmin grcmd 57344 10월 18 09:31 conf  

```


### STEP5. 임시디렉토리 [읽기], [쓰기], [실행] 부여
<span style="color:red"><b>아파치경로/work/*</b></span>  

```bash
# 그룹(g)에 읽기(r), 쓰기(w), 실행(x) 권한 부여
sudo chmod -R 775 /fswas/apache-tomcat/work

# 정상반영
ls -al
drwxrwxr-x 2 mfx000 grmfx 57344 10월 18 09:31 work  

```

### STEP6. 웹어플리케이션 [읽기], [실행] 부여
<span style="color:red"><b>아파치경로/webapps/[웹프로젝트]</b></span>  

```bash
# 그룹(g)에 읽기(r), 실행(x) 권한 부여
sudo chmod -R 755 /fswas/apache-tomcat/webapps/bck

# 정상반영
ls -al
drwxr-xr-x 2 cmadmin grcmd 57344 10월 18 09:31 bck  

```




## (별첨) 라즈베리파이 테스트

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