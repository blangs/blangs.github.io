---
title:  "노드JS Express 웹서버"
excerpt: "노드JS Express 웹서버 입니다."

categories:
  - nodejs
tags:
  - [node.js]

toc: true
toc_sticky: true

last_modified_at: 2023-03-12T20:00:00-05:00
---

## [Express]이란 무엇일까?
: express 모듈이란 http 모듈처럼 서버 모듈이다.  
기본적인 http 모듈로 웹 서버를 만들면 직접 많은 기능을 개발해야한다. 
이를 편하게 사용하기 위해 만들어진 모듈이 Express(익스프레스) 이다. 
**간단한 코드로 웹 서버의 기능을 대부분 구현** 할 수있고, **미들웨어**와 **라우터**를 사용하여 편리하게 웹 서버를 구성할 수 있다.

## 웹서버 구축
### [AS-IS] http 모듈로 구현
**app-http.js**
```js
/*************************************************
http 모듈 메소드
http 모듈의 createServer() 메소드를 사용하여 server 객체를 생성한다.
listen() : 서버를 실행하고 클라이언트를 기달린다.
close() : 서버를 종료한다.
request : 클라이언트가 서버에 요청할 때 발생하는 [이벤트]이다.
connection : 클라이언트가 접속할 때 발생하는 [이벤트]이다.
close : 서버가 종료될 때 발생하는 [이벤트]이다.
*************************************************/

const http = require('http');
const PORT = 3000;

// Lamda 문법 사용시
/*
const app = http.createServer( (req, res) => {
	//중략
});
*/

var app = http.createServer( function(req, res) {
	
	var url = req.url;
	console.log('__dirname: ' + __dirname);  //결과: /fswas/wasadm/nodeStudy/
	console.log('url: ' + url);  //결과: /
	console.log('method: ' + req.method);  //결과: GET
	
	//디폴트 HTML 설정
	res.setHeader("Content-Type", "text/html;charset=UTF-8")
	
	//본문을 write 하고 응답을 최종 보내는 end() 메소드는 가장 마지막에 한번 사용해야함
	if(req.url == '/' && req.method == 'GET') {
        console.log('app.js >> /'+ '\n'); 
        res.writeHead(200);
        res.write("<html><head></head><body>");
        res.write("<form action='/message' method='POST'>");
        res.write("<input type='text'/>");
        res.write("<button>메세지 전송(POST)</button>");
        res.write("</form>");
        res.write("</body></html>");
        
        url = '/index.html';        
    }
    if(req.url == '/favicon.ico' && req.method == 'GET') {
        console.log('app.js >> /favicon.ico'+ '\n');
        res.writeHead(404);
        
        url = '/error.html';        
    }
    if(req.url == '/message' && req.method == 'POST') {
		console.log('app.js >> /message'+ '\n');
		res.writeHead(200);
		
        url = '/message.html';        
    }
    
    console.log(__dirname + url);  //결과: /fswas/wasadm/nodeStudy/index.html
    res.end();     // end하면 클라이언트한테 응답 보냄. 가장 마지막에 작성해야 정상작동 한다.
    
});
app.listen(PORT, () => {
	console.log(`http SERVER START... >> http://localhost:${PORT}`);
});

```

### [TO-BE] Exrpess 모듈로 구현

**app_express.js**  
```js
/*************************************************
Express 모듈 메소드
use() : 미들웨어 함수를 사용한다.
get() : get으로 사용자 정보를 전달 받는다.
set() : 서버 설정을 위한 속성을 지정한다.
redirect() : 웹 페이지의 경로를 강제로 이동시킨다.
send() : 클라이언트에 응답 데이터를 보낸다.
header() : 헤더를 확인한다.
*************************************************/

const express = require('express');
const app = express();  //생성자: 반드시 이렇게 사용해야 에러가 안난다.
const PORT = 3000;

// Lamda 문법 사용시
/*
app.get('/', (req, res) => {
    res.send('Hello World');
});
*/
var url = '';
//본문을 write 하고 응답을 최종 보내는 send() 메소드는 가장 마지막에 한번 사용해야함
app.get('/', function(req,res) {
    console.log('app.js >> /'+ '\n');  
    //Express 에서 응답코드는 자동으로 200 을 셋팅한다. 그래서 아래 코드는 생략해도 된다.
    res.status(200);
    res.send();
    
    url = '/index.html';
});

//본문을 write 하고 응답을 최종 보내는 send() 메소드는 가장 마지막에 한번 사용해야함
app.get('/favicon.ico', function(req,res){
    console.log('app.js >> favicon.ico'+ '\n');       
    res.status(404).send('메소드체이닝 발동' + '\n');  //Express 에서 응답코드를 셋팅하는 방법. (그리고 메소드 체이닝으로 응답해보았다.)
    
    url = '/error.html';
});

app.listen(PORT, () => {
	console.log(`Express SERVER START... >> http://localhost:${PORT}`);
});

```

## 웹서버 미들웨어
NodeJs Express에서 미들웨어는 app.use(미들웨어 함수)의 기능을 nodeJs로 구축한 어플리케이션을 실행하여 라우팅 될때마다 실행 되는 것을 말한다.

### 미들웨어 예제(기본)

```js
const express = require('express');
const app = express();
const PORT = 3000;

// 미들웨어 정의 
var requestTime = function (req, res, next) {
  console.log('미들웨어 발동!');
  next();
};

// 미들웨어 호출
app.use(requestTime);

app.get('/test1', function(req,res){
    console.log('호출1');
});
app.get('/test2', function(req,res){
    console.log('호출2');
});
app.post('/test3', function(req,res){
    console.log('호출3');
});

```
  
위 결과는 REST API 요청시 미들웨어가 먼저 실행되는 것을 확인할 수 있다.  
  
```bash
# /test1 호출
미들웨어 발동!
호출1
# /test2 호출
미들웨어 발동!
호출2
# /test3 호출
미들웨어 발동!
호출3

```

### 미들웨어 예제(메소드 사용하기)

 

대표적인 미들웨어로는 

body-parser, compression 등이 있다.

### 미들웨어 에러처리
NodeJs로 구현한 웹 애플리케이션에 클라이언트가 잘못된 주소에 접근하게되면 404 와 같은 에러 처리를 해주어야 한다. 
모듈을 사용하지 않으면 기본적인 nodejs에서는 url별로 분기처리 코드가 작성된다. express에서는 어떻게 해결해야 할까?
  
Express에서의 에러처리는 코드의 마지막에 에러처리 미들웨어를 작성해주면 된다. 서버에서 해당 주소를 찾다가 마지막까지 없다면
해당 미들웨어를(에러처리) 실행하게 되는 것이다.  
  
**app.js**


###
