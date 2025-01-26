import { useState } from "react";
import Tooltip from "../../../tooltip/Tooltip";
import { useAppDispatch } from "../../../../hooks";
import { addSeat, removeSeat } from "../../../../redux/slices/seatsListSlice";
import "./seat.css";

interface Price {
  top?: number;
  bottom?: number;
  standard?: number; // Цена для люкса и четвертого класса
}

interface SeatProps {
  seatNumber: number;
  isAvailable: boolean;
  isSelected: boolean;
  carType: "first" | "second" | "third" | "fourth";
  isAdult: boolean;
  coach_id: string;
  directionType: "туда" | "обратно"; // Направление
  price: Price;
  onClick: () => void;
}

export const Seat: React.FC<SeatProps> = ({
  seatNumber,
  isAvailable,
  isSelected,
  carType,
  isAdult,
  coach_id,
  directionType,
  price,
  onClick,
}) => {
  const dispatch = useAppDispatch();
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const directionMap = {
    "туда": "to",
    "обратно": "back",
  } as const;

  // Определение цены для места в зависимости от типа и положения
  const seatPrice =
  carType === "first" || carType === "fourth"
    ? price.standard ?? (console.error("Цена для люкса или 4 класса не задана"), 0)
    : seatNumber % 2 === 0
    ? price.top ?? (console.error("Цена для верхнего места не задана"), 0)
    : price.bottom ?? (console.error("Цена для нижнего места не задана"), 0);

  const seatClass = `${carType}-seat ${isAvailable ? "available" : "unavailable"} ${
    isSelected && isAvailable ? "selected" : ""
  }`;

  const handleClick = () => {
    if (isAvailable) {
      setTooltipVisible(false);
      if (isSelected) {
        dispatch(removeSeat({ seatNumber, direction: directionMap[directionType] }));
      } else {
        dispatch(
          addSeat({
            direction: directionMap[directionType],
            passenger: { seatNumber, isAdult, coach_id, price: seatPrice },
          })
        );
      }
    } else {
      setTooltipVisible(true);
      setTimeout(() => setTooltipVisible(false), 1000);
    }
    onClick();
  };

  return (
    <div className={seatClass} onClick={handleClick}>
      {seatNumber}
      {tooltipVisible && !isAvailable && <Tooltip content={"Место занято"} visible={tooltipVisible} />}
    </div>
  );
};
