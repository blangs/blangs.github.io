/* Ajax 사용으로 GET 요청을 수행한다. */



// STEP1. 함수 정의
function startAjax(containParamURL, callback){
	
    function init(){
    	let url = containParamURL;

        //alert('콜백함수 호출');
        callback(url);  
        
    }
    init();
}


// STEP2. 콜백함수 내용 정의
//const fn_jqueryAjax = function() {  // 이렇게 선언도 콜백함수인자로 사용 가능
function fn_Ajax(url) {

// ajax 생성
$.ajax({
	type: 'GET', 
	dataType: 'json', 
	asyc: false, 
	url: '/member/searchMbr', 
	success: function(data) {

        // dataType 속성에 "json"을 지정시 경우 응답 데이터를 자동으로 JSON 객체로 자동 파싱
        //data = JSON.parse(data);  //JSON 데이터로 변환

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

            // DOM 조작 방법2 (JS 기본 DOM 조작법)
            // 생략
                       
	    }
	
        // DOM 조작 방법3 (jQUery DOM 조작법)
        //$('tbody').append(htmlDom);
	
	    /* 참고
            onclick 이벤트 핸들러에 함수를 전달할 때, this를 인자로 전달하는 것은 잘못된 사용입니다. 
            this는 jQuery Ajax 요청을 보낸 객체(여기서는 $.ajax())를 가리키므로, this를 인자로 사용하는 것은 의미가 없습니다. 
            대신에, 해당 버튼 요소의 속성 값을 전달하거나, event.target을 사용하여 해당 버튼 요소를 찾아서 처리해야 합니다.
	    */
	
	}, error: function(xhr, status, error) {
		alert("error" + xhr.status+error);
	}
});

}


// STEP3. 콜백함수 START
//startAjax('/member/searchMbr', fn_Ajax);