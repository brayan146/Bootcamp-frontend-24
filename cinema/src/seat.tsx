import { useState } from 'react';
import availableSeat from './assets/seat.png';
import occupiedSeat from './assets/seatReserved.png';


interface SeatProps {
    seatNumber: string;
}
const Seat= ({seatNumber}: SeatProps) => {
    const [isAvailable, setIsAvailable] = useState(true);

    const handleSeatClick = () => {
        setIsAvailable(!isAvailable);
    };

  return (
    <div>
        <div>{seatNumber}</div>
      <img 
      src={isAvailable ? availableSeat : occupiedSeat} 
      alt="Seat"
      onClick={handleSeatClick}
      style={{cursor: 'pointer'}} 
      />
    </div>
  );
};

export default Seat;