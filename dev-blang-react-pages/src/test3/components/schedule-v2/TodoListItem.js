import React from 'react';
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from 'react-icons/md';  //조건부 스타일링을 위해
import cn from 'classnames';
import '../TodoListItem.scss';

const TodoListItem = ({ todo, onRemove, onToggle }) => {
  const { id, text, checked } = todo;

  return (
    <div className="TodoListItem">

      {/* 체크박스 1: check상태, 2: uncheck상태 */}
      <div className={cn('checkbox', { checked })} onClick={() => onToggle(id)}>
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        <b>{checked ? '체크상태입니다.' : '언체크상태입니다.' }</b>
        <div className="text">{text}</div>
      </div>

      <div className="remove" onClick={() => onRemove(id)}>
        <MdRemoveCircleOutline />
      </div>
    </div>
  );
};

export default React.memo(TodoListItem);

/*
설명)
1. 한개의 object 마다  한개의 컴포넌트를 반복적으로 생성한다.
2. 체크박스 온로드시점 UI조작은 classnames API를 사용하여 조작한다.(조건부로 CSS 클래스를 추가)
    - 우선 'checkbox' 이라는 클래스이름으로 CSS 파일에 정의되어있다.
    - 렌더링시 'checked' useState 값에 따라서 클래스명을 적용/미적용 한다.
3. 체크박스 클릭시점 UI조작은 넘겨받은 onToggle() 함수로 조작한다.
4. 삭제 UI 조작은 react-icons/md API 로 만든 버튼으로 onClick 이벤트를 발생시킨다.
*/