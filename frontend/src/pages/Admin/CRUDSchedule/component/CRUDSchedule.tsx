import React from 'react';

import Schedule from '../../../../types/Schedule';
import { Data } from '../../ShowtimesEdit';

function ScheduleItem({data, schedule, handleClick}: {data: Data, schedule: Schedule, handleClick: any}) {
    const film = data.films.find(f => f.filmId === schedule.filmId);
    const room = data.rooms.find(f => f.roomId === schedule.roomId);
    return (
        <tr key={schedule.scheduleId}>
            <td>{film?.title}</td>
            <td>{film?.time} phút</td>
            <td>{room?.name}</td>
            <td>{room?.address}</td>
            <td>{schedule.startTime.toLocaleString("vi-VN")}</td>
        
            <td>
            <span onClick={() => handleClick("edit" ,schedule.scheduleId )} className='btn btn-success'>Sửa</span>
            <span onClick={() => handleClick("detail" , schedule.scheduleId)} className='btn btn-primary'>Chi tiết</span>
            </td>
        </tr>
    )
}

export const CRUDSchedule = ({ data, changeView } : {data: Data, changeView: (view: {tab: "read"|"write"|"detail"|"edit", scheduleId: string})=>void}) => {
    
    const handleClick = (tab: "read"|"write"|"detail"|"edit", scheduleId: string) => {
        console.log(tab);
        console.log(scheduleId);
        changeView({tab, scheduleId});
    }

    return (
        <div className='container'>
        <div className='card'>
            <div className='card-title' style={{margin: '10px'}}>
                <h2>Danh sách phòng</h2>
            </div>
            <div className='card-body'>
                <div>
                    <span style={{margin: '5px 0'}} onClick={() => handleClick("write", "")} className='btn btn-primary'>Tạo xuất chiếu</span>
                </div>
                <table className='table table-bordered'>
                    <thead className='bg-dark text-white'>
                        <tr>
                            <th>Tên phim</th>
                            <th>Thời lượng</th>
                            <th>Tên phòng</th>
                            {/* <th>description</th> */}
                            <th>Vị trí phòng</th>  
                            {/* <th>Xuất xứ</th> */}
                            {/* <th>poster</th> */}
                            {/* <th>Diễn viên</th> */}
                            <th>Thời gian chiếu</th>
                            <th>Hành động</th>  
                        </tr>
                    </thead>
                    <tbody>
                        {data.schedules.map((schedule) => (<ScheduleItem data={data} schedule={schedule} handleClick={handleClick}/>))}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    )
}

export default CRUDSchedule