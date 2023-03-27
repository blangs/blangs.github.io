---
title:  "노드JS MariaDB 연동"
excerpt: "노드JS MariaDB 연동 입니다."

categories:
  - nodejs
tags:
  - [node.js]

toc: true
toc_sticky: true

last_modified_at: 2023-03-19T20:00:00-05:00
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
  - createConnection 방법
  - connection pool 방법
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
  
***db_config.js (createConnection 방법)***  
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
  
***db_config.js (createPool 방법)***  
```js
// mysql 접속정보
const mysql = require('mysql2');  // mysql 모듈 로드
const db = mysql.createPool({
  host: '호스트주소.co.kr',
  port: 3306,
  user: "admin",
  password: "qwer123",
  database: "DSDBDD0",
  connectionLimit: 2  //커넥션풀 수
});

module.exports = db;  //모듈 생성

```

'module.exports'는 Node.js에서 모듈을 만들 때 사용하는 객체이다. 이 객체를 사용하면 모듈 밖에서 해당 모듈의 함수, 변수, 객체 등에 접근할 수 있다.
{: .notice--info}



### (4) express와 연동하기
: 다음과 같은 방법으로 연동한다.

1. './config' 경로에서 작성한 'db_config.js' 로컬 모듈을 불러온다. 
2. 'db.query()' 메소드로 DB서버의 데이터베이스(MariaDB)에서 데이터를 가져온다.
    - 문법: db.query(실행할 sql 쿼리, callback);
  
  
***app.js (connection 방법)***  
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

***app.js (createPool 방법)***  
```js
const express = require('express');
const app = express();  //생성자: 반드시 이렇게 사용해야 에러가 안난다.
const PORT = 3000;
const pool = require('./config/db_config.js');  //모듈을 사용한다.

/****************************************
- DB 연동
****************************************/
app.get('/select', (req,res) => {
    console.log('SELECT 수행');
    
    pool.query('SELECT * FROM TBDBDW001', (err, data) => {
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

```

***참고)***  
다른예제제를 보면 connection.connect() 메소드로 연결을 해주는데 
node-mysql 모듈을 사용하는 경우 mysql.createConnection()을 하고 나면 connection.connect()로 다시 연결할 필요가 없다고 한다. 
위처럼 모듈호출 -> query() 만 해주어도 잘 작동하는것을 확인했다.
{: .notice--info}


작동은 하지만.. 조금 이상하다. <span style="color:red">커넥션 관리를 해주어야 진정한 커넥션 풀인데.. 자원을 해제하는 로직이 없다. (잘못 구현한 느낌이 든다.)</span>  
  
1. <span style="color:blue">최대 n개로 제한한 커넥션풀을 만든다.</span>
2. <span style="color:blue">요청에 대해 커넥션 한다.</span>
3. <span style="color:blue">요청이 끝나면 반납한다.</span>
  
1번은 설정파일에서 정의했고, 2번은 createPool 기능상 자동적으로 맺어주는듯하다. 그런데 3번 내용이 없다. 이 부분은 구현이 필요한것으로 보인다. 
즉, <span style="color:red">사용 후에 반드시 풀에 다시 반납해야 하는데.. `conn.release();` 를 해주는 부분이 없다.</span>  
  
> ***커넥션풀이란?***  
> **`미리 Connection 객체를 생성하고 해당 Connection 객체를 관리하는것`**  
> 관계형 데이터베이스에 연결할 때는 보통 커넥션 풀(Connection Pool)을 사용한다.  
>   
> ***동작과정***  
> 1. 다수 사용자가 DB 접속. 
> 2. Connection Pool에 DB와 연결을 해 놓은 객체를 두고 필요할 때마다 Connection Pool에서 Connection을 빌려온다.
> 3. 그리고 연결이 끝나면 다시 Pool에 돌려준다.
> 4. 남아있는 Connection이 없을 경우 해당 클라이언트는 대기 상태로 전환이 되고, Connection이 반환되면 대기하고 있는 순서대로 Connection이 제공된다.  
>
> Connection Pool을 너무 크게 해놓으면 당연히 메모리 소모가 클것이고, 적게 해놓으면 Connection이 많이 발생할 경우 대기시간이 발생하기때문에 웹 사이트 동시 접속자 수 등 서버 부하에 따라 커넥션 풀의 크기를 조정해야 한다.
>   
> ***장점***  
> 1. Pool 속에 미리 Connection이 생성되어 있기 때문에 Connection을 생성하는 데 드는 연결 시간이 소비되지 않는다.
> 2. Connection을 계속해서 재사용하기 때문에 생성되는 Connection 수가 많지 않다. 
> 3. Connection Pool을 사용하면 Connection을 생성하고 닫는 시간이 소모되지 않기 때문에 그만큼 어플리케이션의 실행 속도가 빨라지며, 또한 한 번에 생성될 수 있는 Connection 수를 제어하기 때문에 동시 접속자 수가 몰려도 웹 어플리케이션이 쉽게 다운되지 않는다.
  


## express와 연동하기 (커넥션관리 추가)
: app.js파일에서 db.js파일에서 생성해둔 db connection을 import하여 사용하였다 queryDatabase함수를 실행할 때마다 connection을 해주지 않아도 되기 때문에 서버에 부하도 줄고, 재사용성도 높일 수 있다.  
  
***db_config.js***
```js
const mysql = require('mysql2'); 
const pool = mysql.createPool({
  host: '호스트주소.co.kr',
  port: 3306,
  user: "admin",
  password: "qwer123",
  database: "DSDBDD0",
  connectionLimit: 2  //커넥션풀 수
});

//커넥션 객체를 모듈화
module.exports = function(callback) {            //단순한 익명 함수를 리턴함
    pool.getConnection(function(err, conn) {    // getConnection() 함수가 구현한 콜백함수로 conn 리턴함
        if (err) throw error;
        callback(conn);
    });
}

```

***app.js***
```js
const express = require('express');
const app = express();  //생성자: 반드시 이렇게 사용해야 에러가 안난다.
const PORT = 3000;
const getConnection = require('./config/db_config.js');  //모듈을 사용한다.

// 조회
app.get('/select', (req,res) => {

    console.log('SELECT 수행');
    
    // getConnection() 콜백함수 모듈을 가져온온다.
    getConnection( function(conn) {
            //쿼리수행
            conn.query('SELECT * FROM TBDBDW001', function (err, data) {
                    err ? console.log(err) :  console.log('[success]' + res.send(data) );
    	      });
    });

});

// 서버리스너
app.listen(PORT, () => {
	console.log(`Express SERVER START... >> http://localhost:${PORT}`);
});

```
  
## 콜백 동작과정 이해하기
### 요약
```js
// 정의
const getConnection = function(callback) { 
    
    pool.getConnection(function(err, conn) {
        if (err) throw error;
        callback(conn);
    });

}

// 사ㅇ
getConnection( function(conn) {
    conn.query('SELECT * FROM TBDBDW001', function (err, data) {
        err ? console.log(err) :  console.log('[success]' + res.send(data) );
    });    
    
    //DB 연결 해제 (매우중요)
    conn.release()  
});

```

[사용] 함수에 인자로 넣은 `[function 덩어리 묶음]` 은 맨마지막에 호출된다.  
해석하면 다음과 같이 풀이된다.

### 요약 풀이
```js
getConnection( function(conn) {
    pool.getConnection(function(err, conn) {
        if (err) throw error;
      
        //callback(conn); 이 부분이 아래 내용으로 대체되었다.
        conn.query('SELECT * FROM TBDBDW001', function (err, data) {
            err ? console.log(err) :  console.log('[success]' + res.send(data) );
        });

    });
});

```