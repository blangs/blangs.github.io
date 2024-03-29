import { useState, useReducer } from 'react';
import Test2UseState from './test2-use-state.js'
import Test2UseEffect from './test2-use-effect.js'
import Test2UseReducer from './test2-use-reducer.js'
import Test2UseMemo from './test2-use-memo.js'
import Test2UseCallback from './test2-use-callback.js'
import Test2UseRef from './test2-use-ref.js'
import Test2UseCustomhook1 from './test2-use-customhook1.js'

function reducer0(state0, action0) {
    switch (action0.type) {
        case 'TOGGLE_HOOK':
            return {
                ...state0,
                hook: !state0.hook
            };
       case 'TOGGLE_COMPO_STYLE':
            return {
                ...state0,
                hook: state0.compo
            };
		default: 
			return state0; 
    }
}


const MainCompo2 = () => {
	
	//const innerFunction1 = (param) => { alert('あんまりよくないね！。。'); param(); }
	//function innerFunction2(param) { alert('あんまりよくないね！。。'); param(); }
	
	//const number = ['1','2','3','4','5'];
	//const numberList = number.map((obj)=> {return <b>{obj}</b>});
	
	const [ visible, setVisible ] = useState(false);
	
	// #1 온로드
	const [state0, dispatch0] = useReducer( reducer0, { 
		    hook: false,  
	        compo: false}
	);  
  
	// #2 온로드
    const { hook, compo } = state0;
    

    const toggleHook = () =>  dispatch0({ type: 'TOGGLE_HOOK' });
    const toggleCompoStyle = () =>  dispatch0({ type: 'TOGGLE_COMPO_STYLE' });
  
    
	
	return(
	    <div>
		    <b>Hook</b><button onClick={toggleHook}> {hook ? '숨기기' : '보이기'} </button>
		    <hr />
		    {hook && <><h4> UseState 테스트</h4> <Test2UseState /></>}
		    {hook && <><h4> UseEffect 테스트</h4> <Test2UseEffect /></>}
		    {hook && <><h4> UseReducer 테스트</h4> <Test2UseReducer /></>}
		    {hook && <><h4> UseMemo 테스트</h4> <Test2UseMemo /></>}
		    {hook && <><h4> Test2UseCallback 테스트</h4> <Test2UseCallback /></>}
		    {hook && <><h4> Test2UseRef 테스트</h4> <Test2UseRef /></>}
		    {hook && <><h4> Test2UseCustomhook1 테스트</h4> <Test2UseCustomhook1 /></>}
			
			<br/>
		
			<b>ComponentStyle</b><button onClick={toggleCompoStyle}> {hook ? '숨기기' : '보이기'} </button>
			{compo && <><h4> UseEffect 테스트</h4> <Test2UseEffect /></>}
			{compo && <><h4> UseEffect 테스트</h4> <Test2UseEffect /></>}
		</div>
		
	);
}


/*
reducer0 함수는 'TOGGLE_HOOK' 액션이 발생할 때 hook 값을 토글하는 역할을 합니다. dispatch0 함수를 호출하여 액션 객체 { type: 'TOGGLE_HOOK' }를 전달하면 reducer0 함수가 실행되어 상태를 업데이트합니다.
toggleHook 함수는 버튼을 클릭했을 때 dispatch0 함수를 호출하여 'TOGGLE_HOOK' 액션을 전달합니다. 이렇게 하면 hook 값이 토글되어 상태가 업데이트됩니다.
코드에서 toggleHook 함수를 버튼의 onClick 이벤트에 연결하면, 해당 버튼을 클릭할 때마다 hook 값이 토글되어 컴포넌트가 다시 렌더링됩니다. 변경된 hook 값에 따라 컴포넌트가 출력되거나 숨겨지게 됩니다.
*/
export default MainCompo2