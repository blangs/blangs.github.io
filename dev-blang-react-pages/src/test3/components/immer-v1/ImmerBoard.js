import React, { useRef, useCallback, useState } from 'react';
import produce from 'immer';

const ImmerBoard = () => {
    const nextId = useRef(1);
    const [form, setForm] = useState({ name: '', username: '' });
    const [data, setData] = useState({
        array: [],
        uselessValue: null
    });



    // input 수정을 위한 함수
    /*
    const onChange = useCallback(
        e => {
            const { name, value } = e.target;
            setForm({
                ...form,
                [name]: [value]
            });
        },
        [form]
    );
    */
    const onChange = useCallback(e => {
      const { name, value } = e.target;
      setForm(
        produce(draft => {
          draft[name] = value;
        })
      );
    }, []);
    




    // form 등록을 위한 함수
    /*
    const onSubmit = useCallback(
        e => {
            e.preventDefault();
            const info = {
                id: nextId.current += 1,
                name: form.name,
                username: form.username
            };
            setData({
                ...data,
                array: data.array.concat(info)
                
                // 이렇게도 가능 !
                // array: data.array.concat({
                //     id: nextId.current += 1,
                //     name: form.name,
                //     username: form.username
                // })
                
            });
            setForm({
                name: '',
                username: ''
            });
        }, [data, form.name, form.username]
    )
    */
    const onSubmit = useCallback(
      e => {
        e.preventDefault();
        const info = {
          id: nextId.current,
          name: form.name,
          username: form.username
        };
  
        // array 에 새 항목 등록
        setData(
          produce(draft => {
            draft.array.push(info);
          })
        );
  
        // form 초기화
        setForm({
          name: '',
          username: ''
        });
        nextId.current += 1;
      },
      [form.name, form.username]
    );




    // 항목을 삭제하는 함수
    /*
    const onRemove = useCallback(
        id => {
            setData({
                ...data,
                array: data.array.filter(info => info.id != id)
            });
        }, [data]
    );
    */
    const onRemove = useCallback(
      id => {
        setData(
          produce(draft => {
            draft.array.splice(draft.array.findIndex(info => info.id === id), 1);
          })
        );
      },
      []
    );

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
        </div>
    );
};

export default ImmerBoard;