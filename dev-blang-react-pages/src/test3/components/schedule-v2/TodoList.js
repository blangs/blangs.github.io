import TodoListItem from './TodoListItem';
import '../TodoList.scss';

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
/*
설명)
1. Todos 배열의 안에 있는 object 를 한개씩 꺼낸다. 
2. 한개의 object 마다  한개의 컴포넌트를 반복적으로 생성한다.

용어 참고) 컴포넌트의 프로퍼티 이란?
TodoListItem 이라는 컴포넌트에서 todo, onRemove, onToggle은 부모로부터 물려받은 프로퍼티라고 한다.

*/