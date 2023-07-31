import React, { useRef, useState, useCallback } from 'react';
import TodoInsert from './TodoInsert';
import TodoList from './TodoList';


const ScheduleBoard = () => {

    const [todos, setTodos] = useState([
        { id: 1, text: '홍길동', checked: true }
        , { id: 2, text: '김민수', checked: true }
        , { id: 3, text: '김민정', checked: false }
    ]);

    const nextId = useRef(todos.length);

    /* (컴포넌트에서 처리하도록 변경. -CTH)
    const list = todos.map((result, index) => {
        return <li id={index}>{result.text}</li>
    });
    */


    /*
      [useCallBack]: 의존성 배열이 변경되지 않는 한 이전에 생성된 함수를 재사용
    */
   // 객체: 무언가 추가하고 싶을때 (= concat)
    const onInsert = useCallback( (text) => {
        const temp = {
            id: nextId.current += 1
            , text: text
            , checked: false
        };
        setTodos(todos.concat(temp));
    }, [todos]);


    // 객체: 무언가 제거하고 싶을때 (= filter)
    const onRemove = useCallback( (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    }, [todos]);


    // 객체: 무언가 수정하고 싶을때 (= map & 전개연산자 & 덮어쓰기)
    const onToggle = useCallback( (id) => {
        setTodos(todos.map((todo) => 
            todo.id === id ? { ...todo, checked: !todo.checked } : todo,
        ));
    }, [todos]);


    return (
        <div>
            <h1>ScheduleBoard Page</h1>

            <div className="TodoTemplate">
            <div className="app-title">일정 관리</div>

            <TodoInsert onInsert={onInsert} />
            <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />

            </div>
            </div>

    );
};

export default ScheduleBoard;