import { Component } from 'react';

class EventPractice1 extends Component {
	
	state = {
		username: '',
		message: '',
	
	    mix: ''
	}
	
	// 객체안에 key를 [ ] 로 감싸면 그안에 넣은 레퍼런스가 가리키 는 실제 value 가 key값으로 사용된다. 
	handlerChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

    // 선행으로 정의하기
	handlerClick = () => {
		alert(this.state.mix); 
		
		this.setState({
			mix: ''
		})
	}
	
	handlerKeyPress =  (e) => {
		if(e.key === 'Enter') {
			this.handlerClick();
		}
	}
	
	
	render() {
		return (
		    <div className='main-inner-list'>
		        <h4>이벤트 연습(클래스형)</h4>
		
		        {/* 기본 사용법 */}
		       <b>username: </b>
                <input
		            type="text"
		            name="username"
		            placheholder="아무거나 입력해 보세요"
		            value={this.state.username}
		            onChange={
			            (e) => {
				            this.setState({
								username: e.target.value 
							});
				        }
			        }
			    />
		        <b>message: </b>
		        <input
		            type="text"
		            name="message"
		            placheholder="아무거나 입력해 보세요"
		            value={this.state.message}
		            onChange={
			            (e) => {
				            this.setState({
					            //alert(e.target.value);
								message: e.target.value 
							});
				        }
			        }
			    />
			   
			    <button onClick={ () => {
						alert(this.state.username + ' : ' + this.state.message); 
						this.setState({
							username: '',
							message: ''
						});  
				}}>
			    상태 확인
				</button>
			
			    {/*******************************************************************/}
			    {/* 함수를 선행으로 정의하는 방법 */}
			    <b>mix(함수선행으로 정의 후 등록법): </b>
                <input
		            type="text"
		            name="mix"
		            placheholder="아무거나 입력해 보세요"
		            value={this.state.mix}
		            onChange={this.handlerChange}
		            onKeyPress={this.handlerKeyPress}
			    />
			
			    <button onClick={this.handlerClick}>상태 확인</button>
			
			</div>
		);
	}
}

export default EventPractice1;