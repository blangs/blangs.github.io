import { Component } from 'react';

class ClssCmpoStat extends Component {
	
	
	/*
	constructor(props) {
		super(props); //반드시 호출해야한다. 현재 클래스형 컴포넌트가 상속받고있는 Component 클래스가 지닌 생성자 함수를 호출해준다.
		
		// state의 초기값 설정하기 (컴포넌트의 state는 객체형식이어야 한다.)
		this.state = {
			number: 0, 
			fixedNumber: 0
		};

	}
	*/
	
	// state를 constructor 에서 꺼내기 (이렇게 생성자없이 state의 초기값을 지정하는방법도 있다.)
	state = {
		number: 0, 
		fixedNumber: 0
	};
	
	// 기본
	render() {
		const { number, fixedNumber } = this.state; //state를 조회할 때는 this.state 로 조회한다.
		
		return (
			<>
				{/* 기본 사용법 (잘못된예시) */}
				{/* 
				에러발생 (이벤트로설정할 함수를 넣을때는 반드시 화살표 함수문법을 사용해야한다.)
				<button onClick={function() { this.setState({number: number+1 }); }  }>
				+1
				</button>
				*/}
				
				{/* 기본 사용법1 (객체전달)*/}
				<button onClick={() => {  this.setState({number: this.state.number+1 });  }}>
				버튼1(객체전달 사용법) 
				</button>
				
				
				{/* 기본 사용법2 (객체전달+콜백추가)*/}
				<button onClick={() => {  this.setState(
											{
												number: number+1 
											} 
											, () => { 
												console.log('방금 setState 가 호출되었습니다.'); 
												console.log(this.state); 
											});
				}}>
				버튼2(객체전달+콜백추가 사용법) 
				</button>
				
	
				{/* 기본 사용법 (setState 에 객체대신 함수인자 전달하는 사용법) */}
				<button onClick={() => { this.setState(prevState => ({ number: prevState.number +1 }));  }}>
				버튼3(함수인자 전달 사용법)
				</button>
				
				
				{/* 기본 사용법 (비동기해결법) 
				    - 비동기의 문제점을 해결한 코드이다. setState 함수의 콜백을 사용하여 상태가 바로 업데이트되어 +2 카운팅된다.
					- 이 코드는 함수형 컴포넌트에서 작동하지 않으며 클래스형컴포넌트에서만 작동한다.
				    - onClick 함수는 2개의 setState 함수를 가지고 있다.
					- 첫번째: 이전상태(prevState)를 가져와서 현재상태의 number 값을 이전 상태의 number 값에 1을 더하여 셋팅한다.
					- 두번째: 이전상태(prevState)를 가져와서 현재상태의 number 값을 이전 상태의 number 값에 1을 더하여 셋팅한다.
					- 세번째: 응용
					
					함수인자 전달하는경우에는 setState( (prevState, props) ) 파라미터를 가진다. 
					- prevState: 기존 상태.
					- props: 현재 지니고 있는 props 를 가리킨다. ( optional 한 인자값이다.)
				*/}
				<button onClick={() => {  this.setState(prevState => {return { number: prevState.number +1 };} ); 
										  this.setState(prevState => ({   number: prevState.number +1        }));
										
				}}>
				버튼4(함수인자 전달사용법[비동기문제해결])
				</button>

				<br/>
				
				<b>넘버: {number}</b>
				<br/>
				<b>넘버(변화X): {fixedNumber}</b>

			</>			
		);
	}
}

export default ClssCmpoStat