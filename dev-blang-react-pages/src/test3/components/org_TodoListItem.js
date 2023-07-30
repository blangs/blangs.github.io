import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import cn from 'classnames'; //조건부 스타일링을 위해
import './TodoListItem.scss';

const TodoListItem = ( { todo, onRemove, onToggle } ) => {

  const { id, text, checked } = todo;

  return (
  

    <div className="TodoListItem">
{/*      <div className={cn('checkbox', { checked } ) }>   */}
         <div className={cn('checkbox', { checked })} onClick={() => onToggle(id)}>
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        
        <div className="text">{ text }</div>
      </div>
      <div className="remove" >
        <MdRemoveCircleOutline onClick={() => onRemove(id) } />
      </div>
    </div>
    
   
  );
};

export default TodoListItem;