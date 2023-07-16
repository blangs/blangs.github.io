import { useState } from 'react';

const ValidationSample2 = () => {
	
    /********************************************************************************
	- 기본 사용법
	********************************************************************************/
	//v1_일반함수 구현
    const [state, setState] = useState({password: '', clicked: false, validated: false});
	
	
	const handleButtonClick = () => {
		setState({
			clicked: true,
			validated: state.password === '0000'
		});
     }
	
	const handleChange = (e) => {
		setState({
			password: e.target.value
		});
	}
	
	return(
        <div className='main-inner-list'>
		<h4>ref: 연습(함수형)</h4>
		<p>기본</p>
		<input type="password" value={state.password} onChange={handleChange} className={state.clicked ? (state.validated ? 'success' : 'failure') : ' ' }  />
		<button onClick={ handleButtonClick }>검증하기</button>
		
		{/*
		<br>
		<p></p>
		<input type="password" value={state.password} onChange={handleChange} className={state.clicked ? (state.validated ? 'success' : 'failure') : ' ' }  />
		*/}
		</div>
		
	);
}

export default ValidationSample2;