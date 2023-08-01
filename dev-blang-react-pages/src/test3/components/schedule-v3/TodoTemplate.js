import React from 'react';
import '../TodoTemplate.scss';

const TodoTemplate = ({ children }) => {
  return (
    <div className="TodoTemplate">
      <div className="app-title">일정 관리(v3: 리듀서 최적화)</div>
      <div className="content1">{children}</div>
    </div>
  );
};

export default TodoTemplate;