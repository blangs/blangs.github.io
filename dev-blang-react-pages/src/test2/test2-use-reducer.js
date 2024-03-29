import { useMemo, useReducer, useState } from 'react';

function reducer1(state1, action1) {
	//action 별 분기처리
	switch (action1.type) {
		case 'INCREMENT' :
			return { value1: state1.value1 +1 };
		case 'DECREMENT': 
			return { value1: state1.value1 -1 };
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
	     
	return (
	    <div className='main-inner-list'>
			<p>
			리듀서는 현재 상태. 그리고 업데이트를 위해 필요한 정보를 담은 액션(action) 값을 전달받아 새로운 상태를 반환하는 함수입니다. 리듀서 함수에서 새로운 상태를 만들때는 반드시 불변성을 지켜 주어야 합니다.<br/><br/>
			</p><hr/><br/>
			
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
			
	    </div>
	);
};

export default TestUseReducer;