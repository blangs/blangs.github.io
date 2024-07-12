---
title:  "스프링 Transaction(3) 스키마2개 공유처리"
excerpt: "스프링 Transaction(3) 스키마2개 공유처리 입니다."

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
  
