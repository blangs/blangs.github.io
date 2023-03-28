---
title:  "노드JS MVC 분리하기"
excerpt: "노드JS MVC 분리하기 입니다."

categories:
  - nodejs
tags:
  - [node.js]

toc: true
toc_sticky: true

last_modified_at: 2023-03-23T20:00:00-05:00
---

## STEP1. 자원단위로 분리하기
```bash
.
├── app.js
└── routes
    ├── index.js
    ├── main.js
    └── member.js
 
```

### /app.js
```js
const express = require('express');
const app = express();
const PORT = 3000;

const mainRouter = require('./routes/main');
const memberRouter = require('./routes/member');

app.use('/', mainRouter);
app.use('/member', memberRouter);

app.get('/', (req,res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log('서버가 실행됩니다.. http://127.0.0.1:' + `{PORT}` + '/');
});

```

### /routes/main.js
```js
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('main.js / start  >> ');
});

module.exports = router;

```

### /routes/member.js
```js
const express = require('express');
const router = express.Router();

router.get('/select', (req, res) => {
    console.log('main.js select start  >> ');
})
.post('/insert', (req, res) => {
    console.log('main.js insert start  >> ');
})
.put('/update', (req, res) => {
    console.log('main.js update start  >> ');
})
.delete('/delete', (req, res) => {
    console.log('main.js delete start  >> ');
});

module.exports = router;

```

## STEP2. 계층구조로 분리하기
```bash
.
├── app.js
└── routes
    ├── index.js
    ├── main.js
    ├── member          # 신규
    │   └── basic.js   # 신규(member.js를 상세하게 분리)
    └── member.js

```

### app.js
```js
// 기존과 코드 동일
const express = require('express');
const app = express();
const PORT = 3000;

const mainRouter = require('./routes/main');
const memberRouter = require('./routes/member');

app.use('/', mainRouter);
app.use('/member', memberRouter);

app.listen(PORT, () => {
    console.log('서버가 실행됩니다.. http://127.0.0.1:' + `{PORT}` + '/');
});


```

### /routes/member.js
```js
const express = require('express');
const router = express.Router();

const basicRouter = require('./member/basic'); //조금더 명확한 계층으로 나눔.(코드가 재사용(중복) 되는 구간이 많다면 효율적.)

router.use(basicRouter);

module.exports = router;

```

### /routes/<span style='color:blue'>member/basic.js</span>
```js
const express = require('express');
const router = express.Router({mergeParams: true}); // (기본값false)부모의 매개변수를 상속받도록 함

router.get('/select', (req, res) => {
    console.log('main.js select start  >> ');
})
.post('/insert', (req, res) => {
    console.log('main.js insert start  >> ');
})
.put('/update', (req, res) => {
    console.log('main.js update start  >> ');
})
.delete('/delete', (req, res) => {
    console.log('main.js delete start  >> ');
});

// ex) http://호스트주소:포트/member/detaile/홍길동/20
router.get('/detaile/:name/:age', (req, res) => {
    console.log('main.js detaile start  >> ');
    console.log('name: ' + req.params.name);
    console.log('age: ' + req.params.age);
});


module.exports = router;

```


## STEP3. index.js 파일로 계층구조 리팩토링
STEP2 에서 <span style='color:blue'>routes/member/</span> 라는 폴더와 <span style='color:blue'>routes/member.js</span> 파일이 동일한 이름으로 존재하고 있다.  
  
이런식의 구조는 언뜻 보기에도 모호하고 정적 파일을 불러오는 입장에서도 이 것이 폴더인지 js인지 헷갈리기 때문에 상당히 좋지않다.  

결론부터 말하자면 <span style='color:red'>[각각의 라우팅 모듈]</span>에 대해서 <span style='color:blue'>[각각의 경로]</span>에 <span style='color:blue'>index.js 파일을 만들고 참조하도록 모든 모듈을 폴더화</span> 한다.


### packages.json
```js
{
...
  "main": "index.js",
...
}
```

Node.js에서 package.json의 main 옵션 값에 따라 폴더를 로드할 때 해당 폴더안에 어떤 파일을 불러올 것이냐 정할 수 있다는 것이다. (미지정시 index.js 또는 index.node 가 불러와짐)  
  
즉 나의 packages.json 설정에 따르면 require를 통해 모듈을 불러올 때 !

> const module = require('./module');

만약 위처럼 확장자를 입력하지 않으면
- module.js 파일을 찾는다.
    - 만약 있다면 그 파일을 추출.
    - <span style='color:blue'>만약 없다면 module 이라는 폴더를 찾아서 그 폴더의 index.js 파일을 찾아 추출.</span>

위와 같은 특징을 활용해서 계층구조를 깔끔하게 변경해보자.

```bash
.
├── app.js
└── routes
     ├── index.js         
     ├── main
     │    └── index.js   
     └── member
           ├── basic
           │   └── index.js
           └── index.js

# 각 폴더에 index.js 파일이 들어있다.
# 모듈 호출시 디폴트한 기준을 호출하는 js 개념이 되는것이 핵심이다.

```


### /app.js
```js
// 기존과 코드 동일
const express = require('express');
const app = express();
const PORT = 3000;

// AS-IS
// const mainRouter = require('./routes/main');
// const memberRouter = require('./routes/member');
// app.use('/', mainRouter);
// app.use('/member', memberRouter);

// 확장자를 입력하지 않으면 [/routes] 폴더를 찾은뒤에 [routes.js] 라는 js 가 없는경우 
// packages.json 설정에 의해 특정 파일을 먼저 읽어버림. 현재는 index.js 으로 설정되어있다.
const routes = require('./routes'); 
app.use('/', routes);


app.listen(PORT, () => {
    console.log('서버가 실행됩니다.. http://127.0.0.1:' + `{PORT}` + '/');
});

```

> ***<span style='color:red'><b>위 처럼 분리한 이유)</b></span>***  
> app.js는 라우팅 기능 말고도 여러 미들웨어를 불러오고 포트를 설정하는 등 많은 역할을 한다.
> 따라서 여러 <span style='color:blue'>end-point에 따라 router를 장착하는 부분도 분리하여 관리</span>하자

### /routes/index.js
```js
const express = require('express');
const router = express.Router();

// AS-IS
// const main = require('./main.js');  //특정모듈을 호출
// const user = require('./member.js') //특정모듈을 호출

// TO-BE
const main = require('./main');     //main 디렉토리 안에 동일명이 없으면 index.js 호출
const member = require('./member'); //member 디렉토리 안에 동일명이 없으면 index.js 호출

router.use('/', main);
router.use('/member', member);

module.exports = router;

```


### /routes/main/index.js
```js
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('main.js / start  >> ');
});

module.exports = router;

```



### /routes/member/index.js
```js
const express = require('express');
const router = express.Router();

const basicRouter = require('./basic'); //조금더 명확한 계층으로 나눔.(코드가 재사용(중복) 되는 구간이 많다면 효율적.)

router.use(basicRouter);

module.exports = router;

```

### /routes/member/basic/index.js
```js
const express = require('express');
const router = express.Router({mergeParams: true}); // (기본값false)부모의 매개변수를 상속받도록 함

router.get('/select', (req, res) => {
    console.log('main.js select start  >> ');
})
.post('/insert', (req, res) => {
    console.log('main.js insert start  >> ');
})
.put('/update', (req, res) => {
    console.log('main.js update start  >> ');
})
.delete('/delete', (req, res) => {
    console.log('main.js delete start  >> ');
});

router.get('/detaile/:name/:age', (req, res) => {
    console.log('main.js detaile start  >> ');
    console.log('name: ' + req.params.name);
    console.log('age: ' + req.params.age);
});


module.exports = router;

```


## STEP4. 라우팅 기능과 서비스 로직을 분리
~~먼저 각 end-point폴더의 index.js와 같은 경로에 controller 파일을 만든다~~  

```bash
.
├── app.js
├── controllers
│   ├── main
│   │   └── main.controller.js
│   └── member
│        └── member.controller.js
└── routes
     ├── index.js         
     ├── main
     │    └── index.js   
     └── member
           ├── basic
           │   └── index.js
           └── index.js

```
요약하면 다음과 같다.
1. index.js엔 라우팅 기능만 남긴다.
2. 자세히 말하자면, 각 라우터들의 end-point 폴더에서 각 파일들(index.js) 로직을 모두 제거하고 컨트롤러를 바라보도록 라우팅 기능만 설정해준다.
  
한 폴더에서 관리할까 생각했는데, 귀찮아도 controller 는 명확하게 따로 분리한다.  
{: .notice--info}

### /app.js
```js
/* 기존과 코드 동일 */
```

### /routes/index.js
```js
/* 기존과 코드 동일 */
```


### /routes/main/index.js
: 컨트롤러 라우터 추가

```js
const express = require('express');
const router = express.Router();

const controller = require('../../controllers/main/main.controller')

// 주의) 컨트롤러 모듈기능을 익스포트한 함수에 대한 매핑이다.
router.get('/', controller.main);

module.exports = router;

```

### /routes/member/index.js
: 컨트롤러 라우터 추가

```js
const express = require('express');
const router = express.Router();

const controller = require('../../controllers/member/member.controller')
const basicRouter = require('./basic');  // 컨트롤러 없는방식

// 주의) 컨트롤러 모듈기능을 익스포트한 함수에 대한 매핑이다.
router.get('/select', (req, res, next) => {
    console.log('테스트');
    next();
}, 
controller.getMember);
router.get('/insert', controller.insertMember); 
router.get('/update', controller.updateMember);
router.get('/delete', controller.deleteMember);
router.use(basicRouter);

module.exports = router;

```

### /routes/member/basic/index.js
```js
/* 기존과 코드 동일 (AS-IS 참고용으로) */
```

### /controllers/main/main.controller.js
```js
exports.main = (req, res, next) => {
    console.log('main.controller.js >> main()');    
}

```

### /controllers/member/member.controller.js
```js
exports.getMember = (req, res, next) => {
    console.log('member.controller.js getMember()');
    //res.render('index', { title: 'Express' });
}
exports.insertMember = (req, res, next) => {
    console.log('member.controller.js insertMember() >> ');
}
exports.updateMember = (req, res, next) => {
    console.log('member.controller.js updateMember() >> ');
}
exports.deleteMember = (req, res, next) => {
    console.log('member.controller.js deleteMember() >> ');
}

```






