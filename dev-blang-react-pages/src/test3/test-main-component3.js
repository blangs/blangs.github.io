import React, { useState, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

const MainCompo3 = () => {
      const [todos, setTodos] = useState([
      {
          id: 1,
          text: '리액트의 기초 알아보기',
          checked: true,
      },
      {
          id: 2,
          text: '컴포넌트 스타일링해 보기',
          checked: true,
      },
      {
          id: 3,
          text: '일정 관리 앱 만들어 보기',
          checked: false,
      },
    ]);
  
  
  // 고유값으로 사용될 id
  // ref를 사용하여 변수 담기
  const nextId = useRef(4);
  
  const onInsert = useCallback(
      (text) => {
                      	const todo = {
                      	    id: nextId.current,   //4 번째 인덱스
                              text, 
                              checked: false, 
                      	};
                      	setTodos(todos.concat(todo)); // 기존 값에 useState 갱신하기
                      	nextId.current += 1; //ref변수인 nextId 값에 1씩 더하기
      	
                      }, [todos],
  )
  

  const onRemove = useCallback(
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos],
  );
  
  
  const onToggle = useCallback(
    (id) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo,  // 참이면 갱신 아니면 그대로
        ),
      );
    },
    [todos],
  );
  
  
    return (
        <TodoTemplate>Todo App을 만들자!
            <TodoInsert onInsert={onInsert} />
			<TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
        </TodoTemplate>
        
    )
}


export default MainCompo3
