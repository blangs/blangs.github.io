import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


import  TestClassComponent from './test-class-component';
import  TestFunctionComponent from './test-function-component';
 
  
const flag = false;
/*************************************************************
- 삼항연산자로 컴포넌트 호출하기
*************************************************************/
// CASE1. 일반 함수선언문
function Test1() { 
	return (
	    <>	        
		    <b>Test1) 삼항연산자로 출력한 익명의 함수선언문</b>
			{/* {flag == true ? <TestClassComponent /> : <TestFunctionComponent />  */} 
			{flag == true ? <TestClassComponent /> : <TestFunctionComponent /> }
		</>
	);
};

// CASE2. 화살표 함수[ES6(ES2015)]
const Test2 = () => { 
	return (
	    <>	        
		    <b>Test2) 람다문법으로 출력한 익명의 함수선언문</b>
			{/* {flag == true ? <TestClassComponent /> : <TestFunctionComponent />  */} 
			{flag == true ? <TestClassComponent /> : <TestFunctionComponent /> }
		</>
	);
};

/*************************************************************
- 훅 사용법
*************************************************************/
const Test3 = function() {
	const [number, setNumber] = useState(2);
	
	function increase() {
		setNumber(number + 1);
	}
	
	return(
		<div>
		<p>devops</p>
		<button onClick={increase}>클릭하세요: {number}</button>
		</div>
	);
}

// 추가 CTH
const Example = () => {
	const [count, setCount] = useState(0);
	
	function handleClick() {
		setCount(count + 1);
	}
	
	return (
	    <div>
	        <b>Test4) 클로저 </b>
	        <button onClick={handleClick}>Click me</button>
	    </div>
	);
}



/*************************************************************
- 렌더링
*************************************************************/
//const root = ReactDOM.createRoot(document.getElementById('root'));
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
   <App />
	
	{/*
	<ul>
		<li><TestClassComponent /></li><br/>
		<li><TestFunctionComponent /></li>
	</ul>
	<Test1 /><br/><br/>
    <Test2 /><br/><br/>    
    <Example />
    
    */}   
	

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
