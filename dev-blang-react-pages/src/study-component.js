import { useState } from 'react';

const Aa = () => {
	const [name, setName] = useState('');
	const onClickEnter = () => { setName('홍길동') };
	
	return (
	    <>

		<button>
		클릭
		</button>
		<b>테스트</b>
		</>
	);
}

export default Aa;