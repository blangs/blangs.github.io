import React, { useRef, useState } from 'react';
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
    })

    const onInsert = (text) => {
        const temp = {
            id: nextId.current += 1
            , text: text
            , checked: false

        }
        setTodos(todos.concat(temp));

    }

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