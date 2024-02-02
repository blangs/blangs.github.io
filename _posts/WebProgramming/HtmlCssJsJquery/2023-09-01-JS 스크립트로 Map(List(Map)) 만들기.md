---
title:  "2023-09-01-JS 스크립트로 Map(List(Map)) 만들기"
excerpt: "2023-09-01-JS 스크립트로 Map(List(Map)) 만들기 입니다."

categories:
  - html-css-js-jquery
tags:
  - [HTML,CSS,JS,jquery]

toc: true
toc_sticky: true

last_modified_at: 2023-09-01T20:00:00-05:00:00
---


## 개요 및 전제조건
> ❗<span style='color:green'><b><I>응답은 JSON타입 전제한다.</I></b></span>  
> ❗<span style='color:green'><b><I>Map<String, List<Map<String, Object>>> 형태로 서버에서 응답값이 전달된다면? </I></b></span>  
> 💡 서버측에서 응답으로 보내는 컬렉션을 javascript 에서 직접 구현해보기.

### 코드
```js

<script>
let result = {
  list : [
    JSON.parse('{"totalCount" : 36, "sqlCtnt" : "select * from dual", "ROWNUM" : 36}')
  ]
};

$.each(result.list, function(i,row){
  //맵에서 리스트꺼냄
  $.each(row, function(colNm, colVal){
    //리스트에서 맵 꺼냄
    if(colNm == "totalCount") {....}
    colVal.replace(" ");
  });
});
</script>

```