import { useState, useCallBack } from "react";
import { MdAdd } from 'react-icons/md';

const TodoInsert = ({ onInsert }) => {

  const [value, setValue] = useState('');

  /* 
    [useCallBack]: 매번 랜더링 되지 않고 함수 재사용 모드
  */
  const onChange = useCallBack( (e) => {
    setValue(e.target.value);
  }, []);

  /* 삽입 방법1
  const onClick = useCallBack( () => {
    onInsert(valued);
    setValue('');
  }, []);
  */

  // 삽입 방법2
  const onSubmit = useCallBack( (e) => {
    onInsert(value);
    setValue('');
    
    e.preventDefault(); // submit의 새로고침 동작을 막는다.
  }, [onInsert, value]);

  return (
    <from className="TodoInsert" onSubmit={onSubmit}>
    <div>
      <b>insert page </b>
      <input value={value} onChange={onChange} />
      {/* <button onClick={onClick}>버튼</button> */}

      <button type="submit">
      <MdAdd />
      </button>
    </div>
    </from>
  );
};

export default TodoInsert;
