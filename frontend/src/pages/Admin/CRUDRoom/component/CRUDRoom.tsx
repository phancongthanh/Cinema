import React from 'react';

import Room from '../../../../types/Room';

export const CRUDRoom = ({ rooms, changeView } : {rooms: Room[], changeView: (view: {tab: "read"|"write"|"detail"|"edit", roomId: string})=>void}) => {
    
    const handleClick = (tab: "read"|"write"|"detail"|"edit", roomId: string) => {
        console.log(tab);
        console.log(roomId);
        changeView({tab, roomId});
    }

    return (
        <div className='container'>
        <div className='card'>
            <div className='card-title' style={{margin: '10px'}}>
                <h2>Danh sách phòng</h2>
            </div>
            <div className='card-body'>
                <div>
                    <span style={{margin: '5px 0'}} onClick={() => handleClick("write", "")} className='btn btn-primary'>Thêm phòng</span>
                </div>
                <table className='table table-bordered'>
                    <thead className='bg-dark text-white'>
                        <tr>
                            <th>Tên phòng</th>
                            <th>Vị trí</th>
                            {/* <th>description</th> */}
                            <th>Số ghế</th>  
                            {/* <th>Xuất xứ</th> */}
                            {/* <th>poster</th> */}
                            {/* <th>Diễn viên</th> */}
                            <th>Hành động</th>  
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map((room) => (
                            <tr key={room.roomId}>
                                <td>{room.name}</td>
                                <td>{room.address}</td>
            
                                <td>{room.seats.length}</td>
                            
                                <td>
                                <span onClick={() => handleClick("edit" ,room.roomId )} className='btn btn-success'>Sửa</span>
                                <span onClick={() => handleClick("detail" , room.roomId)} className='btn btn-primary'>Chi tiết</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    )
}

export default CRUDRoom