/*************************************************************
- 함수형 프로퍼티스 컴포넌트
*************************************************************/
import PropTypes from 'prop-types';
import icon from './test-react-icon.png';


const propsCompoBasic1 = props => {
	
	const { children } = props;  {/* props 비구조화할당 방법 */}
	
	return 	<div className='product-list'>
				<ul id='productUl'>
					<li>
						<div className='thumb'>
							<img src={icon} alt='icon1'/>
						</div>
						<div className='product-list-inner'>
							<dl>
							<dt><a href="#">{props.title}</a></dt> 
							<dd>
								<p>코드: {props.description}</p>
								<p>결과: {props.result}</p>
								{props.children && <p>기본할당으로 받은 children: {props.children}</p>}
								{children && <p>비구조화할당으로 받은 children: {children}</p>}
								
								<div className="product-list-type">
									<span>카테고리: {props.category}</span>
									<div className="type-left">
										<div className="detail-rating">
											<ul>
												<li className="list02">
													<span className="blind">LIKE</span> 500</li>
												<li className="list03">
													<span className="blind">VEIW</span> 5000</li>
											</ul>
										</div>
									</div>
								</div>
							</dd>
							</dl>
						</div>
					</li>
				</ul>
			</div>
}

{/* props 디폴트값 지정 */}
propsCompoBasic1.defaultProps = {
  //title: '이름없음',
  description: '내용없음',
	result: '결과없음',
  category: '카테고리없음'
}

{/* props 타입지정(필수,일반) */}
propsCompoBasic1.propTypes = {
	//title: PropTypes.string.isRequired,
	description: PropTypes.string 
};

export default propsCompoBasic1;