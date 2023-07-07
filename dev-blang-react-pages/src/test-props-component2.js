/*************************************************************
- 함수형 프로퍼티스 컴포넌트
*************************************************************/
import PropTypes from 'prop-types';

const propsCompoBasic2 = props => {
	
	const { children } = props;  {/* props 비구조화할당 방법 */}
	
	return (
		    <div>
				<p>파라미터1: {props.param1}</p>
				<p>파라미터2: {props.param2}</p>
				{props.children && <p>기본할당으로 받은 children: {props.children}</p>}
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