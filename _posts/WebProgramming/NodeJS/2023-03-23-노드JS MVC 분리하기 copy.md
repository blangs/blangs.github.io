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

## 자원단위로 분리하기
### 구조

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

## Step 2 계층구조로 분리하기