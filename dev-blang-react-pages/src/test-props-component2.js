/*************************************************************
- 함수형 프로퍼티스 컴포넌트
*************************************************************/
import PropTypes from 'prop-types';

{/* props 비구조화할당 방법 1 */}
/*
const propsCompoBasic2 = props => {
	
	const { param1, param2, children } = props;  

	return (
		    <div>
				<p>파라미터1: {props.param1}</p>
				<p>파라미터2: {props.param2}</p>
				{props.children && <p>기본할당으로 받은 children: {props.children}</p>}
				
				{param1 && <p>비구조화할당으로 받은 param1: {param1}</p>}
				{param2 && <p>비구조화할당으로 받은 param2: {param2}</p>}
				{children && <p>비구조화할당으로 받은 children: {children}</p>}
				
			</div>
    );
}
*/


{/* props 비구조화할당 방법 2 */}
const propsCompoBasic2 = ({ param1, param2, children} ) => {
	
	return (
		    <div className='main-inner-list'>
				<p>파라미터1: {param1}</p>
				<p>파라미터2: {param2}</p>
				{children && <p>기본할당으로 받은 children: {children}</p>}
				
				{param1 && <p>비구조화할당으로 받은 param1: {param1}</p>}
				{param2 && <p>비구조화할당으로 받은 param2: {param2}</p>}
				{children && <p>비구조화할당으로 받은 children: {children}</p>}
				
			</div>
    );
}

{/* props 디폴트값 지정 */}
propsCompoBasic2.defaultProps = {
  //title: '이름없음',
  param1: '내용없음',
  param2: '결과없음'
}

{/* props 타입지정(필수,일반) */}
propsCompoBasic2.propTypes = {
	//title: PropTypes.string.isRequired,
	param2: PropTypes.string 
};

export default propsCompoBasic2;