
import EventSeatIcon from '@mui/icons-material/EventSeat';
import { IconButton } from '@mui/material';
import { FC, useState } from 'react';
import Seat from '../../../../types/Seat';
import Ticket, { TicketStatus } from '../../../../types/Ticket';



interface Props {
  ticketsSelector: Ticket[] | null
  setTicketsSelector: React.Dispatch<React.SetStateAction<Ticket[] | null>>
  tseats: Seat[]
  ticketss: Ticket[] | null
}
  

const Seats : FC<Props> = ({ticketsSelector, setTicketsSelector, tseats, ticketss}) => {

    const [seats, setSeats] = useState<Seat[]>(tseats);
  
    const maxRow = Math.max(...seats.map((seat) => seat.row));
    const maxCol = Math.max(...seats.map((seat) => seat.column));
  
    const arrRow = Array.from({length: maxRow}, (_, i) => i + 1)
    const arrCol = Array.from({length: maxCol}, (_, i) => i + 1)
    
    const handleSelectSeat = (seat : Seat) => {
      if(ticketss)  {
        const ticket = ticketss.find((ticket) => ticket.seatId === seat.seatId)
        if(ticket) {
          setTicketsSelector((prev) =>
            prev ? [...prev, ticket] : [ticket]
          )
        }
      }
    }

    const handleRemoveSeat = (seat : Seat) => {
      setTicketsSelector((prev) => {
        if(prev) {
          return prev.filter((ticket) => ticket.seatId !== seat.seatId)
        }
        return null
      })
    }

    const ticketIsAvailable = (seat : Seat) => {
      if(ticketss) {
        const ticket = ticketss.find((ticket) => ticket.seatId === seat.seatId)
        if(ticket) {
          return ticket.status !== TicketStatus.Available
        }
      }
      return false
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
                    ticketIsAvailable(seat[0]) ?
                      <IconButton disabled><EventSeatIcon className='text-red-800' /></IconButton>
                    : ticketsSelector && ticketsSelector.find((ticket) => ticket.seatId === seat[0].seatId) ?
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