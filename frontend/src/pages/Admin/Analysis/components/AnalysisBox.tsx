import React, { FC, ReactNode } from 'react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

interface Props {
    label: string
    icon: ReactNode
    value: number
    prevValue: number
}

const AnalysisBox : FC<Props> = ({label, icon, value, prevValue}) => {
    const percent = Math.round(((value - prevValue) / prevValue) * 100)

  return (
    <div className="flex border rounded-xl p-4 h-24 w-60 items-center group cursor-default">
        <div className="flex-1 flex-row flex items-center">
            {icon}

        </div>
        <div className="flex flex-col flex-1 items-center">
           <div className={`self-end flex items-center`}>
                {percent >= 0
                ? <ArrowUpwardIcon color='success' sx={{ fontSize: 20 }} className='group-hover:animate-[up_1s_ease-in-out_forwards]'/>
                : <ArrowDownwardIcon color='error' sx={{ fontSize: 20 }} className='group-hover:animate-[down_1s_ease-in-out_forwards]'/>
                }
                <div className={`text-xl  font-bold ${percent >= 0 ? 'text-green-500' : 'text-red-500'}`}>{percent +'%'}</div>
            </div>
            <div className={`text-2xl font-bold`}>{value}</div>
            <div className="text-sm text-gray-500">{label}</div>
         </div>
    </div>
  )
}

export default AnalysisBox