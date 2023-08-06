import React, { useState, useRef, useCallback } from 'react';
/* 
import ScheduleBoard1 from './components/schedule-v1/ScheduleBoard';
import ScheduleBoard2 from './components/schedule-v2/ScheduleBoard';
import ScheduleBoard3 from './components/schedule-v3/ScheduleBoard';
import ScheduleBoard4 from './components/schedule-v4/ScheduleBoard'; 
import ImmerBoard from './components/immer-v1/ImmerBoard_test';
*/
import ImmerBoard from './components/immer-v1/ImmerBoard';


const MainCompo3 = () => {
  return (
    <>

      
      {/* <ScheduleBoard2 /> */}
      {/* <ScheduleBoard3 /> */}
      {/* <ScheduleBoard4 /> */}
      <ImmerBoard />

    </>
  );

}
export default MainCompo3

/*
## 최적화 방식
ScheduleBoard1: 의존성 useCallback 적용.
ScheduleBoard2: 비의존성 useCallback + 함수형업데이투 기법 적용.
ScheduleBoard3: useReducer 적용
ScheduleBoard4: react-virtualized 적용
*/