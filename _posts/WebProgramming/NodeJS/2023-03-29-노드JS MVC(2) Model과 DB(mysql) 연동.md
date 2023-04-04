---
title:  "노드JS MVC(2) Model과 DB(mysql) 연동"
excerpt: "노드JS MVC(2) Model과 DB(mysql) 연동 입니다."

categories:
  - nodejs
tags:
  - [node.js]

toc: true
toc_sticky: true

last_modified_at: 2023-03-29T20:00:00-05:00
---

## 개요
이전 기본적으로 DB연동하는 방법을 알아보았다. 이어서 현재 진행중인 노드JS 구성에 적용해보자.

## STEP1. DB 연동 설정파일 준비
```sql
<!-- CREATE -->
MariaDB [DSDBDO0]> CREATE TABLE MEMBER (
    -> 이름 VARCHAR(20) NOT NULL
    -> , 나이 INT(200)
    -> , 주소 VARCHAR(100)
    -> );
Query OK, 0 rows affected (0.092 sec)

<!-- INSERT -->
INSERT INTO MEMBER VALUES (
'홍길동'
, 19
, '서울특별시100'
);
INSERT INTO MEMBER VALUES (
'김철수'
, 24
, '인천광역시10'
);
```

```bash
mkdir /confing/conf_database
touch /confing/conf_database/db_config.js

```


```bash
├── app.js
├── server.js
├── config
│   ├── conf_database  # DB설정 디렉토리 및 설정파일 생성
│   │   └── db_config.js
│   ├── conf_env
│   ├── conf_json
│   ├── config.js
│   └── db_config.js
├── controllers
│   ├── main
│   │   └── main.controller.js
│   └── member
│       └── member.controller.js

```

### /confing/conf_database/db_config.js
```js
const mysql = require('mysql2'); 
const pool = mysql.createPool({
  host: 'blang.co.kr',
  port: 3306,
  user: "INSTC",
  password: "a",
  database: "DSDBDO0",
  connectionLimit: 10
});

//커넥션 객체를 모듈화
module.exports = function(callback) {            //단순한 익명 함수를 리턴함
    pool.getConnection(function(err, conn) {    // getConnection() 함수가 구현한 콜백함수로 conn 리턴함
        if (err) throw error;
        callback(conn);
    });
}

```

## STEP2. 모델(Model) 생성
```bash
mkdir /model
touch /model/member.model.js

```

```bash
├── app.js
├── server.js
├── config
│   ├── conf_database  # DB설정 디렉토리 및 설정파일 생성
│   │   └── db_config.js
│   ├── conf_env
│   ├── conf_json
│   ├── config.js
├── controllers
│   ├── main
│   │   └── main.controller.js
│   └── member
│       └── member.controller.js
├── models # 모델(Model) 디렉토리 및 파일 생성
│   └── member.model.js

```


### /models/member.model.js
```js
const getConnection = require("../config/conf_database/db_config.js");


// constructor 생성자
const Member = function(member) {
  this.name = member.name;
  this.age = member.age;
  this.address = member.address;
};

// insert 를 정의한다. 즉, DAO 로직이 모델에 담겨있는 형태이다.
// 생성자를 통해 은닉화된 필드를 newMember 인자로 만들어서 INSERT 한다.

Member.insert = (newMember, result) => {
/*
    sql.query("INSERT INTO MEMBER SET ?", newMember, (err, res) => {
    if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
    }
  });
    console.log("created member: ", { id: res.insertId, ...newMember });
    result(null, { id: res.insertId, ...newMember });
*/

    //모듈의 Connection 을 가져온다.
    getConnection( function(conn) {
            conn.query('SELECT * FROM TBDBDW001', function (err, data) {
                err ? console.log(err) :  console.log('[success]' + res.send(data) );
        	});
           console.log('dddd');
            //DB 연결 해제 (매우중요)
            conn.release() 
    });            
    
};

```



### /controllers/member.controller.js
```js
// 위에 작성한 모델을 임포트 했다.
const Member = require("../../models/member.model.js");

exports.getMember = (req, res, next) => {
    console.log('member.controller.js getMember()');
}
exports.insertMember = (req, res, next) => {
    console.log('member.controller.js insertMember() >> ');

    // http://blang.co.kr:30001/member/insert?name=홍길동&age=19&address=서울특별시 100
    // 요청값 검증
    if (!req.body) {
        res.status(400).send({
            message: "내용이 없습니다."
        });
    }

    // Member 모델 생성
    const member = new Member({
        name: req.body.name,
        age: req.body.age,
        adress: req.body.adress || false
    });

    // Member 모델 DB 저장
    Member.insert(member, (err, data) => {
        if (err) res.status(500).send({message: err.message || "에러"});
        else res.send(data);
    });


}
exports.updateMember = (req, res, next) => {
    console.log('member.controller.js updateMember() >> ');
}
exports.deleteMember = (req, res, next) => {
    console.log('member.controller.js deleteMember() >> ');
}

```



