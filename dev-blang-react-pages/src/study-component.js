import { useState } from 'react';

{/* 반드시 대문자로 컴포넌트를 생성해야한다. */}
const Aa = () => {
	
	{/* String Type Hook */}
	{/* 상태를 정의하고 배열을 반환한다. 첫 번째 요소는 현재 상태값이고, 두 번째 요소는 상태를 갱신하는 함수. */}
	const [name, setName] = useState('');
	const NameMaker = () => { setName('홍길동') };
	
	{/* Int Type Hook */}
	{/* 상태를 정의하고 배열을 반환한다. 첫 번째 요소는 현재 상태값이고, 두 번째 요소는 상태를 갱신하는 함수. */}
	const [count, setCount] = useState(0);
	const CountMaker = () => {setCount(count + 1)};
	
	return (
	    <div className='main-inner-list'>
		<b>[테스트]</b><p>이름: {name} / 숫자: {count}</p>
		<span><button onClick={NameMaker}>이름 생성</button><button onClick={CountMaker}>숫자 생성</button></span>
		
		
		</div>
		
	);
}

export default Aa;
