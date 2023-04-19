import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import PaidIcon from '@mui/icons-material/Paid';
import PeopleIcon from '@mui/icons-material/People';
import React from 'react';

import AnalysisBox from './components/AnalysisBox';
import RevenueChart from './components/RevenueChart';
import RoomChart from './components/RoomChart';
import TicketCancelChart from './components/TicketCancelChart';
import TicketChart from './components/TicketChart';



const Analysis = () => {


  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col w-full max-w-[60rem] space-y-12'>
        <div className="flex justify-between flex-1">
          <AnalysisBox label={'Số vé bán được'} icon={<ConfirmationNumberIcon sx={{ fontSize: 80, color: 'coral' }}/>} value={4350000/50000} prevValue={5310000/55000}/>
          <AnalysisBox label={'Số khách'} icon={<PeopleIcon sx={{ fontSize: 80, color: 'blueviolet' }}/>} value={55} prevValue={47}/>
          <AnalysisBox label={'Doanh thu'} icon={<PaidIcon sx={{ fontSize: 80, color: 'orange' }}/>} value={4350000} prevValue={5310000}/>
        </div>

        <RevenueChart/>
        <div className="flex">
          <TicketChart/>
          <div>
            <RoomChart/>
            <TicketCancelChart/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analysis