import React, { useRef, useState, useCallback } from 'react';
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

const ScheduleBoard = () => {

    const [todos, setTodos] = useState(createBulkTodos);

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

            <TodoTemplate>
                <TodoInsert onInsert={onInsert} />
                <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
            </TodoTemplate>
        </div>

    );
};

export default ScheduleBoard;