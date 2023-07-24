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
                                             
                                             inputEl.current.focus();			// REF 사용1
                                             alert(inputEl.current.value);     // REF 사용2
                                             
                                 }, [number, list]); // number 혹은 list 가 바뀌었을 때만 함수 생성

    const avg = useMemo(() => getAverage(list), [list]);



	// 예제2) ref 로컬변수에도 가능하다.
	const [testNum, setTestNum] = useState('');
	
	// Ref 전용 함수 
	const id = useRef(1);
	
	// Setter 함수 
	const setId = (n) => {
		id.current = n;
	}
		
	const onChange2 = useCallback( (e) => {
		setTestNum(e.target.value);
		setId(parseInt(e.target.value));
		
		
	}, [testNum]);
	
	
	
	

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

          </div><br/><br/>
                    
          <div>
              <b>[ref]로컬REF 테스트:</b> {testNum}
          </div>      
          {/* testNum 갱신, Ref로컬변수 갱신 */}
          <input value={testNum} onChange={onChange2} />
          <button onClick={ () => { alert("로컬변수호출(setId): " + id.current ); }  }  > zzzzz </button>
      
     </div>
);
};

export default Average;