---
title:  "노드JS MariaDB 연동"
excerpt: "노드JS MariaDB 연동 입니다."

categories:
  - nodejs
tags:
  - [node.js]

toc: true
toc_sticky: true

last_modified_at: 2023-03-18T20:00:00-05:00
---

## 기본 사용법
```js
const mysql = require('mysql2');  // mysql 모듈 로드
const conn = mysql.createConnection({
  host: 'blang.co.kr',
  port: 3306,
  user: "INSTC",
  password: "a",
  database: "DSDBDO0"
});
  
conn.connect();
  
conn.query('SELECT * FROM TBDBDW001', (err, data) => {
    if(!err)
    {
      console.log('[SUCCESS]: ' + data);
    }
    else
    {
      console.log('[FAILED]: ' + data);
      res.send(data);
    }
});
      
conn.end();

```

## 모듈화 사용법
### 과정
1. MySQL(MariaDB) 설치(구축)
2. MySQL(MariaDB) NPM 모듈 설치
3. config 파일 생성
4. express와 연동하기
  - createConnection 방법
  - connection pool 방법
5. 결과


### (1) MySQL(MariaDB) 설치(구축)
: 이미 나의 라즈베리파이 4번 서버에 MariaDB 를 구축했기에 생략한다.


### (2) MySQL(MariaDB) NPM 모듈 설치
: mysql 연결하기 위한 확장 모듈 설치. (커넥터)

```bash
$ sudo npm install mysql2

added 10 packages, and audited 68 packages in 2s

7 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

```
  
pacakage.json 을 열어보면 정상 추가되었다.
  
```json
  "dependencies": {
    "express": "^4.18.2",
    "mysql2": "^3.2.0"
  }

```

### (3) config 파일 생성
: 생성한 컨피그 js 파일에서 확장모듈 포함 및 DB Connection 정보를 설정한다.

***컨피그 디렉토리 생성***  
```bash
mkdir ./config
vi db_config.js

```
  
***db_config.js***  
```js
// mysql 접속정보
const mysql = require('mysql2');  // mysql 모듈 로드
const conn = mysql.createConnection({
  host: '호스트주소.co.kr',
  port: 3306,
  user: "admin",
  password: "qwer123",
  database: "DSDBDD0",
});


module.exports = conn;  //모듈 생성

```
  
'module.exports'는 Node.js에서 모듈을 만들 때 사용하는 객체이다. 이 객체를 사용하면 모듈 밖에서 해당 모듈의 함수, 변수, 객체 등에 접근할 수 있다.
{: .notice--info}

### (4) express와 연동하기(createConnection 방법)

```js
const express = require('express');
const app = express();  //생성자: 반드시 이렇게 사용해야 에러가 안난다.
const PORT = 3000;
const conn = require('./config/db_config.js');  //모듈을 사용한다.

/****************************************
- DB 연동
****************************************/
app.get('/select', (req,res) => {
    console.log('SELECT 수행');

    conn.query('SELECT * FROM TBDBDW001', (err, data) => {
    	if(!err)
        {
        	console.log('[SUCCESS]: ' + data);
            res.send(data);
        }
        else
        {
        	console.log('[FAILED]: ' + data);
            res.send(data);
        }
    });
});

/****************************************
- 서버리스너
****************************************/
app.listen(PORT, () => {
	console.log(`Express SERVER START... >> http://localhost:${PORT}`);
});

app.use('/customer', customerRoute);  //라우트 모듈

```
관계형 데이터베이스에 연결할 때는 보통 커넥션 풀(Connection Pool)을 사용한다.  
이것은 데이터베이스 연결 객체가 너무 많이 만들어지는 것을 막고 한번 만든 연결을 다시 사용할 수 있게 한다. 데이터베이스에 연결하면 메모리 리소스를 많이 차지하므로 한번 만든 연결 객체는 커넥션 풀에 넣어두고 다음번 요청이 있을 때 다시 사용한다. 이때 너무 많은 연결이 만들어지지 않도록 커넥션 풀의 최대 크기를 설정한다. 커넥션 풀을 연결 개수를 제한하므로 연결을 사용한 후에는 반드시 다시 풀에 넣어주어야하는 제약이 있다.

> ***참고)***  
> 다른예제제를 보면 connection.connect() 메소드로 연결을 해주는데 
> node-mysql 모듈을 사용하는 경우 mysql.createConnection()을 하고 나면 connection.connect()로 다시 연결할 필요가 없다고 한다. 
> 위처럼 모듈호출 -> query() 만 해주어도 잘 작동하는것을 확인했다.



## express와 연동하기(심화)
: 효율적인 커넥션풀을 사용하는 예제를 작성한다.


***db_config.js***
```js
// mysql 접속정보
const mysql = require('mysql2');  // mysql 모듈 로드
const db = mysql.createPool({
  host: '호스트주소.co.kr',
  port: 3306,
  user: "admin",
  password: "qwer123",
  database: "DSDBDD0",
  connectionLimit: 2
});

module.exports = db;  //모듈 생성

```
  
***app.js***  
```js
const express = require('express');
const app = express();  //생성자: 반드시 이렇게 사용해야 에러가 안난다.
const PORT = 3000;
const db = require('./config/db_config.js');  //모듈을 사용한다.

/****************************************
- DB 연동
****************************************/
app.get('/select', (req,res) => {
    console.log('SELECT 수행');
    
    db.query('SELECT * FROM TBDBDW001', (err, data) => {
    	if(!err)
        {
        	console.log('[SUCCESS]: ' + data);
            res.send(data);
        }
        else
        {
        	console.log('[FAILED]: ' + data);
            res.send(data);
        }
    });
});

/****************************************
- 서버리스너
****************************************/
app.listen(PORT, () => {
	console.log(`Express SERVER START... >> http://localhost:${PORT}`);
});

app.use('/customer', customerRoute);  //라우트 모듈

```

1. './config' 경로에서 'db_config.js' 모듈을 불러온다. 
2. 'db.query( )' 메소드로 DB서버의 데이터베이스(MariaDB)에서 데이터를 가져온다.
  - 문법: db.query(실행할 sql 쿼리, callback);


### 결과

![사진1](/assets/images/WebProgramming/NodeJS/node-dbconn-result.jpg)

> 정상적으로 DB서버의 값을 조회회하고 리턴했다. 결과를 보면 JSON 형태로 떨어지는 것을 확인할 수 있다.