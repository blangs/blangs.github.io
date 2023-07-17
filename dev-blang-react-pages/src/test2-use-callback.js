import { useMemo, useCallback, useState } from 'react';

const getAverage = (numbers) => {
    console.log('평균값 계산중...');
    if ( numbers.length === 0 ) return 0;
    const sum = numbers.reduce( (a, b) => a + b );  //파라미터1: 배열, 파라미터2: 반환값을 다시누산
    return sum / numbers.length;
};


// 리턴함수
const TestUseCallback = () => {
        const [list, setList] = useState([]);
        const [number, setNumber] = useState('');

		// onChagne 이벤트
        const onChangeNum = useCallback(e => {
            setNumber(e.target.value);
      
        }, []); // 컴포넌트가 처음 렌더링 될 때만 함수 생성
        

        // onInsert 이벤트
        const onInsert = useCallback(() => {
            const nextList = list.concat(parseInt(number));
            setList(nextList);
            setNumber('');
        }, [number, list]); // number 혹은 list 가 바뀌었을 때만 함수 생성


    const avg = useMemo(() => getAverage(list), [list]);
  
	return (
	    <div className='main-inner-list'>
			
			<h4> TestUseCallback 만들어둔 함수 재사용하기</h4>
			<p>이번에는 함수에 대해서 변경했다. </p>
			<p>==> 컴포넌트가 처음 렌더링 될 때만 함수가 생성하도록 변경했다. </p>
			<p>==> 특정값이 바뀐 경우에만 함수가 실행하도록 변경했다.</p>
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

export default TestUseCallback;