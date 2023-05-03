import { Component } from 'react';

/*************************************************************
- 클래스형 컴포넌트
*************************************************************/
class ClssCmpoBasic extends Component {
	
	/* 클래스형 컴포넌트는 render 함수가 필수이며 그안에 JSX를 반환해야한다.*/
	render() {
        const name = "클래스 컴포넌트 버튼";
        return <button>{name}</button>;
	}
  
}

export default ClssCmpoBasic;