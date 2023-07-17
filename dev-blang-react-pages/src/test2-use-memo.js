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
			
			<hr />
			<h4> UseMemo 으로 연산(평균) 최적화하기 TO-BE</h4>
			<p>특정값이 바뀐 경우에만 연산을 실행하도록 변경했다.</p>
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