import React from 'react'
import AnalysisBox from './components/AnalysisBox'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import PeopleIcon from '@mui/icons-material/People';
import PaidIcon from '@mui/icons-material/Paid';
import RevenueChart from './components/RevenueChart';
import TicketChart from './components/TicketChart';



const Analysis = () => {
  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col w-full max-w-[60rem] space-y-12'>
        <div className="flex justify-between flex-1">
          <AnalysisBox label={'Số vé bán được'} icon={<ConfirmationNumberIcon sx={{ fontSize: 80, color: 'coral' }}/>} value={1000} prevValue={900}/>
          <AnalysisBox label={'Số khách'} icon={<PeopleIcon sx={{ fontSize: 80, color: 'blueviolet' }}/>} value={1000} prevValue={1100}/>
          <AnalysisBox label={'Doanh thu'} icon={<PaidIcon sx={{ fontSize: 80, color: 'orange' }}/>} value={1100} prevValue={1000}/>
        </div>
        <RevenueChart/>
        <TicketChart/>
      </div>
    </div>
  )
}

export default Analysis