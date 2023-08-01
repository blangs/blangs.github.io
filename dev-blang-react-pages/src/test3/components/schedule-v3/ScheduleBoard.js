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
            return todos.concat(action.todo);
        case 'REMOVE':
            return todos.filter(todo => todo.id !== action.todo);
        case 'TOGGEL':
            return todos.map(todo => todo.id === action.id ? {...todo, checked: !todo.checked} : todo );
        default: 
            return todos;

    }
}

const ScheduleBoard = () => {

    const [todos, dispatch] = useReducer(todoReducer, undefined , createBulkTodos);

    const nextId = useRef(todos.length);

   // 객체: 무언가 추가하고 싶을때 (= concat)
    const onInsert = useCallback( (text) => {
        const todo = {
            id: nextId.current += 1
            , text: text
            , checked: false
        };
        dispatch({ type: 'INSERT', todo });
    }, []);

    // 객체: 무언가 제거하고 싶을때 (= filter)
    const onRemove = useCallback( (id) => {
        dispatch({ type: 'REMOVE', id });
    }, []);


    // 객체: 무언가 수정하고 싶을때 (= map & 전개연산자 & 덮어쓰기)
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