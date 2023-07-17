import { useState } from 'react';
import Test2UseEffect from './test2-use-effect.js'
import Test2UseReducer from './test2-use-reducer.js'

const MainCompo2 = () => {
	
	//const innerFunction1 = (param) => { alert('あんまりよくないね！。。'); param(); }
	//function innerFunction2(param) { alert('あんまりよくないね！。。'); param(); }
	
	const [ visible, setVisible ] = useState(false);
	
	const number = ['1','2','3','4','5'];
	const numberList = number.map((obj)=> {return <b>{obj}</b>});
	
	return(
	    <div>
		    <button onClick={() => {setVisible(!visible);} }> {visible ? '숨기기' : '보이기'} </button>
		    <hr />
		    {visible && <Test2UseEffect />}
			{visible && <Test2UseReducer />}
		
		</div>
		
	);
}

export default MainCompo2