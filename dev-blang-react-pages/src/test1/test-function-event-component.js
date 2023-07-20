import { useState } from 'react';

const EventPractice2 = () => {
	const [username, setUsername] = useState('');
	const [message, setMessage] = useState('');
	
	/********************************************************************************
	- 기본 사용법
	********************************************************************************/
	//v1_일반함수 구현
	function onChangeUsername_v1(e) { setUsername(e.target.value) }
	function onChangeMessage_v1(e) { setMessage(e.target.value) }
	function onClick_v1() { alert(username + ' : ' + message);    setUsername('');   setMessage('');   }; 
	function handlerKeyPress_v1(e) { 
        if(e.key === 'Enter') {
        	onClick_v1();
        }  
    }
	
	//v2_화살표함수 구현
	const onChangeUsername_v2 = (e) => setUsername(e.target.value);
    const onChangeMessage_v2 = (e) => setMessage(e.target.value);
    const onClick_v2 = () => {  alert(username + ' : ' + message);    setUsername('');   setMessage('');   };   
    const handlerKeyPress_v2 =  (e) => {
	    if(e.key === 'Enter') {
			onClick_v2();
	    }
	}   
	
	/********************************************************************************
	- 인풋 여러개 다루기
	********************************************************************************/
	
	//v3_일반함수 구현
	const [form1, setForm1] = useState({ username_v3: '', message_v3: '' });
	const { username_v3, message_v3 } = form1;
	
	function onChange_v3(e) {
		const nextform1 = {
			...form1,              //기존의 from 내용을 이곳에 복사한뒤 ex) username_v3: '', message_v3: ''
			[e.target.name]: e.target.value    //덮어쓰기!!!
		}
		setForm1(nextform1);
	}
	
	function onClick_v3() {
		alert(username_v3 + ' : ' + message_v3);  
        setForm1({ username_v3: '', message_v3: '' });
	}
	
	function handlerKeyPress_v3(e) {
		if(e.key == 'Enter') {
			onClick_v3();
		}
	}

	//v4_화살표함수 구현
	const [form2, setForm2] = useState({ username_v4: '', message_v4: '' });
	const { username_v4, message_v4 } = form2;
	
	// 이렇게 하면 username, message 무엇이든 동적으로 set 가능해진다.
	const onChange_v4 = (e) => {
		const nextform2 = {
			...form2,              //기존의 from 내용을 이곳에 복사한뒤 ex) username_v3: '', message_v3: ''
			[e.target.name]: e.target.value    //덮어쓰기!!!
		}
		setForm2(nextform2);  // Hook 으로 SET
	};
	
    const onClick_v4 = () => {  alert(username_v4 + ' : ' + message_v4);  setForm2({ username_v4: '', message_v4: '' }); };   
    const handlerKeyPress_v4 =  (e) => {
	    if(e.key === 'Enter') {
		   
			onClick_v4();
	    }
	}
	
	return(
        <div className='main-inner-list'>
	        <h4>이벤트 연습(함수형)</h4>
			<p>기본 사용법</p>
	            {/* 기본 사용법(일반함수) */}
		        <b>[v1]username: </b>    <input type="text" name="username" value={username} onChange={onChangeUsername_v1} onKeyPress={handlerKeyPress_v1} />
		        <b>[v1]message: </b>     <input type="text" name="message" value={message} onChange={onChangeMessage_v1} onKeyPress={handlerKeyPress_v1} />
		        <button onClick={onClick_v1}>[v1]상태 확인</button>
	            <br/>
		        {/* 기본 사용법(화살표함수) */}
		        <b>[v2]username: </b>    <input type="text" name="username" value={username} onChange={onChangeUsername_v2} onKeyPress={handlerKeyPress_v2} />
		        <b>[v2]message: </b>     <input type="text" name="message" value={message} onChange={onChangeMessage_v2} onKeyPress={handlerKeyPress_v2} />
		        <button onClick={onClick_v2}>[v2]상태 확인</button>
				<br/>
				<br/>
			<p>인풋 여러개 다루기</p>
				{/* 인풋 여러개 다루기(일반함수) */}
                <b>[v3]username: </b>    <input type="text" name="username_v3" value={username_v3} onChange={onChange_v3} onKeyPress={handlerKeyPress_v3} />
		        <b>[v3]message: </b>     <input type="text" name="message_v3" value={message_v3} onChange={onChange_v3} onKeyPress={handlerKeyPress_v3} />
			    <button onClick={onClick_v3}>[v3]상태 확인</button>
			    <br/>
                {/* 인풋 여러개 다루기(화살표함수) */}
                <b>[v4]username: </b>    <input type="text" name="username_v4" value={username_v4} onChange={onChange_v4} onKeyPress={handlerKeyPress_v4} />
		        <b>[v4]message: </b>     <input type="text" name="message_v4" value={message_v4} onChange={onChange_v4} onKeyPress={handlerKeyPress_v4} />
			    <button onClick={onClick_v4}>[v4]상태 확인</button>
			    
		
	    </div>

	
	);
}

export default EventPractice2;