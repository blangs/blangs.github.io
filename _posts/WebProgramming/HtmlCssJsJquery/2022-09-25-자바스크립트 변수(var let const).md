---
title:  "자바스크립트 변수(var let const)"
excerpt: "자바스크립트 변수(var let const) 입니다."

categories:
  - html-css-js-jquery
tags:
  - [HTML,CSS,JS,jquery]

toc: true
toc_sticky: true

last_modified_at: 2022-09-01T20:00:00-05:00
---

## 자바스크립트 변수
: 참고블로그 [링크](https://curryyou.tistory.com/192)

## var, let, const 차이점 5가지
1. 중복선언 가능 여부
2. 재할당 가능 여부
3. 변수 스코프 유효범위
4. 변수 호이스팅 방식
5. 전역객체 프로퍼티 여부


## 중복선언 가능 여부
### (1) var: 중복 선언이 가능

```js
// 첫번째 변수 선언+초기화
var a = 10;
console.log(a); // 10


// 두번째 변수 선언+초기화
var a = 20;
console.log(a); // 20


// 세번째 변수 선언(초기화X)
var a;
console.log(a); // 20

```
  
### (2) const, let: 중복 선언 불가능

```js
// let 중복 선언
let a = 10;
let a = 20; // SyntaxError: Identifier 'a' has already been declared

// const 중복 선언
const b = 10;
const b = 20; // SyntaxError: Identifier 'b' has already been declared

```

## 재할당 가능 여부
### (1) var, let: 값의 재할당이 '가능'한 변수
```js
var a = 10;
a = 20;
console.log(a);  // 20 재할당


let b = 111;
b = 222;
console.log(b);  // 222 재할당

```

### (2) const: 값의 재할당이 '불가능'한 상수다.
```js
const c = 111;
c = 222;  // TypeError: Assignment to constant variable.

```

> **참고) const는 처음 선언할 때 반드시 초기화(값 할당)를 해주어야 한다.**
>
>> ```js
>> jsconst a = 10;  
>> const b;  // SyntaxError: Missing initializer in const declaration
>> 
>> ```


## 스코프
### (1) var: 함수 레벨 스코프(function-level scope)
```js
function hello(){
    var a = 10;     // 함수 내부에만 선언된 var변수는 무조건 지역변수다.
    console.log(a);
}

hello(); // 10

console.log(a);  //ReferenceError: a is not defined

```

```js
if(true) {
    var a = 10;     // 함수에 정의된 것이 아니므로 무조건 전역변수다.
    console.log(a); // 10
}

console.log(a);  // 10

```

- var는 함수 내부에 선언된 변수만 지역변수로 한정하며, 나머지는 모두 전역변수로 간주한다.
- var는 함수를 제외한 영역에서 var로 선언한 변수는 무조건 '전역변수'로 취급된다.

    즉, 함수가 아닌 if문, for문, while문, try/catch 문 등의 코드 블럭{ ... } 내부에서 var로 선언된 변수를 전역 변수로 간주한다.  
    {: .notice--info}

### (2) let, cost: 블록 레벨 스코프(block-level scope)

```js
if(true) {
    let a = 10;
    console.log(a); // 10
}

console.log(a);  // ReferenceError: a is not defined

```

```js
function hello() {
    let a = 10;
    console.log(a); // 10
}

console.log(a);  // ReferenceError: a is not defined

```
- if문의 블럭 내부에서 let으로 선언된 변수는 외부에서 참조되지 않음을 알 수 있다.
- 당연히 함수 내부에서 선언된 변수도 외부에서 참조할 수 없다.


## 호이스팅
: 자바스크립트의 호이스팅(hoisting)은 끌어올린다는 의미를 가진다. 코드를 실행하기 전, 일종의 '코드 평가 과정'을 거치는데, 이 때 '변수 선언문'을 미리 실행두기 때문에 뒤에서 선언된 변수도 앞의 코드에서 참조할 수 있게 된다.

### (1) var: 변수 호이스팅이 발생한다.

```js
console.log(a);  // undefined
var a = 10;
console.log(a);  // 10

```

### (2) let, const: 변수 호이스팅이 발생한다. 하지만 다른 방식으로 작동한다.

```js
console.log(a);  // ReferenceError: Cannot access 'a' before initialization
let a = 10;

```

```js
let a = 10;  // 전역변수 a선언

if(true){
    console.log(a);  // ReferenceError: Cannot access 'a' before initialization
    let a = 20;  // 지역변수 a 선언
}
```

위 에러는 호이스팅이 발생하지 않는 것처럼 보이지만 사실 이 에러가 호이스팅이다.  
- let, const의 호이스팅 과정이 var와 다르게 진행된다.
- 변수의 선언과 초기화 사이에 일시적으로 변수 값을 참조할 수 없는 구간을 TDZ(Temporal Dead Zone)라고 한다.
- let, const 로 변수를 선언하는 경우 호이스팅된다면 TDZ 구간이 만들어지면서 에러가 발생한다.


**예제2**  
: 위 예제1 에서는 단순히 최상단이라고 생각했는데 호이스팅에 대한 정리가 잘되어있는 블로그 내용을 보니 잘못된 생각이였다.. 참고한 블로그를 보고 아래 내용을 추가했다.

```js
 console.log(a());
 console.log(b());
 console.log(c());
 
 function a() { // 함수선언문
  return 'a';
 }
  
 var b = function bb() { // 함수표현식
  return 'bb';
 }
 
 var c = function() { // 함수표현식
  return 'c';
 } 
 
```

위 내용이 실제 자바스크립트에서는 아래와 같이 표현된다.  
여기서 중요한점은 Only `'선언'` 을 발견하면 무작정 끌어올린다는 것이다. 
 
```js
 function a() {  // 함수선언문을 끌어올렸다.
  return 'a';
 }
 var b;  // 함수표현식으로 선언한 변수를 끌어올렸다.
 var c;  // 함수표현식으로 선언한 변수를 끌어올렸다.
 
 console.log(a());
 console.log(b()); // 에러: 변수로 끌어올리느라 함수로 초기화 되지 못한 상태로 사용되었다,
 console.log(c()); // 에러: 변수로 끌어올리느라 함수로 초기화 되지 못한 상태로 사용되었다,
 
 b = function bb() {
  return 'bb';
 }
 
 c = function() {
  return 'c';
 } 
 
```
  
var b = function과 var c = function은  함수선언과 함수할당이 동시에 존재하는 형태이다.
즉, 선언만 딱 분리해서 위로 올렸기에 변수 초기화를 하지 못했으므로 에러가 발생한다.


***핵심***  
참고블로그) [링크](https://kim6394.tistory.com/19)  
누군가가 호이스팅을 물어왔을 때 단순히 "선언을 끌어올리는 거야."가 아니라
구체적으로 함수선언문과 함수표현식을 나눠서 선언부분만 떼어올리는 개념을
이해하고 설명해줄 수 있어야 한다.
{: .notice--info}
  
  
### [실행 컨택스트]
: 자바스크립트에서 실행되는 모든 것들을 관리하는 부분이 바로 실행컨택스트 영역이다.

**(참고)JS의 코드유형**
: 그런데 글로벌 컨택스트의 경우에는 오직 하나만 존재하는 반면에 function, eval 컨택스트는 하나의 프로그램 내에서 여러개가 존재할 수 있다.  
- global 코드    ==> 오직하나만 존재 가능
- function 코드  ==> 하나의 프로그램 내에서 여러개 존재 가능
- eval 코드      ==> 하나의 프로그램 내에서 여러개 존재 가능

**간략한 실행 컨택스트 동작**

```js
function foo(bar){}
foo(10)
foo(20)
foo(30)

```

- 결과
  1. 함수가 각기 다른 인자를 가지고 세번 호출이 되었다. 
  2. 이 경우에는 서로 다른 실행컨택스트가 생성이 된다.
  3. 즉 동일한 함수의 실행이라도 이미존재하는 컨택스트를 재활용하는 것이 아닌 새로운 컨택스트를 계속 생성한다.

**실행 컨택스트 동작방식 전체흐름**  

1. 실행컨택스트는 [실행컨택스트의 스택(Stack)] 이라는 영역이 존재(FILO)
2. [실행컨택스트의 스택(Stack)]의 실행컨택스트는 현재 실행이 되고 있는 컨택스트를 의미하고 이를 callee(콜리) 라고 부른다.
3. [실행컨택스트의 스택(Stack)]의 실행컨택스트가 다른 컨택스트를 실행시키기 위해서 필요한것을 caller(콜러) 라고 부른다.
4. caller(콜러)가 어떠한 context를 실행하게 되면 기존에 caller(콜러)가 동작시키고 있던 실행의 흐름이 새롭게 동작하는 context, 즉 callee(콜리)로 변경이 된다.
5. 이때 callee(콜리)는 실행컨택스트의 최상단에 위치하게 되고 `[Active Context]` 라는 이름을 가지게 된다
6. callee(콜리), 즉 `[Active context]` 의 동작이 끝이 나면 실행흐름을 다시 caller(콜러)에게 전달하여 다른 context쪽으로 실행의 흐름을 변경하는 작업이 반복되게 된다. 
7. 동작을 마친 예전 callee(콜리)는 간단하게 return 하거나 exception과 함께 exit을 하게 된다.

여기까지가 실행컨텍스트의 전체적인 흐름이다.  
상세내용은 다음과 같다 
  
**실행 컨택스트 동작방식 상세흐름**  
: EXMAScript, 자바스크립트의 코드의 실행관리 형태  
  
1. 프로그램이 일단 실행이 되면 모두 글로벌 실행 컨택스트(global exceution context)로 들어오게 된다.(글로벌 컨택스트는 실행 컨택스트 스택의 제일 아래에 존재하며 이는 최초로 생성된 컨택스트를 의미하기도 한다.)
2. 들어온 글로벌 코드들이 몇몇 초기화 작업을 진행하며 필요한 객체나 함수들을 생성을 한다. 이렇게 글로벌 컨택스트가 실행이되는 동안 새로운 함수들이 생성이되고 실행이 되면서 [실행컨택스트의 스택(Stack)]내로 들어와 글로벌 컨택스트 위로 차곡차곡 쌓이게 된다.
3. 초기화가 끝이 나면 runtime 시스템은 사용자의 클릭이나 글로벌하게 발생하는 함수 실행같은 이벤트가 발생하기를 기다린다.
4. 이벤트가 발생이 하게 되면서 실행컨택스트 내의 컨택스트들이 하나하나동작을 하게 됩니다.


여기까지 간단하게 설명을 하면 컨택스트 스택에 컨택스트들이 차곡차곡 쌓이게 되고(글로벌 컨택스트 위로^^) 이를 
caller가 호출하면서 프로그램의 흐름을 관리한다는 말이다. 
{: .notice--info}



caller에 의해 호출은 되지 않지만 실행 컨택스트로 컨택스트가 추가가 되면 변수 객체에는 각 종 변수와 함수들이 프로퍼티로 정의 가되고 이때 모든 값은 undefined형태로 존재하게 됩니다.

