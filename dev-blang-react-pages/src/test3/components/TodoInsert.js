import { useState } from "react";


const TodoInsert = ({ onInsert }) => {

  const [text, setText] = useState('');

  const onChange = (e) => {
    setText(e.target.value);
  }

  const onClick = () => {
    onInsert(text);
    setText('');
  }

  return (
    <div>
      <b>insert page </b>
      <input value={text} onChange={onChange} />
      <button onClick={onClick}>버튼</button>

    </div>
  );
};

export default TodoInsert;
