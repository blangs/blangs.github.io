//import logo from './logo.svg';
//import './App.css';

import TestPropsComponent1 from './test-props-component1';
import TestClassComponent from './test-class-component';
import TestFunctionComponent from './test-function-component';
import TestChildrenComponent from './test-children-component';

import TestClassStateComponent from './test-class-state-component';


function App() {
	const name = 'Blang';
	const nameUndfi = undefined;
    
    // 인라인스타일링(카멜표기, 세미클론이아닌 콤마구분, 속성이 '으로 묶임 이전엔없었음)
    const style1 = {
      backgroundColor: 'black',
      color: 'aqua'
    };
    const style2 = {
      width: '55px',
      height: '55px'
    };


	return (
		<>
		
		//  기본구조
        <div id="wrap" className="wrap">
        <header className="header"> <h2 style={{width:'100%'}}>문법테스트 페이지 입니다.</h2> </header>
        <div className="tablist">BBB</div>
        <div className="content">
        <div className="aside">CCC</div>
        <div className="main">DDD</div>
        </div>
        </div>

		<div className='test-div test-black-nav'>
		<h2 style={{width:'100%'}}>문법테스트 페이지 입니다.</h2>
		<div className='test-box1'/>
		<div className='test-box2'/>
		<div className='test-box3'/>
		</div>
		
		<div className='test-div test-list'>
		<h4>JSX문법과 기본기 알아가기</h4>
		<p>2023년05월 작성</p>
		</div>
		<div className='test-div test-list'>
		<h4>JSX문법과 기본기 알아가기2</h4>
		<p>2023년05월 수정</p>
		</div>
		
		<div className='test-div'>
		{/* 기본*/}
		<TestPropsComponent1 title='기본' description="<b>Hello Blang!</b>" result=<b>Hello Blang!</b> category='기본' />
		<TestPropsComponent1 title='표현식' description="<b>{name}</b>" result=<b>{name}</b> category='기본' />
		<TestPropsComponent1 title='삼항연산자(조건부연산자)' description="{name == 'Blang' ? <b>YES Blang</b> : <b>NO Blang</b> }" result={name == 'Blang' ? <b>YES Blang</b> : <b>NO Blang</b> } category='기본' />	
		<TestPropsComponent1 title='AND연산자(false인경우) {name == "blang" ? <b>YES blang</b> : null} 와 동일' description="{name == 'blang' & <b>YES blang (= no Blang)</b>}" result={name == 'blang' && <b>YES blang (= no Blang)</b>} category='기본' />	
		<TestPropsComponent1 title='OR연산자(false인경우)' description="{name == 'blang' || <b>NO Blang</b>} " result={name == 'blang' || <b>NO Blang</b>} category='기본' />	
		
		{/* undefined 규칙 */}
		<TestPropsComponent1 title='undefined 렌더링1(undefined 만 반환하는 상황 만들지 않기)' description="{nameUndfi}" result={nameUndfi} category='undefined 렌더링' />
		<TestPropsComponent1 title='undefined 렌더링2(undefined 방지하기위한 OR 사용)' description="{nameUndfi || '결과없음ㅎ'}" result={nameUndfi || '결과없음ㅎ'} category='undefined 렌더링' />
		<TestPropsComponent1 title='undefined 렌더링3(태그내에서는 렌더링 괜춘함)' description="<b>{nameUndfi}</b>" result=<b>{nameUndfi}</b> category='undefined 렌더링' />
		
		{/* CSS 스타일링 */}
		<TestPropsComponent1 title='인라인 스타일링(필드영역 인라인 선언시카멜표기법 필수)' description="<b style={style1}>{name}</b>" result=<b style={style1}>{name}</b> category='CSS' />
		<TestPropsComponent1 title='CSS파일임포트일스타일링(CSS클래스사용한 스타일링으로 class가 아닌 ClassName 사용)' description="<b className='test'>{name}</b>" result=<b className='test'>{name}</b> category='CSS' />
		
		{/* 태그 */}
		<TestPropsComponent1 title='꼭 닫아야하는 태그' description="<from><br><input></from>" result=<b>해당내용 에러발생하므로 꼭 self-closing 태그 사용해야함.</b> category='태그(TAG)' />
		
		{/* 주석 */}
		<TestPropsComponent1 title='주석1(보이는주석)' description="//주석1입니다." result="//주석1입니다." category='주석' />
		<TestPropsComponent1 title='주석2(보이는주석)' description="/*주석2입니다.*/" result="/*주석2입니다.*/" category='주석' />
		<TestPropsComponent1 title='주석3(안보이는주석)' description="{/*주석3입니다.*/}" result='' category='주석' />
		
		{/* 컴포넌트 기본유형 */}
		<TestPropsComponent1 title='컴포넌트(클래스형)' description="<TestClassComponent />" result=<TestClassComponent /> category='컴포넌트' />
		<TestPropsComponent1 title='컴포넌트(함수형)' description="<TestFunctionComponent />" result=<TestFunctionComponent /> category='컴포넌트' />

		{/* props */}
		<TestPropsComponent1 title='props 기본(부모컴포넌트에서 사용하기)' description="<b>(지금까지 사용한 리스트뷰가 props 이므로 생략)</b>" result=<b>(지금까지 사용한 리스트뷰가 prop 이므로 생략)</b> category='props' />
		
		<TestPropsComponent1 title='props children(컴포넌트 태그사이를 보여줌1)' description="<TestChildrenComponent>태그사이를보여주는children</TestChildrenComponent>" 
		result=<TestChildrenComponent>태그사이를보여주는children</TestChildrenComponent> category='props' />
		
		<TestPropsComponent1 title='props children(컴포넌트 태그사이를 보여줌2)' description="<TestClassComponent />" result=<TestClassComponent /> category='props'>
		태그사이 내용입니다. 
		</TestPropsComponent1>

		<TestPropsComponent1 title='props propTypes(props의 타입을지정)' description="children을 number으로 지정해봄" result=<b>props의 타입이맞지않으면 콘솔창에러</b>category='props'>
		{3}
		</TestPropsComponent1>

		<TestPropsComponent1 description="props propTypes(props의 타입을 필수지정)" result=<b>props의 타입을 지정과 동시에 필수입력하지 않으면 콘솔창에러</b> category='props'/>
		
		<TestPropsComponent1 title="state 기본(클래스형)" description="<TestClassStateComponent /> " result=<TestClassStateComponent /> category='state'/>
		
		
		</div>
		</>
    
    

		/*
			<div className="App">
			  <header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
				  Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
				  className="App-link"
				  href="https://reactjs.org"
				  target="_blank"
				  rel="noopener noreferrer"
				>
				  Learn React 
				  <br/>
				  [BLANG REACT START..!]
				</a>
			  </header>
			</div>
		*/
	);
  
}

export default App;
