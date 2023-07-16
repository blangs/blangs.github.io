import { useState } from 'react';
import TestInfo from './test2-info.js'

const MainCompo2 = () => {
	
	const [ visible, setVisible ] = useState(false);
	
	const number = ['1','2','3','4','5'];
	const numberList = number.map((obj)=> {return <b>{obj}</b>});
	
	
	/************************ names 모음 ************************/
	const innerFunction = (param) => {
		alert('あんまりよくないね！。。')
		param();
	}
	
	function innerFunction2(param) {
		alert('あんまりよくないね！。。')
		param();
	}
	
	
	
	return(
	    <div>
		    <button onClick={() => {setVisible(!visible);} }> {visible ? '숨기기' : '보이기'} </button>
		    <hr />
		    {visible && <TestInfo />}
			
			</div>
		
	);
}

export default MainCompo2