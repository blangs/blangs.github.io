import { Component } from 'react';

import TestScrollComponent from './test-class-scroll-component.js'

class ValidationSample1 extends Component {
	state = {
		password: '',
		clicked: false,
		validated: false
	}
	
	handleChange = (e) => {
		this.setState({
			password: e.target.value
		});
	}
	
	handleButtonClick = () => {
		this.setState({
			clicked: true,
			validated: this.state.password === '0000'
		});
		this.input.focus();
	}
	
	
	render() {
		
		return(
		    
		    <div className='main-inner-list'>
		    <h4>ref: 연습(클래스형)</h4>
		    
		    <p>기본</p>
		    <input type="password" value={this.state.password} onChange={this.handleChange} className={this.state.clicked ? (this.state.validated ? 'success' : 'failure') : ' ' }  />
		    <button onClick={ this.handleButtonClick }>검증하기</button>
		
		    <br/>
		    <p>적용ref</p>
		    <input ref={ (ref) => {this.input=ref} } type="password" value={this.state.password} onChange={this.handleChange} className={this.state.clicked ? (this.state.validated ? 'success' : 'failure') : ' ' }  />
		
		    <br/>
		    <p>스크롤ref</p>
		    <button onClick={ () => this.box.scrollToBottom() }>  맨밑으로 </button>    
		    <TestScrollComponent ref={ (ref) => this.box=ref } />
		
		    </div>
		    )
	    }
}

export default ValidationSample1;