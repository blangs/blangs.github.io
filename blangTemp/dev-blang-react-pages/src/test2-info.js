import { useState, useEffect } from 'react';

const Info = () => {
	const [value, setValue] = useState(0);
	const [name, setName] = useState('');
	const [nickname, setNickName] = useState('');
	
	const [viewValue, setViewValue] = useState(0);
    /*
    // CSAE1. 항상실행
	useEffect( () => {
		setName('loading SUCCESS...!');
	});
	*/
	/*
	// CSAE2. 마운트될때만 실행
	useEffect( () => {
		setName('loading SUCCESS...!'); 
		setViewValue(viewValue + 1);
		alert("＊마운트 되었습니다.");
	}, []);
	*/
	/*
	// CSAE3. 특정 값이 업데이트될 때만 실행
	useEffect( () => {
		setName('loading SUCCESS...!'); 
		setViewValue(viewValue + 1);
	}, [value]);
	*/
	
	
	// CSAE4. 컴포넌트가 언마운트 되기전   OR  컴포넌트가 업데이트 되기 직전에 수행
	useEffect( () => {
		//setName('loading SUCCESS...!'); 
		alert("＊마운트 되었습니다.");
		return () => {
			//setName('loading SUCCESS...!  (cleanup 모드)'); 
			alert("＊언마운트 되었습니다.");
		}
	}, [value]);
	
	
	const onChangeName = (e) => {
		setName(e.target.value);
	};
	const onChangeNickName = (e) => {
		setNickName(e.target.value);
	};
	
	return(
		<div>
		    <p>현재 카운터 값은 <b>{value}</b> 입니다.</p>
		    <button onClick={() => setValue(value+1)}>+1</button>
		    <button onClick={() => setValue(value-1)}>-1</button>
		
			<div>
			    <input value={name} onChange={onChangeName} />
			    <input value={nickname} onChange={onChangeNickName} />
			</div>
			<div>
			    <b>이름: {name}</b>
			</div>
			<div>
			    <b>닉네임: {nickname}</b>
			</div>
			<div>
			    <b>뷰벨류: {viewValue}</b>
			</div>
			
		</div>
	);
}

export default Info;