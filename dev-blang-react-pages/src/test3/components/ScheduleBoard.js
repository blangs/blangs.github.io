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

    const list = todos.map((result, index) => {
        return <li id={index}>{result.text}</li>
    });

    /*********************************************************
     * useCallback 훅은 함수를 메모이제이션하여 성능 최적화를 위해 사용 
     * - onInsert 함수는 todos 배열이 변경될 때마다 새로 생성되지 않고 이전에 메모이제이션된 값을 사용합니다.
     * - 하지만 주의할 점은 nextId.current를 추가하는 것이 좋습니다. 
     * - nextId.current가 변경되는 경우에도 onInsert 함수가 새로 생성되어야 하기 때문입니다.
    *********************************************************/
    const onInsert = useCallback( (text) => {
        const temp = {
            id: nextId.current += 1
            , text: text
            , checked: false
        }
        setTodos(todos.concat(temp));
    }, [todos]);

    const onRemove = id => {
        //setTodos(todos.filter(todo => todo.id !== id));
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    const onToggle = id => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, checked: !todo.checked } : todo,
        ),
        );
    }


    return (
        <div>
            <h1>ScheduleBoard Page</h1>
            <TodoInsert onInsert={onInsert} />
            <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
        </div>
    );
};

export default ScheduleBoard;