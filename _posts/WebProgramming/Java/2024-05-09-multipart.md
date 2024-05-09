---
title: "multipart"
excerpt: "multipart 입니다."

categories:
  - java
tags:
  - [java]

toc: true
toc_sticky: true

last_modified_at: 2024-05-09T13:00:00-05:00:00
---



## 프론트
### 방법1 : FORM Action
```jsp
<form id="fileForm" action="upload" enctype="multipart/form-data">
    <input type="file" name="file" id="file">
    <button type="button" id="uploadButton">Upload File</button>
</form>

```

### 방법2 : AJAX
```jsp
<form id="fileForm" enctype="multipart/form-data">
    <input type="file" name="file" id="file">
    <button type="button" id="uploadButton">Upload File</button>
</form>

```

```js
/* 
반드시 필요(file이동:formData사용시)
- processData:false,
- contentType: false,
- Uncaught TypeError: Illegal invocation 에러발생
*/

$(document).ready(function(){
    $('#uploadButton').click(function(){
        var formData = new FormData($('#fileForm')[0]); // 폼 데이터 생성

        $.ajax({
            type: 'POST',
            url: '/upload', // 파일을 업로드할 엔드포인트 URL
            data: formData,
            contentType: false, // 필수
            processData: false, // 필수
            success: function(response){
                // 파일 업로드 성공 시 수행할 작업
                console.log('File uploaded successfully');
            },
            error: function(xhr, status, error){
                // 파일 업로드 실패 시 수행할 작업
                console.error('File upload failed: ' + error);
            }
        });
    });
});

```

### 방법3 : AJAX
```jsp
<input type="file" id="fileInput">
<button type="button" id="uploadButton">Upload File</button>

```

```js
/* 
반드시 필요(file이동:formData사용시)
- processData:false,
- contentType: false,
- Uncaught TypeError: Illegal invocation 에러발생
*/

$(document).ready(function(){
    $('#uploadButton').click(function(){
        var fileInput = $('#fileInput')[0].files[0];
        var formData = new FormData();
        formData.append('file', fileInput);

        $.ajax({
            type: 'POST',
            url: '/upload', // 파일을 업로드할 엔드포인트 URL
            data: formData,
            contentType: false, // 필수: 데이터의 형식을 지정하지 않음
            processData: false, // 필수: 데이터 처리를 jQuery에 의해 수행하지 않음
            enctype: 'multipart/form-data', // 필수: multipart/form-data 형식 지정
            success: function(response){
                // 파일 업로드 성공 시 수행할 작업
                console.log('File uploaded successfully');
            },
            error: function(xhr, status, error){
                // 파일 업로드 실패 시 수행할 작업
                console.error('File upload failed: ' + error);
            }
        });
    });
});

```




> ❗<span style='color:green'>***tttttt***</span>  
> 💡 ***<span style='color:red'>ttttttt.</span>***
>   

tttttt  
{: .notice--info}

