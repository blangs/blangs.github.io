/* JS의 기본적인 AJAX 사용으로 GET 요청을 수행한다. */



// STEP1. 함수 정의
function startPromise(containParamURL, callback){
	
    function init(){
    	let url = containParamURL;

        //alert('콜백함수 호출');
        callback(url);  
        
    }
    init();
}


// STEP2-1. 콜백함수 내용 정의(1)
function getData(url) {
  return new Promise((resolve, reject) => {
    
    // XMLHttpRequest 객체 생성
    var xhr = new XMLHttpRequest();
  
    // Promise를 사용하여 비동기적으로 데이터 가져오기
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          try {
            var data = JSON.parse(xhr.responseText);  // JSON 데이터로 변환
            resolve(data);  // P R O M I S E
          } catch (error) {
            reject(error);
          }
        } else {
          // 서버에서 오류가 발생한 경우
          reject(xhr.status);
        }
      }
    }
    
    // XMLHttpRequest를 통해 데이터 요청
    xhr.open('GET', url);
    xhr.send();
  });
}


// STEP2-2. 콜백함수 내용 정의(2)
async function fn_promise(containParamURL) {     // async/await를 사용하여 동기식으로 호출
  try {

        var data = await getData(containParamURL);
        
        let htmlDom = "";
        var 회원번호;
        var 이름;
        var 나이;
        var 주소;
            
        for (var i = 0; i < data.length; i++) {
            회원번호 = data[i].회원번호;
            이름 = data[i].이름;
            나이 = data[i].나이;
            주소 = data[i].주소;
            
            // 방법1
            htmlDom += "<tr>";
            htmlDom += "<td><input type='text' id='id' name='id' value='"+회원번호+"'></td>";
            htmlDom += "<td><input type='text' id='name' name='name' value='"+이름+"'></td>";
            htmlDom += "<td><input type='text' id='age' name='age' value='"+나이+"'></td>";
            htmlDom += "<td><input type='text' id='address' name='address' value='"+주소+"'></td>";
            htmlDom += "<td>";
            htmlDom += "<input type='hidden' name='hideid' id='hideid' value='"+회원번호+"'>";               
            htmlDom += "<input type='button' class='button-gray update-btn' id='update-btn"+회원번호+"' onclick='fn_update("+'this'+")'>";
            htmlDom += "</td>";
            htmlDom += "<td>";
            htmlDom += "<input type='button' class='button-gray delete-btn' id='delete-btn"+회원번호+"' onclick='fn_delete("+'this'+")'>";
            htmlDom += "</td>";
            htmlDom += "</tr>";
            
            const tableBody = document.querySelector('tbody');  //  tbody 태그 선택
            tableBody.innerHTML = htmlDom;
            
        }
  } catch(error) {
      alert(error);
  }
}

// STEP3. 콜백함수 START
//startPromise('/member/searchMbr', fn_promise);