import React, { useEffect, useState } from 'react';
import '../styles/timelineMovie.css'


const ImageWithInfo = ({ data }) => {
    return (
        <>
            {data.map((data, index) => (
                <div>
                    <div className="image-with-info">
                <img src={data.imageUrl} alt='' />
                <div className="info">
                  <h3>{data.title}</h3>
                  <p>
                    <b style={{fontWeight:'400'}}>Thời lượng: {data.Time}</b>
                    <br />
                    <b style={{fontWeight:'400'}}>Xuất Xứ: {data.Origin}</b>
                    <br />
                    <b style={{fontWeight:'400'}}>Khởi Chiếu: {data.Start}</b>
                    <br />
                    <b style={{fontWeight:'400'}}>Khuyến cáo: {data.Notice}</b>
                    </p>
                  <div className='mar-top'>
                    <ul>
                        <li><a href="">12:00</a></li>
                        <li><a href="">13:00</a></li>
                        <li><a href="">14:05</a></li>
                        <li><a href="">16:00</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <br />
              <br />
                </div>
                
            ))}
        </>
    );
  };
  
  export default ImageWithInfo;