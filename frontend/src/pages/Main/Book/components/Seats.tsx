
import EventSeatIcon from '@mui/icons-material/EventSeat';
import { IconButton } from '@mui/material';
import { FC, useState } from 'react';
import Seat from '../../../../types/Seat';



interface Props {
  seatsSelector: Seat[],
  setSeatsSelector: React.Dispatch<React.SetStateAction<Seat[]>>
  tseats: Seat[]
}
  

const Seats : FC<Props> = ({seatsSelector, setSeatsSelector, tseats}) => {

    const [seats, setSeats] = useState<Seat[]>(tseats);
  
    const maxRow = Math.max(...seats.map((seat) => seat.row));
    const maxCol = Math.max(...seats.map((seat) => seat.column));
  
    const arrRow = Array.from({length: maxRow}, (_, i) => i + 1)
    const arrCol = Array.from({length: maxCol}, (_, i) => i + 1)
    
    const handleSelectSeat = (seat : Seat) => {
      setSeatsSelector((prev) => {
        if(prev.filter((s) => s.seatId === seat.seatId).length !== 0) {
          return prev.filter((s) => s.seatId !== seat.seatId)
        }
        else return [...prev, seat]
      })
    }

    const handleRemoveSeat = (seat : Seat) => {
      setSeatsSelector((prev) => {
        return prev.filter((s) => s.seatId !== seat.seatId)
      })
    }


    return (
      <table>
        <tbody>
          {arrRow.map((row) => (
            <>
            <tr key={row} className='w-8'>
              <td>{String.fromCharCode(64 + row)}</td>
              {arrCol.map((col) => {
                const seat = seats.filter((seat) => seat.row === row && seat.column === col)
                if(seat.length === 0) {
                  return (
                    <td key={col} className='text-center'>
                    </td>
                  )
                }
                else
                return(
                  <td key={col} className='text-center max-w-[2rem]'>
                    {
                   !seat[0].isAvailable ?
                      <IconButton disabled><EventSeatIcon className='text-red-800' /></IconButton>
                    : seatsSelector.includes(seat[0]) ?
                      <IconButton onClick={() => handleRemoveSeat(seat[0])}><EventSeatIcon className='text-green-500' /></IconButton>
                    : seat[0].isVip ?
                      <IconButton onClick={() => handleSelectSeat(seat[0])}><EventSeatIcon className='text-yellow-500' /></IconButton>
                    : 
                      <IconButton onClick={() => handleSelectSeat(seat[0])}><EventSeatIcon className='text-gray-500' /></IconButton> 
                   }
                  </td>
                  )
                })}
            </tr>
            {row === maxRow && 
              <tr>
                <td></td>
                {arrCol.map((col) => {
                  return (
                    <td key={col}  className='text-center'>
                      {col}
                    </td>
                  )
                })}
              </tr>
            }
          </>
         ))}
        </tbody>
      </table>
    )
}

export default Seats