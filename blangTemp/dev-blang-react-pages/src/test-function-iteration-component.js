import { useState } from 'react';

const IterationSample = () => {
	
	const numbers = ['100', '200', '300', '400', '500', '600'];
	const numberList = numbers.map( (obj) => {
		return obj*obj + ", "
	});

    const names = ['a', 'b', 'c', 'd', 'e', 'f'];
	const nameList1 = names.map( (obj) => {
		return <li>{obj}</li>
	});
	
	
	const nameList2 = names.map( (obj, idx) => {
		return <li key={idx}>{obj}</li>
	});
	
	const [info, setInfo] = useState([
		{ id: 1, text: 'a' }, 
		{ id: 2, text: 'b' }, 
		{ id: 3, text: 'c' }, 
		{ id: 4, text: 'd' }, 
		{ id: 5, text: 'e' }
	]);
	
	const infoList = info.map( (obj) => {
		return <li key={obj.id}>{obj.text}</li>
	});
	
	//새로운 항목을 추가할 때 입력받을 텍스트박스
	const [inputText, setInputText] = useState('');
	
	//새로운 항목을 추가할 때 사용할 id
	const [nextId, setNextId] = useState(5); 
	
	//입력마다 setText 로직
    const onChange = (e) => { setInputText(e.target.value); }
  
    const onClick = () => { 
    	
    	//1.일단 현재 입력정보를 GET
		const nextInfo = info.concat({
			id: nextId,
			text: inputText
		});
		setNextId(nextId+1);   //2. 현재 입력정보 시퀀스에 +1 
		setInfo(nextInfo);       // 3. 입력정보를 갱신
		setInputText('');           // 4. clear 입력값
     };
	
	
	return(
        <div className='main-inner-list'>
	        <h4>map 연습(함수형)</h4>
			
			<p>case1</p>
			<ul>
			{ numberList }
			</ul>
			
			<b><p>case2: 데이터배열을 컴포넌트배열로 변환하기 </p></b>
			<ul>
			{ nameList1 }
			</ul>
			
			<b><p>case3: key 설정한 컴포넌트 배열로 변환하기 (콘솔창에 에러가 이제 안나옴. 고유한값일때만 사용요망하며 idx번호로 키값은 비추천함.)</p></b>
			<ul>
			{ nameList2 }
			</ul>
			
			<b><p>case4: 객체형태로 만들어진 컴포넌트 배열로 변환하기 (useState 사용)</p></b>
			<ul>
			{ infoList }
			</ul>
			
			<b><p>case5: 새로운 이름을 등록할 수 있는 데이터 추가기능 구현한 컴포넌트 배열로 변환하기 (useState 사용)</p></b>
			<p>리액트에서 상태업뎃시 기존상태를 그대로두며 새로운값을 상태로 설정해야함. (불변성 유지) 이거 해놔야 나중에 최적화 가능</p>
			<input value={inputText} onChange={onChange} />
			<button onClick={onClick} >추가</button>
			{ infoList }
			
			
		</div>
	);
}

export default IterationSample;