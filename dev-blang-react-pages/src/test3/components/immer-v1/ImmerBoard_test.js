import React, { useRef, useCallback, useState } from 'react';
import produce from 'immer';

const ImmerBoard = () => {
    const nextId = useRef(0);
    const [form, setForm] = useState({ name: '', username: '' });
    const [data, setData] = useState({
        array: [],
        uselessValue: null
    });

// 체인지
const onChange = useCallback( (e) => {
  const { name, value } = e.target;
  setForm({...form, [name]: [value]});
},[form]);


// 삽입
const onSubmit = (e) => {
  e.preventDefault();
  
  setData({
    ...data,
    array: data.array.concat({ id: nextId.current += 1, name: form.name, username: form.username })
  });

  setForm({name: '', username: ''});

}

// 삭제
const onRemove = (id) => {
  setData({
    ...data, 
    array: data.array.filter((obj) => (obj.id != id))
  });
}

    
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    name="username"
                    placeholder="아이디"
                    value={form.username}
                    onChange={onChange}
                />
                <input
                    name="name"
                    placeholder="이름"
                    value={form.name}
                    onChange={onChange}
                />
                <button type="submit">등록</button>
            </form>
            <div>
                <ul>
                    {data.array.map(info => (
                        <li key={info.id} onClick={() => onRemove(info.id)}>
                            {info.username} ({info.name})
                        </li>
                    ))}
                </ul>
            </div>
            <hr />
            <div>
                <ul>
                {data.array.map( (dddd) => ( 
                       <li>{dddd.id}</li> 
                )) }
                </ul>
            </div>

        </div>
    );
};

export default ImmerBoard;