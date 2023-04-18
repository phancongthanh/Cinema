import Room from '../../../../types/Room';

export const ShowDetail = ({room, back}: {room: Room, back: () => void}) => {
    return (
    <div>
    <div className='row'>
        <div className='offset-lg-3 col-lg-6'>
            <div className='container'>
                <div className='card'>

                    <div className='card-title' style={{margin: '10px'}}>
                        <h2>Chi tiết phòng</h2>
                    </div>


                    <div className='card-body'>

                        <div className='row'>

                            <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='title'>Tên phòng</label>
                                    <input value ={room.name}  type='text' className='form-control' readOnly disabled/>

                            </div>

                        </div>
                        <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='category'>Vị trí phòng</label>
                                    <input value ={room.address}  type='text' className='form-control'  readOnly disabled/>

                            </div>

                        </div>
                        <div className='col-lg-12'>
                            <div className='form-group'>
                                <label htmlFor='address'>Số ghế</label>
                                <input value ={room.seats.length} type='text' className='form-control' readOnly disabled/>

                            </div>

                        </div>
                        <div className='col-lg-12' style={{marginTop: '20px'}}>
                                <div className='form-group'>
                                    
                                    <button onClick={back}  className='btn btn-success' type='submit'>Quay lại</button>
                                    
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


export default ShowDetail