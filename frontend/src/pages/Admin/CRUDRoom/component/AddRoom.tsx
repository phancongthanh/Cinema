import { useState } from 'react';

import backend from '../../../../backend';
import Room from '../../../../types/Room';

export const AddRoom = ({ reload, back }: { reload: () => void, back: () => void}) => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [row, setRow] = useState("");
    const [col, setCol] = useState("");

    const handlesubmit = (e: any) => {
        e.preventDefault();
        const room:Room = {
            roomId: "",
            name,
            address,
            seats:[]
        };
        for (let r = 1; r <= Number(row); r++)
        {
            for (let c = 1; c <= Number(col); c++)
            {
                const seat = 
                {
                    seatId: "",
                    roomId: room.roomId,
                    position: "Hàng " + r + " - Cột " + r,
                    row: r,
                    column: c,
                    isAvailable: true,
                    isVip: r >= 3 && r <= Number(row)-2 && c >= 3 && c <= Number(col)-3
                };
                room.seats.push(seat);
            }
        }
        console.log(room);
        backend.rooms.create(room).then(()=>reload()).catch(e => console.log(e.message));
    }

  return (
    <div>
    <div className='row'>
        <div className='offset-lg-3 col-lg-6'>
            <div className='container'>
                <div className='card'>

                    <div className='card-title' style={{margin: '10px'}}>
                        <h2>Thêm Phòng</h2>
                    </div>


                    <div className='card-body'>

                        <div className='row'>

                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='name'>Tên phòng</label>
                                    <input value ={name} onChange={e => setName(e.target.value)} type='text' className='form-control' />

                            </div>

                        </div>
                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='address'>Ví trị phòng</label>
                                    <input value ={address} onChange={e => setAddress(e.target.value)} type='text' className='form-control'  />

                            </div>

                        </div>
                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='row'>Số hàng ghế</label>
                                    <input value ={row} onChange={e => setRow(e.target.value)} type='text' className='form-control'  />

                            </div>

                        </div>
                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='col'>Số cột ghế</label>
                                    <input value ={col} onChange={e => setCol(e.target.value)} type='text' className='form-control'  />

                            </div>

                        </div>
                        <div className='col-lg-12' style={{marginTop: '20px'}}>
                                <div className='form-group'>
                                    
                                    <button onClick={handlesubmit}  className='btn btn-success' type='submit'>Tạo</button>
                                    <button className='btn btn-danger' onClick={back}>Hủy</button>

                            </div>

                        </div>
                        
                    </div>
                </div>

            </div>  
        </div>

    </div>
    </div>
    </div>
  )
}
