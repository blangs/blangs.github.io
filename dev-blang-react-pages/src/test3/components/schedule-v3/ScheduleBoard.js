import React, { useRef, useState, useCallback, useReducer } from 'react';
import TodoTemplate from './TodoTemplate';
import TodoInsert from './TodoInsert';
import TodoList from './TodoList';

//반복문으로 배열생성
function createBulkTodos() {
    const array = [];
    for(let i=1; i<2500; i++) {
        array.push( { id: i, text: `할 일 ${i}`, checked: false } );
    }

    return array;
}


function todoReducer(todos, action) {
    switch (action.type) {
        case 'INSERT':
            //  { type: 'INSERT', todo: { id: i, text: '입력값', checked: false } }
            return todos.concat(action.todo);
        case 'REMOVE':
            //  { type: 'REMOVE', id: 1 }
            return todos.filter(todo => todo.id !== action.id);
        case 'TOGGEL':
            //  { type: 'REMOVE', id: 1 }
            return todos.map(todo => todo.id === action.id ? {...todo, checked: !todo.checked} : todo );
        default: 
            return todos;

    }
}

const ScheduleBoard = () => {

    const [todos, dispatch] = useReducer(todoReducer, undefined , createBulkTodos);

    const nextId = useRef(todos.length);

    //삽입
    const onInsert = useCallback( (text) => {
        const todo = {
            id: nextId.current += 1
            , text: text
            , checked: false
        };
        dispatch({ type: 'INSERT', todo });
    }, []);

    //삭제
    const onRemove = useCallback( (id) => {
        dispatch({ type: 'REMOVE', id });
    }, []);

    //토글
    const onToggle = useCallback( (id) => {
        dispatch({ type: 'TOGGEL', id });
    }, []);
    
    return (
        <div>
            <h1>ScheduleBoard Page</h1>

            <TodoTemplate>
                <TodoInsert onInsert={onInsert} />
                <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
            </TodoTemplate>
        </div>

    );
};

export default ScheduleBoard;