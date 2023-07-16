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
import TestMainComponent2 from './test-main-component2.js';

import React, {useState, useEffect} from 'react';


function App() {
  const [data, setData] = useState(null);

  /*
  위의 코드에서는 fetch 함수를 사용하여 /api/data 경로로 GET 요청을 보내고, 
  응답을 JSON 형식으로 파싱하여 상태 변수 data에 저장합니다. useEffect 훅을 사용하여 
  컴포넌트가 마운트될 때 한 번만 요청을 보내도록 합니다.
  응답이 성공적으로 받아지면, data 상태 변수를 사용하여 데이터를 렌더링합니다. 
  응답이 아직 도착하지 않은 경우에는 "Loading..." 메시지를 표시합니다.
  위의 코드에서 /api/data 는 백엔드 API의 실제 엔드포인트로 대체되어야 합니다. 
  또한, 응답 형식 및 데이터 구조는 백엔드 API의 설계에 따라 달라질 수 있습니다. 
  따라서 실제 백엔드 API와의 통신을 위해서는 해당 API의 엔드포인트와 
  응답 처리 방식에 맞게 코드를 수정해야 합니다.
  */
  
  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await fetch('/dbd/app/test');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);
	return (
		<>
	
		{/* 기본구조 */}
        <div id="wrap" className="wrap">
			
			{/* 백앤드 데이터 */}
		    {data ? (
		  	  <div>
			    <h1>Data from Backend:</h1>
  			    <p>{data.message}</p>
			  </div>
		    ) : (
  			  <p>Loading...</p>
		    )}
		  
            <header className="header"> <TestHeaderComponent/> </header>
            <div className="tablist"><TestTabListComponent /> </div>
            <div className="content">
                <div className="aside"><TestAsideComponent /></div>
                <div className="main">
                    {/*<TestMainComponent />*/}
                    <TestMainComponent2 />
			
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
