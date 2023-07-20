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
			
			<p>
			usecallback은 uselemo와 상당히 비숫한 함수입니다. 주로 렌더링 성능을 최적화해야 하는 상황에서 사용하는데요. 이 Hook을 사용하면 만들어 났던 함수를 재사용할 수 있습니다. ( 요약: 함수를 재사용해버린다.)
			방금 구현한 Average 컴포넌트를 보세요. onChange와 onInsert라는 함수를 선언해 주었지요? 이렇게 선언하면 컴포넌트가 리렌더링될 때마다 새로 만들어진 함수를 사용하게 됩니다. 
			대부분의경우 이러한 방식은 문제없지만. 컴포넌트의 렌더링이 자주 발생하거나 렌더링해야 할 컴포넌트의 개수가 많아지면 이 부분을 최적화해 주는 것이 좋습니다.
			<ul>
					<li>[ 변경1. ] 컴포넌트가 처음 렌더링 될 때만 함수가 생성하도록 변경했다.</li>
					<li>[ 변경2. ] 특정값이 바뀐 경우에만 함수가 실행하도록 변경했다.</li>
			</ul>
			
			</p><hr/><br/>
		
			<h4> TestUseCallback 만들어둔 함수 재사용하기</h4>
			
			
			
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