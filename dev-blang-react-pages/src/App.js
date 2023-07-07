//import logo from './logo.svg';
//import './App.css';

//import TestPropsComponent1 from './test-props-component1';
//import TestClassComponent from './test-class-component';
//import TestFunctionComponent from './test-function-component';
//import TestChildrenComponent from './test-children-component';
//import TestClassStateComponent from './test-class-state-component';

import TestHeaderComponent from './test-header-component.js';
import TestTabListComponent from './test-tablist-component.js';
import TestAsideComponent from './test-aside-component.js';
import TestMainComponent from './test-main-component.js';

import StudyComponent from './study-component.js'


function App() {

	return (
		<>
		
		{/* 기본구조 */}
        <div id="wrap" className="wrap">
            <header className="header"> <TestHeaderComponent/> </header>
            <div className="tablist"><TestTabListComponent /> </div>
            <div className="content">
                <div className="aside"><TestAsideComponent /></div>
                <div className="main">
                    <StudyComponent />
				    <TestMainComponent />
				
			    </div>
            </div>
        </div>

		{/* 의도하여 초과요소를 재현해봄. 
		<div className='test-div test-list'>
		    <h4>JSX문법과 기본기 알아가기</h4>
		    <p>2023년05월 작성</p>
		</div>
		*/}
		
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
