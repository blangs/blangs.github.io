import { useState } from 'react';
import TestInfo from './test2-info.js'

const mainCompo2 = () => {
	
	const [ visible, setVisible ] = useState(false);
	
	return(
	    <div>
		    <button onClick={() => {setVisible(!visible);} }> {visible ? '숨기기' : '보이기'} </button>
		    <hr />
		    {visible && <TestInfo />}
	    </div>
		
	);
}

export default mainCompo2