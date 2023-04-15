import React, { useEffect, useState } from 'react';
import './grid.css';
import { Link } from 'react-router-dom';


const ImageGrid = ({ images }) => {
  const [tableWidth, setTableWidth] = useState();

  useEffect(() => {
    const handleResize = () => {
      setTableWidth(window.innerWidth * 0.6);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);
    return (
      <div  className="movie" >
        <div className="image-grid"style={{ width: tableWidth }}>
        {images.map((image, index) => (
          <div key={index}>
            <a href="">
              <img src={image.url} alt={`Image ${index}`} style={{ borderRadius: '10px' }} title={image.title} />
            </a>
            <p className="image-title">{image.title}</p>
            <p className='image-time'>{image.Time}</p>
            <p className='image-date'>{image.Date}</p>
            <div>
              <div class="book-box">
                        <Link to={`/book`} class="book-btn">Đặt Vé</Link>
                    </div>
            </div>
          </div>
        ))}
      </div>
      </div>
      
    );
  };
export default ImageGrid;