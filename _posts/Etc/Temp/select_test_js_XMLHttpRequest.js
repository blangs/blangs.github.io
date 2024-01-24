/* XMLHttpRequest 사용으로 GET 요청을 수행한다. */



// STEP1. 함수 정의
function start_XMLHttpRequest(containParamURL, callback){
	
    function init(){
    	let url = containParamURL;

        //alert('콜백함수 호출');
        callback(url);  
        
    }
    init();
}


// STEP2. 콜백함수 내용 정의
//const fn_XMLHttpRequest = function() {  // 이렇게 선언도 콜백함수인자로 사용 가능
function fn_XMLHttpRequest(url) {

// XMLHttpRequest 객체 생성
var xhr = new XMLHttpRequest();

// 비동기적으로 데이터 가져오기
xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
    	
        // DB결과형태(단순스트링): [ { "회원번호": 1, "이름": "홍길동", "나이": 8, "주소": "서울특별시 100" }, { "회원번호": 2, "이름": "김갑바", "나이": 31, "주소": "서울특별시 마포구 20" }]
        var data = xhr.responseText;
        data = JSON.parse(data);  //JSON 데이터로 변환

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
            //alert("회원번호: " + 회원번호 + ", 이름: " + 이름 + ", 나이: " + 나이 + ", 주소: " + 주소);
        
        
            // DOM 조작 방법1 (String innerHTML)            
            /*
            htmlDom += "<tr>";
            htmlDom += "<td><input type='text' id='name' name='name' value='"+회원번호+"'></td>";
            htmlDom += "<td><input type='text' id='name' name='name' value='"+이름+"'></td>";
            htmlDom += "<td><input type='text' id='age' name='age' value='"+나이+"'></td>";
            htmlDom += "<td><input type='text' id='address' name='address' value='"+주소+"'></td>";
            htmlDom += "<td>";
            htmlDom += "<input type='hidden' name='id' id='"+회원번호+"'value='"+회원번호+"'>";               
            htmlDom += "<input type='button' class='button-gray update-btn' id='update-btn"+회원번호+"' onclick='fn_update("+'this'+")'>";
            htmlDom += "</td>";
            htmlDom += "<td>";
            htmlDom += "<input type='button' class='button-gray delete-btn' id='delete-btn"+회원번호+"' onclick='fn_delete("+'this'+")'>";
            htmlDom += "</td>";
            htmlDom += "</tr>";
            
            const tableBody = document.querySelector('tbody');  //  tbody 태그 선택
            tableBody.innerHTML = htmlDom;
            */
            
            
            // DOM 조작 방법2 (JS 기본 DOM 조작법)
            var tbody = document.querySelector('tbody');
            var tr = document.createElement('tr');
           
            //td1
            var td1 = document.createElement('td');
            var input1 = document.createElement('input');
            input1.type = 'text';
            input1.setAttribute('id', 'id');
            input1.setAttribute('name', 'id'); 
            input1.value = 회원번호;
            input1.readOnly = true;

            td1.appendChild(input1);
            tr.appendChild(td1);     
            
            //td2
            var td2 = document.createElement('td');
            var input2 = document.createElement('input');
            input2.setAttribute('type', 'text');
            input2.setAttribute('id', 'name');
            input2.setAttribute('name', 'name');
            input2.setAttribute('value', 이름);
    
            td2.appendChild(input2);
            tr.appendChild(td2);
            
            //td3
            var td3 = document.createElement('td');
            var input3 = document.createElement('input');
            input3.setAttribute('type', 'text');
            input3.setAttribute('id', 'age');
            input3.setAttribute('name', 'age');
            input3.setAttribute('value', 나이);
            
            td3.appendChild(input3);
            tr.appendChild(td3);
    
            //td4          
            var td4 = document.createElement('td');
            var input4 = document.createElement('input');
            input4.setAttribute('type', 'text');
            input4.setAttribute('id', 'address');
            input4.setAttribute('name', 'address');
            input4.setAttribute('value', 주소);
            
            td4.appendChild(input4);
            tr.appendChild(td4);

            //td5
            var td5 = document.createElement('td');
            var input5 = document.createElement('input');
            input5.setAttribute('type', 'hidden');
            input5.setAttribute('id', 'hideid');
            input5.setAttribute('name', 'hideid');
            input5.setAttribute('value', 회원번호);

            var button1 = document.createElement('button');
            button1.textContent = '수정';
            button1.setAttribute('id', 'update-btn'+회원번호);
            button1.classList.add('button-gray', 'update-btn');
            button1.onclick = function() {
                var obj = this;
                fn_update(obj);
            };

            button1.style.padding = '10px';
            td5.appendChild(button1);
            
            tr.append(td5);
         
            //td6
            var td6 = document.createElement('td');
            var button2 = document.createElement('button');
            button2.textContent = '삭제';
            button2.setAttribute('id', 'delete-btn'+회원번호);
            button2.classList.add('button-gray', 'delete-btn');
            button2.onclick = function() {
                var obj = this;
                fn_delete(obj);
            };
            button2.style.padding = '10px';
            
            td6.appendChild(button2);
            tr.append(td6);

            tbody.append(tr);

            
            
            // DOM 조작 방법3 (jQUery DOM 조작법)
            /*
            var tbody = $('tbody');
			var tr = $('<tr>');
			
			// td1
			var td1 = $('<td>');
			var input1 = $('<input>', {
			    'type': 'text',
			    'id': 'id',
			    'name': 'id',
			    'value': 회원번호,
			    'readOnly': true
			});
			td1.append(input1);
			tr.append(td1);
			
			// td2
			var td2 = $('<td>');
			var input2 = $('<input>', {
			    'type': 'text',
			    'id': 'name',
			    'name': 'name',
			    'value': 이름
			});
			td2.append(input2);
			tr.append(td2);
			
			// td3
			var td3 = $('<td>');
			var input3 = $('<input>', {
			    'type': 'text',
			    'id': 'age',
			    'name': 'age',
			    'value': 나이
			});
			td3.append(input3);
			tr.append(td3);
			
			// td4
			var td4 = $('<td>');
			var input4 = $('<input>', {
			    'type': 'text',
			    'id': 'address',
			    'name': 'address',
			    'value': 주소
			});
			td4.append(input4);
			tr.append(td4);
			
			// td5
			var td5 = $('<td>');
			var input5 = $('<input>', {
			    'type': 'hidden',
			    'id': 'hideid,
			    'name': 'hideid',
			    'value': 회원번호
			});
			var button1 = $('<button>', {
			    'text': '수정',
			    'id': 'update-btn' + 회원번호,
			    'class': 'button-gray update-btn',
			    'click': function() {
			        var obj = $(this);
			        fn_update(obj);  //<button onclick="javascript:fn_update(obj);"> 이 코드와 동일하다.
			    },
			    'css': {
			        'padding': '10px'
			    }
			});
			td5.append(input5);
			td5.append(button1);
			tr.append(td5);
			
			// td6
			var td6 = $('<td>');
			var button2 = $('<button>', {
			    'text': '삭제',
			    'id': 'delete-btn' + 회원번호,
			    'class': 'button-gray delete-btn',
			    'click': function() {
			        var obj = $(this);
			        fn_delete(obj);
			    },
			    'css': {
			        'padding': '10px'
			    }
			});
			td6.append(button2);
			tr.append(td6);
			
			tbody.append(tr);
			*/
            
            
       } // END FOR
       
    } else {
      // 서버에서 오류가 발생한 경우
      alert('Error:', xhr.status);
    }
  }
};

// GET 방식으로 데이터 요청
//xhr.open('GET', '/member/searchMbr');  // 예시) /member/searchMbr
xhr.open('GET', url);

// 요청 보내기
xhr.send();

}


// STEP3. 콜백함수 START
//start_XMLHttpRequest('/member/searchMbr', fn_XMLHttpRequest);