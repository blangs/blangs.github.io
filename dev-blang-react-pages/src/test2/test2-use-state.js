import { useState } from 'react';

const TestUseState = () => {
	const [value, setValue] = useState(0);
	const [name, setName] = useState('');
	
	const onChangeName = (e) => {
		setName(e.target.value);
	}
	
	return(
		<div className='main-inner-list'>
			<p>
			useEffect는 리액트(컴포년트가 렌더링될 때마다 특정 작업을 수행하도록 설정할 수 있는 Hook 입니다. 
			(클래스형 컴포넌트의 componentDidwount와 componentDidupdate를 합친 형태)<br/><br/>
			</p><hr/><br/>
			
		    <p>현재 카운터 값은 <b>{value}</b> 입니다.</p>
		    <button onClick={() => setValue(value+1)}>+1</button>
		    <button onClick={() => setValue(value-1)}>-1</button>
		
			<div>
			    <input value={name} onChange={onChangeName} />
			</div>
			<div> <b>이름: {name}</b> </div>
		</div>
	);
}

export default TestUseState;