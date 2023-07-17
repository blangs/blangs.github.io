import React, { useState, useMemo, useRef, useCallback } from 'react';

const getAverage = numbers => {
  console.log('평균값 계산중..');
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

const Average = () => {
	
    // 예제1) ref 엘리먼트지정
    const [list, setList] = useState([]);
    const [number, setNumber] = useState('');
    const inputEl = useRef(null);

    const onChange = useCallback(e => {
    setNumber(e.target.value);
    
    }, []); // 컴포넌트가 처음 렌더링 될 때만 함수 생성
    const onInsert = useCallback(() => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber('');
    inputEl.current.focus();
    
  }, [number, list]); // number 혹은 list 가 바뀌었을 때만 함수 생성

    const avg = useMemo(() => getAverage(list), [list]);

	// 예제2) ref 로컬변수에도 가능하다.
	const RefSample = () => {
		const id = useRef(1);
		const setId = (n) => {
			id.current = n;
		}
		const printId = () => 
			console.log(id.current);
	}

  return (
      <div className='main-inner-list'>
          <input value={number} onChange={onChange} ref={inputEl} />
          <button onClick={onInsert}>등록</button>
          <ul>
              {list.map((value, index) => (
                <li key={index}>{value}</li>
              ))}
          </ul>
          
          <div>
              <b>[ref]평균값:</b> {avg}
          </div>
      
          <div>
          RefSample: { RefSample } 
          </div>
      
     </div>
);
};

export default Average;