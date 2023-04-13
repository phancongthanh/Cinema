import React, { useEffect, useState } from 'react';
import '../table.css';
import icon from '../icons/icon-2d.png'


function Table(props) {
    const  {data, columns}= props
    const [tableWidth, setTableWidth] = useState();

  useEffect(() => {
    const handleResize = () => {
      setTableWidth(window.innerWidth * 0.8);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div className="table-container">
      <table className="my-table" style={{ width: tableWidth, borderRadius:'10px'}}>
        <thead>
            <tr>
            <th rowspan="0"><img src={icon} alt="" /></th>
      <th colspan="3" style={{backgroundColor:'red', color:'white'}}>Loại Ghế</th>
            </tr>
          <tr>
            
            {props.columns.map((column, index) => (
              <th key={index} style={{backgroundColor:'yellow'}}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <th style={{ textAlign: 'left'}}>{row.header}</th>
              {props.columns.map((column, columnIndex) => (
                <td key={`${rowIndex}-${columnIndex}`} >{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
}

export default Table;