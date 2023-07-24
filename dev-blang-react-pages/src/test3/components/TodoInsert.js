import React, { useState, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
import './TodoInsert.scss';


const TodoInsert = ( { onInsert } ) => {

  const [value, setValue] = useState('');

  // 텍스트박스안에 입력한것을 useState 안에 저장하는 역할 (매번 랜더링되지 않고 함수 재사용)
  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  
  
  // 버튼을 누르면 부모에게 전달받은 insert 로직을 수행하는 역할
  const onSubmit = useCallback(
      (e) => {
      	onInsert(value);
          setValue(' '); //value값 초기화
          
          // submit 이벤트는 브라우저 새로고침발생시킨다~
          // 이를 방지하는 기능은 아래 함수를 호출한다.
          e.preventDefault(); 
      }, 
      [onInsert, value], 
  );
  
  
  
	return (
	    <form className="TodoInsert" onSubmit={onSubmit}>
            <input placeholder="할 일을 입력하세요" 
						value={value}
						onChange={onChange}
			/>
            <button type="submit">
				<MdAdd />
			</button>
        </form>
	);
};

export default TodoInsert;