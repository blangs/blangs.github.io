import { useState, useEffect } from 'react';

const TestUseEffect = () => {
	const [value, setValue] = useState(0);
	const [name, setName] = useState('');
	
    // CSAE1. 항상실행
    /*
	useEffect( () => {
		setName('loading SUCCESS...!');
	});
	*/
	
	// CSAE2. 마운트될때만 실행
	/*
	useEffect( () => {
		//setName('loading SUCCESS...!'); 
		setViewValue(viewValue + 1);
		//alert("＊마운트 되었습니다.");
	}, []);
	*/
	
	// CSAE3. 특정 값이 업데이트될 때만 실행
	/*
	useEffect( () => {
		setName('loading SUCCESS...!'); 
		setViewValue(viewValue + 1);
	}, [value]);
	*/
	
	// CASE4-1. 컴포넌트가 언마운트 되기전   OR  컴포넌트가 업데이트 되기 직전에 수행
	/*
	useEffect( () => {
		//setName('loading SUCCESS...!'); 
		alert("＊마운트 되었습니다.");
		return () => {
			//setName('loading SUCCESS...!  (cleanup 모드)'); 
			alert("＊언마운트 되었습니다.");
		}
	}, []);  // 참고) 
	*/
	
	// CASE4-2. 오직 언마운트될 때만 뒷정리 함수를 호출하고 싶다면 useeffect 함수의 두 번째 파라미터에 비어 있는 배열을 넣으면 됩니다
    useEffect(() => {
		setValue(value + 1);
        return () => {
			setValue(value - 1);
        }
    }, []);

	
	return(
		<div className='main-inner-list'>
			<p>
			useEffect는 리액트(컴포년트가 렌더링될 때마다 특정 작업을 수행하도록 설정할 수 있는 Hook 입니다. 
			(클래스형 컴포넌트의 componentDidwount와 componentDidupdate를 합친 형태)<br/><br/>
			
				<ul>
					<li>[ CASE1. 마운트될때만 실행 ]. useEffect에서 설정한 함수를 컴포넌트가 화면에 맨 처음 렌더링될 때만 실행하고. 업데이트될때는 실행하지 않으려면 함수의 두 번째 파라미터로 비어 있는 배열을 넣어 주면 됩니다. </li>
					<li>[CASE2. 특정 값이 업데이트될 때만 실행 ]. useEffect를 사용할 때. 특정 값이 변경될 때만 호출하고 싶을 경우 useEffect의 두 번째 파라미터로 전달되는 배열 안에 검사하고 싶은 값을 넣어 주면 됩니다. </li>
					<li>[CASE3. 컴포넌트가 언마운트 되기전   OR  컴포넌트가 업데이트 되기 직전에 수행 ]. useEffect는 기본적으로 렌더링되고 난 직후마다 실행되며. 두 번째 파라미터 배열에 무엇을 넣는지에 따라 실행되는 조건이 달라진다. 
언마운트되기 전이나 업데이트되기 직전에 어떠한 작업을 수행하고 싶다면 useeffect 에서뒷정리(cenup) 함수를 반환해 주어야 합니다 </li>
					
				</ul>
			</p><hr/><br/>
			<div>
			    <b>UseEffect 상태값: {value}</b>
			</div>
			
		</div>
	);
}

export default TestUseEffect;