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
            return todos.concat(action.todo);
        case 'TOGGEL':
            return todos.concat(action.todo);
        default: 
            return todos.concat(action.todo);

    }
}

const ScheduleBoard = () => {

    const [todos, dispatch] = useReducer(todoReducer, undefined , createBulkTodos);

    const nextId = useRef(todos.length);

    /* (컴포넌트에서 처리하도록 변경. -CTH)
    const list = todos.map((result, index) => {
        return <li id={index}>{result.text}</li>
    });
    */


    /*
      [useCallBack]: 의존성 배열이 변경되지 않는 한 이전에 생성된 함수를 재사용
      만약 useCallback을 사용하지 않았다면, onInsert 함수는 매 렌더링마다 새로 생성되기 때문에, 오버헤드가 발생한다.
    */
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
    //  - 추가) useState 에서 setter 사용시 인자로 todos 함수로 감싸주면 함수의 지속적인 랜더링을 방지할 수 있다.
    const onRemove = useCallback( (id) => {
        const todo = {
            id: nextId.current += 1
            , text: text
            , checked: false
        };
        dispatch({ type: 'INSERT', todo });
        //dispatch(todos => (todos.filter((todo) => todo.id !== id)));
    }, []);


    // 객체: 무언가 수정하고 싶을때 (= map & 전개연산자 & 덮어쓰기)
    //  - 추가) useState 에서 setter 사용시 인자로 todos 함수로 감싸주면 함수의 지속적인 랜더링을 방지할 수 있다.
    const onToggle = useCallback( (id) => {
        const todo = {
            id: nextId.current += 1
            , text: text
            , checked: false
        };
        dispatch({ type: 'INSERT', todo });
        /*
        dispatch(todos => ( 
                            todos.map((todo) => 
                                todo.id === id ? { ...todo, checked: !todo.checked } : todo,
                            )
        ));
        */
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