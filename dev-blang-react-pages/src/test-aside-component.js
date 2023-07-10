const asideCompo = () => {
	
	const idx = ['1', '2', '3', '4'];
	
	return(
	
		<div className='aside-inner'>
		    {/*
		    <div className='test-box-col'>aside 컴포넌트 영역 1</div>
		    <div className='test-box-col'>aside 컴포넌트 영역 2</div>
		    <div className='test-box-col'>aside 컴포넌트 영역 3</div>
		    <div className='test-box-col'>aside 컴포넌트 영역 4</div>
		    */}
		
		    {idx.map( (titleNum) => {
			     return(
			    <div className='test-box-col'>aside 컴포넌트 영역 {titleNum}</div>
			     );
			}
			)}
		
        </div>
	);
}

export default asideCompo;