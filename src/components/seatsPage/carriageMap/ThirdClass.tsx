import { useState } from "react";
import {Seat} from "./Seat/Seat";

import classes from "./map.module.css";

interface Price {
    top?: number;
    bottom?: number;
  }

interface ThirdClassProps {
  seats: { index: number; available: boolean }[] | undefined;
  isAdult: boolean;
  coach_id: string;
  price: Price;
  directionType: "туда" | "обратно";
}

export const ThirdClass: React.FC<ThirdClassProps> = ({ seats, isAdult, coach_id, directionType, price }) => {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  // Генерация полного списка мест
  const allSeats = Array.from({ length: 54 }, (_, i) => ({
    index: i + 1,
    available: seats?.some((seat) => seat.index === i + 1 && seat.available) || false,
  }));

  const handleSeatClick = (seatNumber: number) => {
    setSelectedSeats((prev) =>
      prev.includes(seatNumber) ? prev.filter((n) => n !== seatNumber) : [...prev, seatNumber]
    );
  };

  return (
    <div className={classes.third}>
      {allSeats.map((seat) => (
        <Seat
          key={seat.index}
          seatNumber={seat.index}
          isAvailable={seat.available}
          isSelected={selectedSeats.includes(seat.index)}
          carType={"third"}
          isAdult={isAdult}
          coach_id={coach_id}
          directionType={directionType}
          price={price}
          onClick={() => handleSeatClick(seat.index)}
        />
      ))}
    </div>
  );
};
