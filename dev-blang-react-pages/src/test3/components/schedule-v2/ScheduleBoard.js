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

    /* 공통내용 
      [useCallBack]: 의존성 배열이 변경되지 않는 한 이전에 생성된 함수를 재사용
      만약 useCallback을 사용하지 않았다면, onInsert 함수는 매 렌더링마다 새로 생성되기 때문에, 오버헤드가 발생한다.
    */

    // 갱신 되지지않지만 접근 방법을 자식컴포넌트에서 미리 useMemo 해놨다. 그래서 오버헤드는 없다.
    const onInsert = useCallback( (text) => {
        const temp = {
            id: nextId.current += 1
            , text: text
            , checked: false
        };
        setTodos(todos.concat(temp));
    }, []);

    // 함수형업데이트 기법으로 함수의 지속적인 랜더링을 방지할 수 있다.
    const onRemove = useCallback( (id) => {
        setTodos(todos => (todos.filter((todo) => todo.id !== id)));
    }, []);

    // 함수형업데이트 기법으로 함수의 지속적인 랜더링을 방지할 수 있다.
    const onToggle = useCallback( (id) => {
        setTodos(todos => ( 
                            todos.map((todo) => 
                                todo.id === id ? { ...todo, checked: !todo.checked } : todo,
                            )
        ));
            
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