const tablistCompo = () => {
	
    const idx = ['1', '2', '3', '4'];
	const idxCustom = [...idx, '5'];
	
	return(

		<div className='tablist-inner'>
		    {/*
		    <div className='test-box-row'>tablist 컴포넌트 영역1</div>
		    <div className='test-box-row'>tablist 컴포넌트 영역2</div>
		    <div className='test-box-row'>tablist 컴포넌트 영역3</div>
		    <div className='test-box-row'>tablist 컴포넌트 영역4</div>
		    */}
	
		    <div className='test-box-row'>tablist 컴포넌트 영역 {idxCustom} </div>

            {idx.map((titleNum, index) => {
                return (
                    <div className='test-box-row'>tablist 컴포넌트 영역 {titleNum}</div>
                );
            })}
            
        </div>        
        
	)
}

export default tablistCompo;