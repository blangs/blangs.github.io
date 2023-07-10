import { useState } from 'react';

const EventPractice2 = () => {
	const [username, setUsername] = useState('');
	const [message, setMessage] = useState('');
	
	//1
	const onChangeUsername = e => setUsername(e.target.value);
	
	//2
    const onChangeMessage = e => setMessage(e.target.value);
    
	//3
	const onClick = () => {
		alert(username + ' : ' + message);
		setUsername('');
		setMessage('');
	};
	
	//4
	const handlerKeyPress =  (e) => {
		if(e.key === 'Enter') {
			onClick();
		}
	}
	
	
	return(
        <div className='main-inner-list'>
	        <h4>이벤트 연습(함수형)</h4>
	
		        {/* 기본 사용법 */}
		       <b>username: </b>
                <input
		            type="text"
		            name="username"
		            placheholder="아무거나 입력해 보세요"
		            value={username}
		            onChange={onChangeUsername}
		            onKeyPress={handlerKeyPress}        
			    />
		
		       <b>message: </b>
                <input
		            type="text"
		            name="message"
		            placheholder="아무거나 입력해 보세요"
		            value={message}
		            onChange={onChangeMessage}
		            onKeyPress={handlerKeyPress}        
			    />
		       <button onClick={onClick}>상태 확인</button>
	    </div>
	
	);
}

export default EventPractice2;