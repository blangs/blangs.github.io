---
title:  "JS 스크립트로 List(Map) 만들기"
excerpt: "JS 스크립트로 List(Map) 만들기 입니다."

categories:
  - html-css-js-jquery
tags:
  - [HTML,CSS,JS,jquery]

toc: true
toc_sticky: true

last_modified_at: 2023-09-02T20:00:00-05:00:00
---


## 개요 및 전제조건
> ❗<span style='color:green'><b><I>응답은 JSON타입 전제한다.</I></b></span>  
> ❗<span style='color:green'><b><I>List<Map<String, Object>> 형태로 서버에서 응답값이 전달된다면? </I></b></span>  
> 💡 서버측에서 응답으로 보내는 컬렉션을 javascript 에서 직접 구현해보기.



## 방법0: 서버없이 하드코딩
### 클라이언트
```js
//예시) List<Map<String,Object>>
let bckList = [
    JSON.parse('{"totalCount" : 36, "sqlCtnt" : "select * from dual", "ROWNUM" : 36}')
];


//리스트SET
$.each(bckList, function(index, element) {
    //맵에서 키값꺼냄
    $.each(element, function(colNm, colVal) {
        //리스트에서 맵 꺼냄
        console.log(colVal);
    })
});



/*
//순수 JS 방법 (forEach문)
bckList.forEach(function(row) {
  //맵에서 리스트 꺼냄
  Object.entries(row).forEach(function([colNm, colVal]) {
    //리스트에서 맵 꺼냄
    //colVal = colVal.replace(/\s/g, "");  //모든공백제거
    console.log(colVal);
  });
});
*/

```



## 방법1: 서버에서 JSON형 String 응답
### 서버
```java
@ResponseBody
@RequestMapping(value="/app/createMap",method = RequestMethod.POST)
public String createString(@RequestBody Map<String, Object> params){
    
    String jsonString = "{\"totalCount\" : 36, \"sqlCtnt\" : \"select * from dual\", \"ROWNUM\" : 36}";

    return jsonString;
}

```


### 클라이언트
```js
let bckList : [
    JSON.parse(/* 서버응답 String */)
];


//리스트SET
$.each(result.bckList, function(i,row){
  //맵에서 리스트꺼냄
  $.each(row, function(colNm, colVal){
    //리스트에서 맵 꺼냄
    console.log(colVal);
  });
});

```



## 방법2: 서버에서 List<Map<String,Object>> 응답
### 서버
```java
@ResponseBody
@RequestMapping(value="/app/createMap",method = RequestMethod.POST)
public Map<String, Object> createMap(@RequestBody Map<String, Object> params){
    Map<String, Object> resultMap = new Map<String, Object>();

    List<Map<String, Object>> list = bckService.getSelect(params);
    resultMap.put("bckList", list);

    return resultMap;
}

```
  
### 클라이언트
```js
//예시) List<Map<String,Object>>
let result = /* 서버응답 객체 */
  

//리스트SET
$.each(result.bckList, function(i,row){
    //리스트에서 맵 꺼냄
    $.each(row, function(colNm, colVal){
    //맵에서 키값꺼냄
    console.log(colVal);
  });
});

```


