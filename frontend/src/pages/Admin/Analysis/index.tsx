import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import PaidIcon from '@mui/icons-material/Paid';
import PeopleIcon from '@mui/icons-material/People';
import React, { useEffect, useState } from 'react';

import backend from '../../../backend';
import Statistics from '../../../types/Statistics';
import AnalysisBox from './components/AnalysisBox';
import RevenueChart from './components/RevenueChart';
import RoomChart from './components/RoomChart';
import TicketCancelChart from './components/TicketCancelChart';
import TicketChart from './components/TicketChart';

const Analysis = () => {
  const [statistics, setStatistics] = useState<Statistics|null>(null);

  useEffect(() => {
    backend.statistics.get().then(s => setStatistics(s));
  }, []);

  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col w-full max-w-[60rem] space-y-12'>
        <div className="flex justify-between flex-1">
          <AnalysisBox label={'Số vé bán được'} icon={<ConfirmationNumberIcon sx={{ fontSize: 80, color: 'coral' }}/>} value={statistics?.numberOfTicketsSold.value||0} prevValue={statistics?.numberOfTicketsSold.prevValue||1}/>
          <AnalysisBox label={'Số khách'} icon={<PeopleIcon sx={{ fontSize: 80, color: 'blueviolet' }}/>} value={statistics?.numberOfMembers||0} prevValue={1}/>
          <AnalysisBox label={'Doanh thu'} icon={<PaidIcon sx={{ fontSize: 80, color: 'orange' }}/>} value={statistics?.revenue.value||0} prevValue={statistics?.revenue.prevValue||1}/>
        </div>
        {statistics && statistics.monthlyRevenue.length > 0 && <RevenueChart data={statistics?.monthlyRevenue||[]}/>}
        <div className="flex">
          {statistics && statistics.filmRevenue.length > 0 && <TicketChart data={statistics?.filmRevenue||[]}/>}
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