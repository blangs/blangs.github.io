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

TRUNCATE MEMBER;
ALTER TABLE MEMBER ADD COLUMN 회원번호 VARCHAR(8) FIRST;
ALTER TABLE MEMBER MODIFY 회원번호 VARCHAR(8) PRIMARY KEY;
--(ERROR)AUTO_INCREMENT는 숫자 데이터 타입인 INTEGER 또는 BIGINT와 함께 사용되어야 한다.
ALTER TABLE MEMBER MODIFY 회원번호 VARCHAR(8)AUTO_INCREMENT;
--데이터 타입 변경 과 동시에 자동증가 설정
ALTER TABLE MEMBER MODIFY 회원번호 INT AUTO_INCREMENT; 
--(별첨)auto_increment값을 1로 초기화 한다.
ALTER TABLE MEMBER AUTO_INCREMENT=1;  



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
│   │   ├── .env.development
│   │   ├── .env.local
│   │   └── .env.production
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
  host: process.env.DB_HOST, // 환경 변수에서 호스트 정보 가져오기
  port: process.env.DB_PORT, // 환경 변수에서 포트 정보 가져오기
  user: process.env.DB_USER, // 환경 변수에서 사용자 정보 가져오기
  password: process.env.DB_PASSWORD, // 환경 변수에서 패스워드 정보 가져오기
  database: process.env.DB_DATABASE, // 환경 변수에서 데이터베이스 정보 가져오기
  connectionLimit: process.env.DB_CONNECTIONLIMIT // 환경 변수에서 커넥션 리밋 정보 가져오기
});

//커넥션 객체를 모듈화
module.exports = function(callback) {            //단순한 익명 함수를 리턴함
    pool.getConnection(function(err, conn) {    // getConnection() 함수가 구현한 콜백함수로 conn 리턴함
        if (err) throw error;
        callback(conn);  //실제 DB 쿼리로직이 담긴 함수가 들어올것이다.
    });
}

```

이전에 config.js 모듈을 통해 런타임환경별 .env 파일을 로드했다. 그래서 위처럼 사용이 가능해졌다!



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
│   │   ├── .env.development
│   │   ├── .env.local
│   │   └── .env.production
│   ├── conf_json
│   ├── config.js
│   └── db_config.js
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
/* 해당 JS파일은 단순한 DTO 를 담는 형태가 아닌 DAO 로직이 포함되어있는 형태다. */
const getConnection = require("../config/conf_database/db_config.js"); // 콜백 모듈

// constructor 생성자
// req.body 또는 req.query 를 넣으면 생성가능
const Member = function(member) {
    this.회원번호 = member.id;
    this.이름 = member.name;
    this.나이 = member.age;
    this.주소 = member.address;
};


/* 
 * SELECT 모델
 */
Member.selectArr = (param, result) => {    
	console.log('member.model.js getMember() >> ');
	
    //1. 조회 쿼리 생성
    let query = "SELECT * FROM MEMBER";
    if (param) query += param;
    console.log(query);
    
    //2. Connection Pool 모듈 콜백 함수
    getConnection( function(conn) {
        conn.query(query, function (err, data) { 
        	
            data.forEach((row) => {
                console.log(`회원번호: ${row.회원번호} 이름: ${row.이름}, 나이: ${row.나이} 주소: ${row.주소}`);
            });
  
            //param1: 에러가 발생하지 않았음을 나타낸다. (에러가 아님을 확정지은 의미적인 SET 이다.)
            //param2: DB 조회 결과를 SET
            result(null, data); 
        });
        //지역변수 conn 으로 DB 연결 해제 (매우중요) 
        conn.release();         

    });   
};


/* 
 * INSERT 모델
 */
Member.setInsert = (newMember, result) => {
console.log('member.model.js getMember() >> ');
    // 생성자를 통해 은닉화된 필드를 newMember 인자로 만들어서 INSERT 한다.
     
    // Template Literal 사용법
    // Template Literal을 사용하면 ${...} 문법을 사용하여 객체를 삽입 가능하다 ...은 객체를 복사하거나 배열을 펼치는 연산자로 사용한다.
    // 그 외에도 만약 문자열과 객체를 연결하기 위해서는 + 대신에 Template Literal을 사용한다.
     console.log("GET newMember1: ", {...newMember });  //객체 또는 배열을 리터럴을 출력한다.
     console.log("GET newMember2: ", {id: 'MT01301', ...newMember });  //Spread Syntax (...)을 이용하여 새로운 id 객체를 합치고 객체리터럴을 출력한다.
     console.log(`GET newMember3: 회원번호=${newMember.회원번호}, 이름='${newMember.이름}'`); //문자열과 합쳐서  출력한다.
            
    //1. 쿼리 생성
    let query = 'INSERT INTO MEMBER SET ?';
    console.log(query);
    console.log(`GET Parameter ==> 회원번호=[auto], 이름='${newMember.이름}', 나이=${newMember.나이}, 주소='${newMember.주소}`);
    
    //2. Connection Pool 모듈 콜백 함수
    getConnection( function(conn) {
        //conn.query('INSERT INTO MEMBER (이름, 나이, 주소) VALUES ?', {...newMember}, function (err, data) {
        conn.query('INSERT INTO MEMBER SET ?', {...newMember}, function (err, data) {

            //결과
            result(null, data.insertId);
                    
        });
        //지역변수 conn 으로 DB 연결 해제 (매우중요) 
        conn.release();            

    });   
};


/* 
 * UPDATE 모델
 */
Member.setUpdate = (updateMember, result) => {
    // 생성자를 통해 은닉화된 필드를 newMember 인자로 만들어서 UPDATE 한다.
 
    //1. 쿼리 생성
    let query = 'UPDATE MEMBER SET 이름=?, 나이=?, 주소=? WHERE 회원번호 = ?';
    console.log(query);
    console.log("GET Parameter ==> ", {...updateMember });  //합쳐서 나열하여 출력한다.
    
    //2. Connection Pool 모듈 콜백 함수
    getConnection( function(conn) {
        //conn.query('UPDATE MEMBER SET (이름, 나이, 주소) VALUES ?', {...newMember}, function (err, data) {
        conn.query(query, [`${updateMember.이름}`, `${updateMember.나이}`, `${updateMember.주소}`, `${updateMember.회원번호}`], function (err, data) {

            //결과
            result(null, data);
                    
        });
        //지역변수 conn 으로 DB 연결 해제 (매우중요) 
        conn.release();            

    });   
};

/* 
 * DELETE 모델
 */
Member.setDelete = (deleteMember, result) => {
   // 생성자를 통해 은닉화된 필드를 newMember 인자로 만들어서 INSERT 한다.
 
    //1. 쿼리 생성
    let query = 'DELETE FROM MEMBER WHERE 회원번호 = ?';
    console.log(query);
    console.log("GET Parameter ==> ", {...deleteMember });  //합쳐서 나열하여 출력한다.
    
    //2. Connection Pool 모듈 콜백 함수
    getConnection( function(conn) {
        //conn.query('UPDATE MEMBER SET (이름, 나이, 주소) VALUES ?', {...newMember}, function (err, data) {
        conn.query(query, [`${deleteMember.회원번호}`], function (err, data) {
            
            //결과
            result(null, data);
                    
        });
        //지역변수 conn 으로 DB 연결 해제 (매우중요) 
        conn.release();            

    });   
};


module.exports = Member;

```


## STEP3. 컨트롤러(Controller) 에서 모델 사용
### /controllers/member.controller.js
```js
const Member = require("../../models/member.model.js");  // 모델 Import
const path = require('path');

/* 
 * SELECT 
 * Example: http://blang.co.kr:30001/member/searchMbr?name=홍
 */
exports.searchMbr = (req, res, next) => {
    console.log('member.controller.js getMember() >> ');

    //1. URL 쿼리스트링 GET
    //console.log('req.query: ' + req.query);    // 그냥 이렇게 사용하면 object 으로 받음
    const { name, age, address } = req.query;
    const msg = (name !== null && name !== '' && name !== undefined) ? '[상세조회]' : '[전체조회]'
    console.log('GET name: ' + name);
    console.log('GET age: ' + age);
    console.log('GET address: ' + address); 
    
    //2. 유형별 쿼리 조합
    var param='';
    if (name) param += ` WHERE 이름 LIKE '%${name}%'`;
    if (age) param += ` WHERE 나이 LIKE '%${age}%'`;    
    if (address) param += ` WHERE 주소 LIKE '%${address}%'`;

    //3. 모델(Model) 정적메소드 호출 (보통 이런 형태로 에러처리한다.)	
    Member.selectArr(param, (err, data) => {

        if (err) res.status(500).send(null, { message:err.message || "에러"});    
          // 잘못된 코드
          //if (err) res.status(500).send({ message:err.message || "에러"}); 

          /* 아래 함수로 리디렉션이 안되는 이유
          res.sendFile 메소드는 서버에서 파일을 클라이언트에 전송하는 메소드로, 파일을 전송하여 브라우저에서 
          해당 파일을 다운로드하거나 표시할 수 있도록 합니다. 따라서 res.sendFile 메소드를 호출해도 
          페이지 이동이 발생하지 않습니다. 이는 단순히 파일을 전송하는 것이기 때문입니다. 
          만약 페이지 이동을 원한다면, 클라이언트 측에서 리다이렉션을 처리해야 합니다.
          예시로는 window.location 입니다.

          res.redirect('./js/common-page.html');
	 	  return res.redirect('./js/common-page.html');
	      res.redirect('http://www.naver.om');
	      res.sendFile(path.join(__dirname, '/../../public/index.html'));
          */
       
          // Alert 보내는법
		  //res.send("<script type='text/javascript'>alert('" +msg+"');</script>" + data);

          // 응답결과 보내는법
          res.send(data);  //응답결과를 라우터에게 보내줘야한다.
        
    });
    
    
}

/* 
 * INSERT
 * Example: http://blang.co.kr:30001/member/insertMbr?name=홍길동&age=19&address=서울특별시100
 */
exports.insertMbr = function(req, res, next)  {
    console.log('member.controller.js insertMember() >> ');

    //1. body DATA GET (bodyParser 모듈로 인해 사용가능해짐)
    //console.log('req.body: ' + req.body);    // 그냥 이렇게 사용하면 에러 발생함. req.body.name 이렇게 사용해야함
    const { name, age, address } = req.body;
    console.log('GET name: ' + name);
    console.log('GET age: ' + age);
    console.log('GET address: ' + address);
    
    // 2. 요청값 검증
    if (!req.query) res.status(400).send({message: "내용이 없습니다."});

    // 3. Member 모델 생성 (은닉화)
    //  const member = new Member({name: name, age: age, address: address || false});   // 방법1
    const member = new Member(req.body);   // 방법2
    
    // 4. 모델(Model) 정적메소드 호출 (보통 이런 형태로 에러처리한다.)	
    Member.setInsert(member, (err, data) => {
        if (err) res.status(500).send({message: err.message || "에러"});

        //res.send('삽입된 ROW 갯수: ' + data);
    });   
}

/* 
 * UPDATE
 * Example: http://blang.co.kr:30001/member/updateMbr?id=3&name='홍길동'&age='18'&address='서울특별시종로구100'
 */
exports.updateMbr = (req, res, next) => {
    console.log('member.controller.js updateMember() >> ');
    
    //1. body DATA GET (bodyParser 모듈로 인해 사용가능해짐)
    //console.log('req.body: ' + req.body);    // 그냥 이렇게 사용하면 에러 발생함. req.body.name 이렇게 사용해야함
    const { id, name, age, address } = req.body;
    console.log('GET id: ' + id);
    console.log('GET name: ' + name);
    console.log('GET age: ' + age);
    console.log('GET address: ' + address);
    
    // 2. 요청값 검증
    if (!req.body) res.status(400).send({message: "내용이 없습니다."});
    
    // 3. Member 모델 생성 (은닉화)
    //  const member = new Member({name: name, age: age, address: address || false});   // 방법1
    const member = new Member(req.body);   // 방법2
    
    // 4. 모델(Model) 정적메소드 호출 (보통 이런 형태로 에러처리한다.)	
    Member.setUpdate(member, (err, data) => {
        if (err) res.status(500).send({message: err.message || "에러"});

        res.send(data);
    });   
    
    
}

/* 
 * DELETE
 * Example: http://blang.co.kr:30001/member/updateMbr?id=3
 */
exports.deleteMbr = (req, res, next) => {
    console.log('member.controller.js deleteMember() >> ');
    
    //1. body DATA GET (bodyParser 모듈로 인해 사용가능해짐)
    //console.log('req.body: ' + req.body);    // 그냥 이렇게 사용하면 에러 발생함. req.body.name 이렇게 사용해야함
    const { id } = req.body;
    console.log('GET id: ' + id);
    
    // 2. 요청값 검증
    if (!req.body) res.status(400).send({message: "내용이 없습니다."});
    
    // 3. Member 모델 생성 (은닉화)
    //  const member = new Member({name: name, age: age, address: address || false});   // 방법1
    const member = new Member(req.body);   // 방법2
    
    // 4. 모델(Model) 정적메소드 호출 (보통 이런 형태로 에러처리한다.)	
    Member.setDelete(member, (err, data) => {
        if (err) res.status(500).send({message: err.message || "에러"});

        res.send('삭제된 ROW 갯수: ' + data);
        
    });   
   
}

```

## STEP4. 메인 및 라우터
### /server.js
```js
// AS-IS (메인 .env 로드)
//require('dotenv').config();

const config = require('./config/config.js');
const app = require('./app.js');
const PORT = process.env.PORT || 3000;


console.log('process.env.DB_HOST: ' + process.env.DB_HOST); // 환경 변수에서 호스트 정보 가져오기
console.log('port: process.env.DB_PORT: ' + process.env.DB_PORT); // 환경 변수에서 포트 정보 가져오기
console.log('user: process.env.DB_USER: ' + process.env.DB_USER); // 환경 변수에서 사용자 정보 가져오기
console.log('password: process.env.DB_PASSWORD: ' + process.env.DB_PASSWORD); // 환경 변수에서 패스워드 정보 가져오기
console.log('database: process.env.DB_DATABASE: '  + process.env.DB_DATABASE); // 환경 변수에서 데이터베이스 정보 가져오기
console.log('connectionLimit: process.env.DB_CONNECTIONLIMIT: ' + process.env.DB_CONNECTIONLIMIT); // 환경 변수에서 커넥션 리밋 정보 가져오기

app.listen(PORT, () => {
    console.log('/******************************************************');
    console.log('서버가 실행됩니다.. http://127.0.0.1:' + PORT + '/');
    console.log('환경설정파일:  ' + process.env.DESCRIPTION);
    console.log('******************************************************/');    
});

```

### /app.js  
```js
const express = require('express');
const logger = require('./middlewares/logger');
const customErr = require('./middlewares/customErr');
const basicErr = require('./middlewares/basicErr');

class App {
    constructor() {
	    this.app = express();
	    this.setMiddlewares();
	    this.setRouting();
	
        //특수한 Express 에러처리 미들웨어 생명주기로 인한 별도로 맨 마지막 등록
        this.app.use(basicErr);      // (추가) next() 로직이 없기때문에 여기서 끝난다.
	    this.app.use(customErr);
    }
    
    setMiddlewares() {
        //커스텀로거
        this.app.use(logger);
        
        //정적디렉토리설정
        this.app.use('/', express.static('public'));
        this.app.use('/member', express.static('./public')); // http:/주소:포트/member/css/test_css.css 가능해짐
        
         //bodyParser(BODY 데이터 핸들링)
        const bodyParser = require('body-parser');
	    this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());    
    }
        
    setRouting() {
        const routes = require('./routes'); 
        this.app.use('/', routes);
    }    
}

module.exports = new App().app;

```

### /routes/index.js
```js
const express = require('express');
const router = express.Router();

const main = require('./main');     //main 디렉토리 안에 동일명이 없으면 index.js 호출
const member = require('./member'); //member 디렉토리 안에 동일명이 없으면 index.js 호출

// URL 관리가 한눈에 들어온다.
router.use('/', main);
router.use('/member', member);

module.exports = router;

```

### /routes/member/index.js
```js
const express = require('express');
const router = express.Router();

const controller = require('../../controllers/member/member.controller');
const basicRouter = require('./basic');  // 컨트롤러 없는방식

// 주의) 컨트롤러 모듈기능을 익스포트한 함수에 대한 매핑이다.
/*
router.get('/searchMbr', (req, res, next) => {
    console.log('member 라우터 미들웨어에 오신것을 환영합니다.');
    next();
}, 
controller.searchMbr); 
*/

router.get('/searchMbr', controller.searchMbr);
router.post('/insertMbr', controller.insertMbr); 
router.post('/updateMbr', controller.updateMbr);
router.post('/deleteMbr', controller.deleteMbr);
router.use(basicRouter);

module.exports = router;

```



## STEP5. 화면에서 컨트롤러 호출
### /public/index.html
```html
<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <script src='js/jquery-3.6.4.min.js'></script>	
    <link rel='stylesheet' type='text/css' href='css/test_css.css'>    
    
	
    <title>Example</title>
</head>
<body>

<div class="search-container">
    <input type="text" placeholder="검색어 입력.." name="search" id="search-input">
    <input type="radio" name="search-type" value="all" id="search-all" checked>
    <label for="search-all">전체</label>
    <input type="radio" name="search-type" value="name" id="search-name">
    <label for="search-name">이름</label>
    <input type="radio" name="search-type" value="age" id="search-age">
    <label for="search-age">나이</label>
    <input type="radio" name="search-type" value="address" id="search-address">
    <label for="search-address">주소</label>
    <button type="button" id="search-btn">검색</button>
</div>


<div class='table-col'>
    <table>
      <thead>
        <tr>
          <th scope='col'>회원번호</th>
          <th scope='col'>이름</th>
          <th scope='col'>나이</th>
          <th scope='col'>주소</th>
          <th scope='col'>수정</th>          
          <th scope='col'>삭제</th>          
        </tr>
      </thead>
      <tbody>

<!--
        <tr>
          <td>값1-1</td>
          <td>값1-2</td>
          <td>값1-3</td>
        </tr>
        <tr>
          <td>값2-1</td>
          <td>값2-2</td>
          <td>값2-3</td>
        </tr>
        <tr>
          <td>값3-1</td>
          <td>값3-2</td>
          <td>값3-3</td>
        </tr>
-->

      </tbody>
    </table>
</div>

<button id='testBtn' style='width:100%;margin-bottom:20px'>절취선</button>
</body>


<script>

// 전역변수
let param = '';
let containParamURL = ''; 

let idInput = '';
let nameInput = '';
let ageInput = '';
let addressInput = '';


// 온로드
window.onload = function() {    
	
const testButton = document.getElementById('testBtn');

// 테스트버튼 클릭 이벤리스너
testButton.addEventListener('click', function() {
	var newURL = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname;
    alert(newURL);
});
    
    

const searchBtn = document.querySelector('#search-btn');       // 검색버튼
const searchAllRadio = document.querySelector('#search-all');  // 라디오버튼
const searchInput = document.querySelector('#search-input');   // 검색내용
const tableBody = document.querySelector('tbody');             //  tbody 태그 선택

// 조회버튼 클릭 이벤트리스너
searchBtn.addEventListener('click', () => {
    tableBody.innerHTML = ''; 
        

    const searchTypeRadios = document.querySelectorAll('input[name="search-type"]');
    let selectedType = '';

    for (let i = 0; i < searchTypeRadios.length; i++) {
        if (searchTypeRadios[i].checked) {
            selectedType = searchTypeRadios[i].value;  //선택한 체크박스의 VALUE 값 Ex) id, name, age, address
            //alert('selectedType: ' + selectedType); 
            break;
        }
    }
    
    // 입력한 검색어 설정
    //let searchValue = document.querySelector('#search-input').value.trim();
    let searchValue = $('#search-input').val().trim();
    
    // 입력한 검색어를 파라미터로 조립
    if (selectedType == 'all') {    
        param = '';    
    }else {
    	param = '?' + selectedType + '=' + searchValue;
    }
    
    // 컨트롤에 입력된 검색어 초기화
    //document.getElementById('search-input').value = ''; 
    $('#search-input').val(''); 

    
    // 요청URL 설정
    containParamURL = '/member/searchMbr'+param;

    //fn_select1(containParamURL);    // 조회 비동기 통신 (XMLHttpRequest 방식)
    //fn_select2(containParamURL);    // 조회 비동기 통신 (Ajax 방식)
    fn_select3(containParamURL);       // 조회 비동기 통신 (Promiss 방식)

}); // END addEvent

}  //END Windowonload



// 조회 비동기 통신 (XMLHttpRequest 방식)
function fn_select1(containParamURL) {
	
	// AS-IS (아래와 같이 호출하면 로드 시간이 걸린다. 그래서 1회정도 무반응하는 현상이 발생한다.)
    //script.src = './js/select_test_js_XMLHttpRequest.js';
    //document.head.appendChild(script);
    //start_XMLHttpRequest(containParamURL, fn_XMLHttpRequest);

    // TO-BE
    var script = document.createElement('script');
    script.src = './js/select_test_js_XMLHttpRequest.js';            
    script.onload = function() {
      // 스크립트 파일 로드 완료 후 실행되는 코드
        start_XMLHttpRequest(containParamURL, fn_XMLHttpRequest);
    };
    document.head.appendChild(script);
         
}

// 조회 비동기 통신 (Ajax 방식)
function fn_select2(containParamURL) {
   
    var script = document.createElement('script');
    script.src = './js/select_test_js_Ajax.js';
    script.onload = function() {
        // 스크립트 파일 로드 완료 후 실행되는 코드
        startAjax(containParamURL, fn_Ajax);

    };
    document.head.appendChild(script);
    
}


// 조회 비동기 통신 (Promiss 방식)
function fn_select3(containParamURL) {
   
    var script = document.createElement('script');
    script.src = './js/select_test_js_Promise.js';
    script.onload = function() {
        // 스크립트 파일 로드 완료 후 실행되는 코드
        startPromise(containParamURL, fn_promise);

    };
    document.head.appendChild(script);
    
}




// 업데이트 비동기 통신 (여기서부턴 그냥 통합해서 작성함. 원하는 방식외에 주석처리해서 사용법 숙지하기)
function fn_update(obj) {
	
	// (공통) 전달 DATA 설정
    idInput = $("#" + obj.id).closest("tr").find("#id").val();
    nameInput = $("#" + obj.id).closest("tr").find("#name").val();
    ageInput = $("#" + obj.id).closest("tr").find("#age").val();
    addressInput = $("#" + obj.id).closest("tr").find("#address").val();
    
    alert('[obj.id]: ' + obj.id                    + ', \n' +
      'idInput: ' + idInput                        + ', \n' +
      'nameInput: ' + nameInput          + ', \n' +
      'ageInput: ' + ageInput                 + ', \n' +
      'addressInput: ' + addressInput);

	// (공통) 요청URL 설정
    containParamURL = '/member/updateMbr'
    
	
    // 비동기통신기법1. Ajax 사용으로 POST 요청을 수행한다.
    /*
    $.ajax({
	    type: 'POST', 
	    data: {id: idInput, name: nameInput, age: ageInput, address: addressInput}, 
	    dataType: 'json', 
	    url: containParamURL, 
	    success: function(data) {
		
		    alert("결과: " + data);   // 얼럿에서는 [object] 으로 출력되어 확인을 못한다.

            // CASE1. console.log()를 사용하여 객체 내용을 브라우저 개발자 도구의 콘솔에 출력하기:
		    console.log("결과: " + data);   // 브라우저에서 확인
		
		   // CASE2. 객체의 속성에 접근하여 값을 읽기
		    alert("결과: " + data.affectedRows);   // 수정 성공 count
		    
		   // CASE3. 객체를 JSON 문자열로 변환 => JSON 문자열 출력
		    var jsonString = JSON.stringify(data);   
            alert("결과: " + jsonString);
		
	    }, error: function(xhr, status, error) {
		    alert("error" + xhr.status + error);
	    }
    });
    */
	
	
    // 비동기통신기법2. XMLHttpRequest 사용으로 POST 요청을 수행한다.
	/*
	//부모 tr 요소를 선택하고, tr 요소 내에서 id 속성값이 'id'인 요소를 선택
    idInput = obj.parentNode.parentNode.querySelector('#id').value;  
    nameInput = obj.parentNode.parentNode.querySelector('#name').value;
    ageInput = obj.parentNode.parentNode.querySelector('#age').value;
    addressInput = obj.parentNode.parentNode.querySelector('#address').value;
    
    // 0. body 데이터 생성
	const params = new URLSearchParams();
	params.append('id', idInput);
	params.append('name', nameInput);
	params.append('age', ageInput);
	params.append('address', addressInput);
    
    // 1. XMLHttpRequest 객체 생성
    const request = new XMLHttpRequest();
    
    // 2. onreadystatechage 이벤트리스너 등록
    request.onreadystatechange = function(event){
        // 응답코드 200(성공)을 받았는지 체크
        if(request.readyState == 4 && request.status == 200){
            
            const responseData = request.responseText;
            alert("결과: " + responseData);
        }
    }

    // 3. 요청 초기화 (동기식)
    request.open('POST', '/member/updateMbr', false);

    // 4. 요청 전송
    request.send(params);
    */
    
    
    
    // 비동기통신기법3. Promise 사용으로 POST 요청을 수행한다.
	// [Promise 객체 생성]
    var data = new Promise((resolve, reject) => {
    
        // [Promise 동작내용 작성]
        $.ajax({
	        type: 'POST', 
	        data: {id: idInput, name: nameInput, age: ageInput, address: addressInput}, 
	        dataType: 'json', 
	        url: containParamURL, 
	        success: function(data) {
		
		        alert("결과: " + data);   // 얼럿에서는 [object] 으로 출력되어 확인을 못한다.

                // CASE1. console.log()를 사용하여 객체 내용을 브라우저 개발자 도구의 콘솔에 출력하기
		        console.log("결과: " + data);   // 브라우저에서 확인
		
		       // CASE2. 객체의 속성에 접근하여 값을 읽기
		        alert("결과: " + data.affectedRows);   // 12
		    
		       // CASE3. 객체를 JSON 문자열로 변환 => JSON 문자열 출력
		        var jsonString = JSON.stringify(data);   
                alert("결과: " + jsonString);
		
	        }, error: function(xhr, status, error) {
		        alert("error" + xhr.status + error);
	        }
        });
    
    });
  
    // CASE1. then-catch문법을 사용하여 Promise 객체를 읽기
    data.then(function(result) {  
        // 성공 시 실행될 코드
        alert("[then-catch문법]성공 결과: ", result);
        
    }).catch(function(error) {
        // 실패 시 실행될 코드
        alert("[then-catch문법]실패 결과: ", error);
    });

  
    // CSAE2. async/await 문법을 사용하여 Promise 객체를 읽기
    (async function() {
    try {
        var result = await data; // 비동기 작업이 완료될 때까지 대기하고 결과를 받음
        alert("[async/await 문법]성공 결과: ", result);
        
    } catch (error) {
        alert("[async/await 문법]실패 결과: ", error);
    }
    })();

}



// 삭제 비동기 통신 (여기서부턴 그냥 통합해서 작성함. 원하는 방식외에 주석처리해서 사용법 숙지하기)
function fn_delete(obj) {
	
    // 비동기통신기법1. Ajax 사용으로 POST 요청을 수행한다.
    /*
    * 생략
    */
    
    // 비동기통신기법2. XMLHttpRequest 사용으로 POST 요청을 수행한다.
	
    //부모 tr 요소를 선택하고, tr 요소 내에서 id 속성값이 'id'인 요소를 선택
    idInput = obj.parentNode.parentNode.querySelector('#id').value;  
    
    // 0. body 데이터 생성
	const params = new URLSearchParams();
	params.append('id', idInput);
	
    // 1. XMLHttpRequest 객체 생성
    const request = new XMLHttpRequest();
    
    // 2. onreadystatechage 이벤트리스너 등록
    request.onreadystatechange = function(event){
        // 응답코드 200(성공)을 받았는지 체크
        if(request.readyState == 4 && request.status == 200){
            
            const responseData = request.responseText;
            alert("결과: " + responseData);
        }
    }
    
    // 3. 요청 초기화 (동기식)
    request.open('POST', '/member/deleteMbr', false);

    // 4. 요청 전송
    request.send(params);
    
    
    // 비동기통신기법3. Promise 사용으로 POST 요청을 수행한다.
    /*
    * 생략
    */
        
}

</script>
</html>

```

## 기타


### 


## MVC패턴 완성 후 정리
현재까지 완성환 구조는 다음과 같다.  
MVC 패턴이 완성되었다.

```bash
$ tree -I ./node_modules/
.
├── app.js
├── config
│   ├── conf_database
│   │   └── db_config.js
│   ├── conf_env
│   │   ├── .env.development
│   │   ├── .env.local
│   │   └── .env.production
│   ├── conf_json             #학습용
│   │   ├── default.json     #학습용
│   │   ├── development.json #학습용
│   │   └── production.json  #학습용 
│   ├── config.js
│   └── db_config.js
├── controllers
│   ├── main
│   │   └── main.controller.js
│   └── member
│       └── member.controller.js
├── middlewares
│   ├── basicErr.js
│   ├── customErr.js
│   └── logger.js
├── models
│   └── member.model.js
├── node_modules
│#   └── (중략)
├── package-lock.json
├── package.json
├── public
│   ├── css
│   │   └── test_css.css
│   ├── index.html
│   └── js
│        ├── jquery-3.6.4.min.js
│        ├── select_test_js_Ajax.js
│        ├── select_test_js_Promise.js
│        └── select_test_js_XMLHttpRequest.js
├── routes
│   ├── index.js
│   ├── main
│   │   └── index.js
│   └── member
│       ├── basic
│       │   └── index.js
│       └── index.js
└── server.js

```

### DAO 기능에 대해 다시생각해보자
스프링환경에서 별도로 분리된 DAO 클래스 파일을 너무 당연하게 사용하다보니.. 공부할겸 기능을 다시한번 되새김질해본다.  

1. DAO 로직을 별도의 클래스로 분리하면, 데이터베이스와의 연동 로직을 중앙 집중화하고, 코드의 재사용성과 유지보수성을 향상시킬 수 있다. 
2. 또한, 스프링의 트랜잭션 관리 기능과의 연동을 용이하게 할 수 있다.
  
내가 담당한 예시는 몇가지 예시는 다음과 같다.

```java
// UserDaoImpl.java (DAO 구현 클래스)
@Repository
public class UserDaoImpl implements UserDao {
    private static final String NAMESPACE = "com.example.dao.UserDao."; // MyBatis SQL 매핑 파일의 네임스페이스

    @Autowired
    private SqlSessionTemplate sqlSessionTemplate; // MyBatis와 연동하기 위한 SqlSessionTemplate

    @Override
    public User getUserById(int userId) {
        return sqlSessionTemplate.selectOne(NAMESPACE + "getUserById", userId); // MyBatis를 사용하여 데이터베이스에서 사용자 정보 조회
    }
    
    // 중략....... 
```

위 처럼 별도의 DAO 파일을 분리하고 SqlSessionTemplate 같은 (혹은  JdbcTemplate) 과 같은 데이터베이스 접근을 위한 라이브러리를 주입받아 사용하는 이점이 있었다.


### 스프링 VS Node.js 간 MVC 패턴에서 DAO
<span style="color:green"><b>***스프링***</b></span>  
스프링 프레임워크는 Java 기반의 웹 애플리케이션 개발을 위한 프레임워크로, <span style="color:red"><b>DAO 로직을 별도의 DAO(Data Access Object) 클래스에 구현하여 데이터 접근과 관련된 로직을 분리하는 것이 일반적인 설계 패턴</b></span> 중 하나이다.
  
다시말하면, 스프링 프레임워크에서는 보통 MyBatis, Hibernate, JPA 등의 ORM(Object-Relational Mapping) 라이브러리를 사용하여 데이터베이스와의 상호작용을 처리하고, 이를 위한 DAO 클래스를 별도로 작성하는 것이 일반적이다.
  
내가 담당했던, 그리고 그 밖에 서브로 담당했던 스프링 프로젝트에서도 DAO 로직을 별도의 DAO 파일로 분리하는 방식으로 구현되어 있었다.  
  
___

<span style="color:green"><b>***Node.js***</b></span>  
그러나 지금까지 구현한 Node.js의 경우, <span style="color:red"><b>Model 파일에 DAO 로직을 구현하는 방식을 고수</b></span>하고있다. (인터넷이나 깃허브의 대부분의 소스들이 그랬다.)
  
찾아보니 <span style="color:red"><b>일부 프레임워크나 라이브러리에서는 Model 파일에 DAO 로직을 구현하는 방식을 사용하는 경우가 있다고 한다.</b></span> 예를 들면, Express.js와 같은 인기 있는 Node.js 웹 프레임워크에서는 모델 파일에 데이터베이스와의 상호작용을 담당하는 DAO 로직을 구현하는 경우라고 설명한다.
  
왜냐고 물어본다면 <span style="color:red"><b>이는 JavaScript의 동적 특성과 콜백 기반의 비동기 처리 방식을 고려한 패턴이라고 한다.</b></span> 감이 잡히지 않아... 챗GPT 에게 여러 조합으로 질의한 결과 다음과 같은 결과를 얻어냈다.    

1. Node.js에서 비동기 처리를 위해 DAO 파일을 별도로 분리하지 않고 모델 파일에 구현하는 경우에는 아래와 같은 이점이 있을 수 있습니다:

2. 간편한 구현: DAO 파일을 별도로 분리하지 않고 모델 파일에 비동기 처리 로직을 구현하면, 파일이 하나로 통합되어 구현이 간편해질 수 있습니다. DAO 파일을 따로 만들지 않아도 되므로 파일 관리나 모듈 호출에 대한 복잡성이 줄어들 수 있습니다.

3. 빠른 개발 및 프로토타이핑: DAO 파일을 별도로 분리하지 않고 모델 파일에 비동기 처리 로직을 구현하면, 개발 속도가 빨라질 수 있습니다. 별도의 DAO 파일을 생성하고 관리하는 번거로움이 없기 때문에 프로토타이핑이나 간단한 프로젝트 개발에 편리할 수 있습니다.

4. 작은 규모의 프로젝트에서의 편리성: 작은 규모의 프로젝트에서는 DAO 파일을 별도로 분리하는 것이 필요하지 않을 수도 있습니다. 모델 파일 내에 비동기 처리 로직을 구현하면, 파일 수를 줄이고 파일 관리에 대한 복잡성을 감소시킬 수 있어 편리할 수 있습니다.

    > 그러나, 대규모 프로젝트나 복잡한 비즈니스 로직을 다루는 경우에는 DAO 파일을 별도로 분리하는 것이 일반적으로 권장됩니다. DAO 파일을 분리하여 코드의 구조를 단순화하고, 재사용성과 유지보수성을 향상시키며, 테스트 용이성을 갖출 수 있습니다. 또한, DAO 파일을 사용함으로써 <span style="color:blue"><b>데이터베이스 연결 및 CRUD 작업의 표준화와 추상화가 가능해지므로, 코드의 확장성과 유연성이 향상</b></span>될 수 있습니다.

생각해보면 이번 Node.js를 공부하면서 싱글스레드 환경에서 모듈이 모듈을 부르고 동기/비동기 순서를 맞춰주는 개념이 힘들었다. 그래서 구조를 잡을때 스프링처럼 DAO 를 별도로 파일로 구현하는게 맞을까 고민을 정말 많이했다. (결국 일반적으로 구현하는 형태로 Model 파일에 한번에 구현했다.) 그래서 나는 챗GPT 에게 여러 질의중 위 답변이 가장 근접하다고 생각한다. 
  
물론 DAO 로직을 별도의 파일로 분리할지, 모델 파일에 구현할지는 프로젝트의 구조 및 개발 환경에 따라 다를 수 있다. 한가지 더 느끼는건 <span style="color:red"><b>소규모 프로젝트에선 가성비있고 좋지만, 프로젝트가 크면 클 수록 Node 는 사용되지 않겠구나!</b></span> 라는 점이 더욱 확실해졌다. 

___