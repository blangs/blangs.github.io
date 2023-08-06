---
title:  "JS 연산프로퍼티(Computed Property Name)"
excerpt: "JS 연산프로퍼티(Computed Property Name) 입니다."

categories:
  - html-css-js-jquery
tags:
  - [HTML,CSS,JS,jquery]

toc: true
toc_sticky: true

last_modified_at: 2023-08-04T20:00:00-05:00
---

## 연산 프로퍼티(Computed property)
### 1. 변수를 연산하기
```js
let test = 'age';

const user = {
  name : 'Cookie',
  test : 31,
}

```
```js
// console.log(user);
결과: {name: 'Cookie', test: 31}

```
> 💡위와 같은 JS 의 객체가 있다.  
> 💡연산 프로퍼티를 적용해보자.
  
```js
let test = 'age';

const user = {
  name : 'Cookie',
  [test] : 31,
}

```
```js
// console.log(user);
결과: {name: 'Cookie', age: 31}

```

### 2. 숫자, 문자열 연산하기

```js
const user = {
  [10 + 20] : 1,
  ["안녕" + "하세요"] : "Hello"
}

```
```js
// console.log(user);
{ '30': 1, '안녕하세요': 'Hello' }

```

### 예제
```js
import React, { useState } from 'react';

function YourComponent() {

  // 이러한 상태값이 있다고 가정한다.
  const [info, setInfo] = useState({username: '홍길동', text: '값입니다용'})

  const onChange = (event) => {
    const {name, value} = event.target;
    setInfo({...info, [name]: [value]});  // 연산 프로퍼티
  }

  return (
  <input
    name="username"
    placeholder="아이디"
    value={info.text}
    onChange={onChange}
  />)
}

```

> ❗***연산프로퍼티***  
> 💡동적인 값을 사용하려면 [] 대괄호로 감싸주자.  


## 메소드 (Methods)
### Object.assign()
```js
const user = {
  name : 'Cookie',
  age : 31,
}

const test = user;

```
  
> ❗***test 변수에 user 객체 자체를 할당하면?***  
> 💡 기본 치환은 [깊은 복사]로 같은 객체를 바라보도록 복사한다.  
> 💡 즉, 참조 타입이므로 같은 객체의 메모리를 바라본다.  
> - ```js
>   test.age = 99999
>
>   // console.log(user);
>   {name: 'Cookie', age: 99999}
>   ```
>   
> ❗***문제점***  
> 💡 test의 값을 변경하면 기존의 user 객체의 값도 변경이 되버린다.  
> 💡 하나의 객체를 두 변수가 접근하는 것  
> 💡 assign() 은 객체를 복사할 때 사용한다.  

```js
// 1. 기본적인 얕은 복사
const cloneUser = Object.assign({}, user);  

```
```js
{ name: 'Cookie', age: 31 }
```
```js
// 2. 초기화값을 병합하여 얕은 복사
const cloneUser = Object.assign({ gender: 'male'}, user);

```
```js
{ gender: 'male', name: 'Cookie', age: 31 }
```
```js
// 3. 기존에 존재하는 key 값으로 초기화해서 얕은 복사
const cloneUser = Object.assign({ age: 777 }, user);

```
```js
{ name: 'Cookie', age: 31 }  // 이건 안먹힌다.
```
```js
// 4. 두 개이상 병합해서 얕은 복사
const user1 = {
name : 'Cookie',
}

const user2 = {
  age : 31,
}

const user3 = {
  genger : 'male',
}

const cloneUser = Object.assign(user1, user2, user3);

```
```js
{name: 'Cookie', age: 31, genger: 'male'}
```


> ❗***Object.assign()***  
> 💡 assign() 함수는 [얕은 복사]로 새로운 객체로 복사한다.  
> 💡 cloneUser 에 user 객체를 복사했다.  
> 💡 위의 코드에서 빈 객체 ( {} ) 는 초기 값이다.  
> - param1: 초기값  
> - param2: 초기값과 함께 병합할 내용  
>   
> 복제가 아니라 병합메소드 인듯  


### Object.keys()
```js
const user = {
  name : 'Cookie',
  age : 31,
  gender : 'male',
}

Object.keys(user);

```
```js
[ 'name', 'age', 'gender' ]
```
  
> ❗***Object.keys()***  
> 💡 이렇게 key 값들만 배열로 반환한다.  


### Object.values()  
```js
const user = {
  name : 'Cookie',
  age : 31,
  gender : 'male',
}

Object.values(user);

```
```js
[ 'Cookie', 31, 'male' ]
```
  
> ❗***Object.values()***  
> 💡 값들만 배열로 반환한다.  


### Object.entries()
```js
const user = {
  name : 'Cookie',
  age : 31,
  gender : 'male',
}

Object.entries(user);

```
```js
[ [ 'name', 'Cookie' ], [ 'age', 31 ], [ 'gender', 'male' ] ]
```
  
> ❗***Object.entries()***  
> 💡 이렇게 [키, 값] 으로 된 배열이 프로퍼티 수 만큼 묶인 배열로 반환된다.  
> 💡 Object.fromEntries() 기능의 반대로 작동한다.  

### Object.fromEntries()
```js
const user = [
  ["name","Cookie"],
  ["age",31],
  ["gender","male"],
];

Object.fromEntries(user);

```
```js
{ name: 'Cookie', age: 31, gender: 'male' }
```
  
> ❗***Object.fromEntries()***  
> 💡 이렇게 [키, 값] 으로 구성된 배열이 이렇게 키, 값으로 깔끔하게 객체를 만들어 준다.  
> 💡 Object.entries() 기능의 반대로 작동한다.  



