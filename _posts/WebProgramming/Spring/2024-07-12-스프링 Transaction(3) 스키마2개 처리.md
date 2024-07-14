---
title:  "스프링 Transaction(3) 스키마2개 처리"
excerpt: "스프링 Transaction(3) 스키마2개 처리 입니다."

categories:
  - spring
tags:
  - [spring, 프레임워크]

toc: true
toc_sticky: true

last_modified_at: 2024-07-12T13:17:00-17:00:00
---


## 개요
> ❗<span style='color:green'>***WAS내의 마이바티스로 운영되는 DB1 DB2 트랜잭션이 작동하지 않는다.***</span>  
> 💡 1.<span style='color:blue'>**서로의 세션이 다르기 때문임을 확인 함.**</span>  

## 해결방안
## 방법1
### 두 데이터소스 자체의 트랜잭션1,2 를 묶어서 처리
> ❗<span style='color:green'>***ChainedTransactionManager XML 처리***</span>  
>  ```xml
> 	<!-- transaction manager setting -->
>	 <bean id="transactionManager" class="org.springframework.data.transaction.ChainedTransactionManager">
>		 <constructor-arg>
>			 <list>
>				 <ref bean="mybatisTransactionManager"/>
>				 <ref bean="jpaTransactionManager"/>
>	 		 </list>
>	 	 </constructor-arg>
>	 </bean>
>  ```  
>   
> 💡 <span style='color:blue'>**위 코드로 다중 데이터소스(dataSource)에 대해 트랜잭션을 묶을 수 있다고 한다.**</span>  
> 💡 <span style='color:blue'>**(여러개의 트랜잭션 매니저를 하나로 묶어(Chain)사용하는 방식인데 트랜잭션의 시작과 끝에서 연결된 트랜잭션들을 순차로 Start/Commit 시킴으로써 하나의 트랜잭션으로 실행되는것 처럼 동작)**</span>  
>   
>  ```bash
>  # 이상적인 트랜잭션 [트랜잭션1 (Tx1), 트랜잭션2 (Tx2))]
>  # Tx1 (Start) -> Tx2 (Start) -> Logic -> Tx2 (COMMIT) -> Tx1 (COMMIT) 
>  # Tx1 (Start) -> Tx2 (Start) -> Logic -> Tx2 (ROLLBACK) -> Tx1 (ROLLBACK) 
> 
>  # 하지만 완벽하지 않아서 아래와 같이 동작가능성이 있다.
>  # Tx1 (Start) -> Tx2 (Start) -> Logic -> Tx2 (COMMIT) -> Tx1 (ROLLBACK) 
> 
>  # 체이닝 순서가 중요요하다.
>  # 더 나중에 선언된 트랜잭션에서 에러가 날 경우에는 트랜잭션 ROLLBACK이 보장되기에, 
>  # 에러가 날 확률이 높은 트랜잭션을 후순위 chain으로 묶어줘야한다 (그래야 조금 더 안전한 트랜잭션을 구성 할 수 있다.)
>  ```
> 
> 💡 <span style='color:blue'>**하지만 구조적인 이유로 완벽한 롤백은 보장하지 않는다고 함.**</span>  

현재 비권장되어 사용불가능함을 확인.  
{: .notice--info}
  
## 방법2: 각각의 트랜잭션 명시
### root-context.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:aop="http://www.springframework.org/schema/aop"
	xmlns:context="http://www.springframework.org/schema/context"
	xmlns:jdbc="http://www.springframework.org/schema/jdbc"
	xmlns:mybatis-spring="http://mybatis.org/schema/mybatis-spring"
	xmlns:util="http://www.springframework.org/schema/util"
	xsi:schemaLocation="http://www.springframework.org/schema/jdbc http://www.springframework.org/schema/jdbc/spring-jdbc-4.3.xsd
		http://mybatis.org/schema/mybatis-spring http://mybatis.org/schema/mybatis-spring-1.2.xsd
		http://www.springframework.org/schema/beans https://www.springframework.org/schema/beans/spring-beans.xsd
		http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-4.3.xsd
		http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop-4.3.xsd
		http://www.springframework.org/schema/util http://www.springframework.org/schema/util/spring-util-4.3.xsd">
	
	

	<!-- 데이터베이스1 -->
	<bean id="dataSource1" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
    <property name="driverClassName" value="oracle.jdbc.driver.OracleDriver" />
		<property name="url" value="jdbc:oracle:thin:@localhost:1521:DSBDB" />
		<property name="username" value="oracleMaster" />
		<property name="password" value="1234" />
	</bean>
	
	<!-- 데이터베이스2  -->
	<bean id="dataSource2" class="org.springframework.jdbc.datasource.DriverManagerDataSource"> 
		<property name="driverClassName" value="com.mysql.cj.jdbc.Driver" />
		<property name="url" value="jdbc:mysql://blang.co.kr:3306/DSBCKO0" />
		<property name="username" value="mriaMaster" />
		<property name="password" value="4321" />  
	</bean>

	<!-- ================================================================================= -->
	<!-- SQL 세션 팩토리 1 -->
	<bean id="sqlSessionFactory1" class="org.mybatis.spring.SqlSessionFactoryBean">
	    <property name="dataSource" ref="dataSource1"/>
		<property name="configLocation" value="classpath:/mybatis-config.xml" /><!-- myBatis 설정 파일의 위치를 지정한다. -->
		<property name="mapperLocations" value="classpath:/mappers/**/*Mapper.xml" /><!-- SQL 파일의 위치를 지정한다. -->
	</bean>
	
	<!-- SQL 세션 팩토리 2 -->
	<bean id="sqlSessionFactory2" class="org.mybatis.spring.SqlSessionFactoryBean">
		<property name="dataSource" ref="dataSource2" />
		<property name="configLocation" value="classpath:/mybatis-config.xml" />
		<property name="mapperLocations" value="classpath:/mappers/**/*Mapper.xml" />
	</bean>
	
	<!-- ================================================================================= -->
	<bean id="sqlSession" class="org.mybatis.spring.SqlSessionTemplate">
	    <constructor-arg index="0" ref="sqlSessionFactory1"/>
	</bean>
	
    <!-- SqlSessionTemplate 2 -->
    <bean id="sqlSession2" class="org.mybatis.spring.SqlSessionTemplate">
        <constructor-arg index="0" ref="sqlSessionFactory2"/>
    </bean>
    
    
    <!-- ================================================================================= -->
    <!-- 트랜잭션 매니저 1 -->
    <bean id="transactionManager1" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource1"/>
    </bean>
    <!-- 트랜잭션 매니저 2 -->
    <bean id="transactionManager2" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource2"/>
    </bean>
	
	
    <!-- ================================================================================= -->
    <!-- Common DAO -->
    <bean id="commonDao" class="com.blang.bck.comm.dao.CommonDao">
    	<property name="sqlSession2" ref="sqlSession2" /> <!-- 다른 DAO에서 주입된 sqlSession 사용 -->
    </bean>
	
	
	<!-- ================================================================================= -->
	<util:properties id="globalProperties" location="classpath:/properties/global-properties.xml" />
</beans>

```

### DAO
```java
@EnableAsync
public class CommonDao 
{
	@Autowired
    private SqlSession sqlSession2;
	
	//Insert
	public int insert(String statementName, Object parameter) 
	{
		try 
		{
			return sqlSession2.insert(statementName, parameter);
		} 
		catch (Exception e) 
		{
			throw new SysException(SysErrorCode.INTERNAL_SERVER_ERROR, e);
		}
	}
	
	
	//Update
	public int update(String statementName, Object parameter) 
	{
		try 
		{
			return sqlSession2.update(statementName, parameter);
		} 
		catch (Exception e) 
		{
			throw new SysException(SysErrorCode.INTERNAL_SERVER_ERROR, e);
		}
	}
	//중략...
}
```

### Service
```java
	/**
	 * 결재 요청 
	 * (트랜잭션 추가)
	 * @param params
	 * @return
	 */
	@Transactional(propagation = Propagation.REQUIRED, transactionManager = "transactionManager2")
	public int insertRqstData(Map<String, Object> params) 
	{
      //결재요청 데이터를 insert
      int inCount = dao.insert(namespace+".insertRqstData", map);
      int upCount = dao.update(namespace+".updateRqstData", map);
      ...
	}

```

### Controller
```java
	/**
	 * 결재 요청
	 * @param params
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/insertRqstData", method = RequestMethod.POST)
	public Map<String, Object> insertRqstData(@RequestBody Map<String, Object> params, HttpServletRequest req) 
	{	
		int count = workFlowRqstService.insertRqstData(params);
		if(count > 0) {
			resultMap.put("status", "SUCCESS");
			resultMap.put("count", count);
		}
		
		return resultMap;
	}

```
> ❗<span style='color:green'>***명시 후 트랜잭션 정상 작동 확인***</span>  
> 💡 <span style='color:blue'>**2번 데이터베이스에 대한 트랜잭션이 정상적으로 작동한다.**</span>  



## 궁금한 점 : 명시하지 않으면 트랜잭션이 사용되는 순서는?
찾아보니 방법은 3가지가 있다고 한다.

### 방법1. 명시적 지정이 없는 경우
> ❗<span style='color:green'>***만약 트랜잭션 매니저가 명시적으로 지정되지 않았고, @Primary 애노테이션도 사용하지 않았다면, 스프링은 트랜잭션 매니저 빈이 하나만 존재하는 경우 그 빈을 기본 트랜잭션 매니저로 사용한다.***</span>  
>    
> 💡 <span style='color:green'>***하지만 둘 이상의 트랜잭션 매니저가 존재하는데 명시적으로 지정하지 않으면, NoUniqueBeanDefinitionException 예외가 발생한다.***</span>  



### 방법2. @Primary 어노테이션 
```xml
<!-- 트랜잭션 매니저 1 -->
<bean id="transactionManager1" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <property name="dataSource" ref="dataSource1"/>
</bean>

<!-- 트랜잭션 매니저 2 -->
<bean id="transactionManager2" class="org.springframework.jdbc.datasource.DataSourceTransactionManager" primary="true">
    <property name="dataSource" ref="dataSource2"/>
</bean>

```

> ❗<span style='color:green'>***@Primary 애노테이션을 사용하여 특정 트랜잭션 매니저를 기본 트랜잭션 매니저로 지정***</span>  
> 💡 1.<span style='color:blue'>**transactionManager2가 기본 트랜잭션 매니저로 설정된다.**</span>  


### 방법3. 트랜잭션 매니저 빈 이름을 통해 기본값 설정
```xml
<!-- 트랜잭션 매니저 1 -->
<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <property name="dataSource" ref="dataSource1"/>
</bean>

<!-- 트랜잭션 매니저 2 -->
<bean id="transactionManager2" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <property name="dataSource" ref="dataSource2"/>
</bean>

```

> ❗<span style='color:green'>***@Primary 애노테이션을 사용하여 특정 트랜잭션 매니저를 기본 트랜잭션 매니저로 지정***</span>  
> 💡 1.<span style='color:blue'>**transactionManager가 기본 트랜잭션 매니저로 설정된다.**</span>  
