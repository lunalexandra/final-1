import { useState } from "react";
import {Seat} from "../Seat/Seat";

import classes from "./fourth.module.css";

interface Price {
    standard?: number; // Цена для люкса и четвертого класса
  }

interface FourthClassMapProps {
  seats: { index: number; available: boolean }[] | undefined;
  isAdult: boolean;
  coach_id: string;
  price: Price;
  directionType: "туда" | "обратно";
  coach_name?: string;
}

export const FourthClassMap: React.FC<FourthClassMapProps> = ({ seats, isAdult, coach_id, directionType, price, coach_name }) => {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const allSeats = Array.from({ length: 62 }, (_, i) => ({
    index: i + 1,
    available: seats?.some((seat) => seat.index === i + 1 && seat.available) || false,
  }));

  const handleSeatClick = (seatNumber: number) => {
    setSelectedSeats((prev) =>
      prev.includes(seatNumber) ? prev.filter((n) => n !== seatNumber) : [...prev, seatNumber]
    );
  };

  return (
    <div className={classes.fourth}>
        <div className={classes.places}>
      {allSeats.map((seat) => (
        <div className={`${classes.place} ${classes[`fourth-${seat.index}`]}`}>
        <Seat
          key={seat.index}
          seatNumber={seat.index}
          isAvailable={seat.available}
          isSelected={selectedSeats.includes(seat.index)}
          carType={"fourth"}
          isAdult={isAdult}
          coach_id={coach_id}
          directionType={directionType}
          price={price}
          onClick={() => handleSeatClick(seat.index)}
        /></div>
      ))}</div>
      <div className={classes.number}>{coach_name}</div>
      <div className={classes.info}>11 человек выбирают места в этом поезде</div>
    </div>
  );
};
