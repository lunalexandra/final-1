import { useState } from "react";
import {Seat} from "./Seat/Seat";

import classes from "./map.module.css";

interface FirstClassProps {
  seats: { index: number; available: boolean }[] | undefined;
  isAdult: boolean;
  coach_id: string;
  directionType: "туда" | "обратно";
}

export const FirstClass: React.FC<FirstClassProps> = ({ seats, isAdult, coach_id, directionType }) => {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  // Генерация полного списка мест
  const allSeats = Array.from({ length: 18 }, (_, i) => ({
    index: i + 1,
    available: seats?.some((seat) => seat.index === i + 1 && seat.available) || false,
  }));

  const handleSeatClick = (seatNumber: number) => {
    setSelectedSeats((prev) =>
      prev.includes(seatNumber) ? prev.filter((n) => n !== seatNumber) : [...prev, seatNumber]
    );
  };

  return (
    <div className={classes.first}>
      {allSeats.map((seat) => (
        <Seat
          key={seat.index}
          number={seat.index}
          isAvailable={seat.available}
          isSelected={selectedSeats.includes(seat.index)}
          carType={"first"}
          coach_id={coach_id}
          isAdult={isAdult}
          directionType={directionType}
          onClick={() => handleSeatClick(seat.index)}
          
        />
      ))}
    </div>
  );
};
