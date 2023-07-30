import React from 'react';
import TodoListItem from './TodoListItem';

const TodoList = ({ todos, onRemove, onToggle }) => {

    return (
        // 게시글 띄우기1 
        /*
        < div className = "TodoList" >
            <ul>
                {todos.map(todo => 
                    <li key={todo.id}>{todo.text}</li>
                )}
            </ul>
        </div >
        */
        // 게시글 띄우기2 
        <div className="TodoList">
            {todos.map(todo => (
                <TodoListItem
                    todo={todo}
                    key={todo.id}
                    onRemove={onRemove}
                    onToggle={onToggle}
                />
            ))}
        </div>

    );
};

export default TodoList;