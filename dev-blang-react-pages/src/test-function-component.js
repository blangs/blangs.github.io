/*************************************************************
- 함수형 컴포넌트
*************************************************************/
// 방법1
/*
function funcCompoBasic1() {
	const name = "함수형 컴포넌트 버튼";
        
	return (
	    <button>{name}</button>
	);
}
*/

// 방법2
const funcCompoBasic1 = ()=> {
	const name = "함수형 컴포넌트 버튼";
        
	return (
	    <button>{name}</button>
	);
}

export default funcCompoBasic1;