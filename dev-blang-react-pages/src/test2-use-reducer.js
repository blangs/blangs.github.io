import { useReducer, useState } from 'react';

function reducer1(state1, action1) {
	//action 별 분기처리
	switch (action1.type) {
		case 'INCREMENT' :
			return { value: state1.value +1 };
		case 'DECREMENT': 
			return { value: state1.value -1 };
		default: 
			//아무것도 해당되지 않을때 기존상태 반환
			return state1;
	}
}

function reducer2(state2, action2) {
	// 객체형태를 리턴한다. 
	return { 
		...state2,
		[action2.name] : action2.value 
	};
}


const getAverage = (numbers) => {
    console.log('평균값 계산중...');
    if ( numbers.length === 0 ) return 0;
    const sum = numbers.reduce( (a, b) => a + b );  //파라미터1: 배열, 파라미터2: 반환값을 다시누산
    return sum / numbers.length;
};




// 리턴함수
const TestUseReducer = () => {
	
	const [state1, dispatch1] = useReducer( reducer1, {value1: 1});
	
	const [state2, dispatch2] = useReducer( reducer2, 
		{ 
		    name: '',  
	        nickname: ''
		}
	);
    
    const { name, nickname } = state2;
 
    const onChange = e => {
    	dispatch2(e.target);
    }
	    
	
    const [list, setList] = useState( [] );
    const [number, setNumber] = useState('');

    const onChangeNum = (e) => {
            setNumber(e.target.value);
    };
        
    const onInsert = (e) => {
        const nextList = list.concat(parseInt(number));
        setList(nextList);
        setNumber('');
    };
  
	return (
	    <div className='main-inner-list'>
			<h4> UseReducer 종류별 테스트</h4>
			<hr />
			<h4> UseReducer 으로 카운터 구현하기</h4>
			<p> 현재 카운터 값은 <b>{state1.value1}</b> 입니다. </p>
			
			<button onClick={ () => dispatch1( { type: 'INCREMENT' } ) }>[ + 1 ]</button>
			<button onClick={ () => dispatch1( { type: 'DECREMENT' } ) }>[ - 1 ]</button>
			
			
			
			<hr />
			<h4> UseReducer 으로 인풋상태 관리하기</h4>
			<div>
				<input name="name" value={name} onChange={onChange} />
				<input name="nickname" value={nickname} onChange={onChange} />
			</div>
			<div>
				<b>이름: </b> {name}
			</div>
			<div>
				<b>닉네임: </b> {nickname}
			</div>
			
			
			
			<hr />
			<h4> UseMemo 으로 연산(평균) 최적화하기</h4>
            <input value={number} onChange={onChangeNum} />
            <button onClick={onInsert}>등록</button>
            <ul>
              {list.map((value, index) => (
                <li key={index}>{value}</li>
              ))}
            </ul>
            <div>
              <b>평균값:</b> {getAverage(list)}
            </div>
			
	    </div>
	);
};

export default TestUseReducer;