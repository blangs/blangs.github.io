import { useMemo, useReducer, useState } from 'react';

const getAverage = (numbers) => {
    console.log('평균값 계산중...');
    if ( numbers.length === 0 ) return 0;
    const sum = numbers.reduce( (a, b) => a + b );  //파라미터1: 배열, 파라미터2: 반환값을 다시누산
    return sum / numbers.length;
};

// 리턴함수
const TestUseMemo = () => {
	
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
  
  //배열의 내용의 대상이 바뀐 경우에만 수행한다.
   const avg = useMemo(() => getAverage(list), [list]);
  
	return (
	    <div className='main-inner-list'>
			
			<p>usememo를 사용하면 함수 컴포년트 내부에서 발생하는 연산을 최적화 할 수 있다.</p><hr />
			
			<h4> UseMemo 으로 연산(평균) 최적화하기 AS-IS</h4>
			<p>등록뿐만이 아니라 박스에 입력할때마다 getAverage 함수가 호출되어 렌더링된다.(비효율적)</p>
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
			
			
			<br/>
			<p>그런데 위 코드는 숫자를 등록할 때뿐만 아니라 인풋 내용이 수정될 때도 우리가 만든 getAverage 함수가 호출 되는 것을 확인할 수 있습니다. 비효율적 입니다.  
			인풋 내용이 바뀔 때는 평균값을 다시 계산할 필요가 없는데. 이렇게 렌더링할 때마다 계산하는 것은 낭비니까요! </p> <hr/><br/>

			
			<h4> UseMemo 으로 연산(평균) 최적화하기 TO-BE</h4>
			<p>
			    useMemo를 요약하면 특정값이 바뀐 경우에만 연산을 실행하도록 변경했다! 입니다. <i>인풋에 입력을할때마다 렌더링되어도 상단의 정의된 함수가 동작하지않고 특정값이 바뀌어야만 호출을 수행하도록 변경했습니다.</i>  <br/>
			    useMemo Hook을 사용하면 이러한 작업을 최적화할 수 있습니다. 렌더링하는 과정에서 특정 값이 바뀌였을 때만 연산을 실행하고. 원하는 값이 바뀌지 않았다면 이전에 연산했던 결과를 다시 사용합니다.
		    </p>
            <input value={number} onChange={onChangeNum} />
            <button onClick={onInsert}>등록</button>
            <ul>
              {list.map((value, index) => (
                <li key={index}>{value}</li>
              ))}
            </ul>
            <div>
              <b>평균값:</b> {avg}
            </div>			
			
	    </div>
	);
};

export default TestUseMemo;