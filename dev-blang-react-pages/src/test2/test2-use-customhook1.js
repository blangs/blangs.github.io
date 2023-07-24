import React from 'react';
import useInputs from './test2-use-customhook2.js'

const Info = () => {
  const [state, onChange] = useInputs({
    name: '',
    nickname: ''
  });
  const { name, nickname } = state;

  return (
      <div className='main-inner-list'>
      <div>
          <input name="name" value={name} onChange={onChange} />
          <input name="nickname" value={nickname} onChange={onChange} />
      </div>
      <div>
          <div>
              <b>이름:</b> {name}
          </div>
          <div>
              <b>닉네임: </b> {nickname}
          </div>
      </div>
      </div>
  );
};

export default Info;