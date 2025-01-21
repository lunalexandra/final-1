import { useState } from "react";
import Tooltip from "../../../tooltip/Tooltip";
import { useAppDispatch } from "../../../../hooks";
import { addSeat, removeSeat } from "../../../../redux/slices/seatsListSlice";
import "./seat.css";

interface SeatProps {
  number: number;
  isAvailable: boolean;
  isSelected: boolean;
  carType: "first" | "second" | "third" | "fourth";
  isAdult: boolean;
  coach_id: string;
  directionType: "туда" | "обратно"; // Направление
  onClick: () => void;
}

export const Seat: React.FC<SeatProps> = ({
  number,
  isAvailable,
  isSelected,
  carType,
  isAdult,
  coach_id,
  directionType,
  onClick,
}) => {
  const dispatch = useAppDispatch();
  const [tooltipVisible, setTooltipVisible] = useState(false);

  // Сопоставляем русские направления с английскими
  const directionMap = {
    "туда": "to",
    "обратно": "back"
  } as const;

  // Формируем класс для места
  const seatClass = `${carType}-seat ${isAvailable ? "available" : "unavailable"} ${isSelected && isAvailable ? "selected" : ""}`;

  const handleClick = () => {
    // Если место доступно
    if (isAvailable) {
      setTooltipVisible(false); // Скрыть подсказку

      if (isSelected) {
        // Если место выбрано, удаляем его
        dispatch(removeSeat({ seatNumber: number, direction: directionMap[directionType] }));
      } else {
        // Если место не выбрано, добавляем его
        dispatch(addSeat({ 
          direction: directionMap[directionType], 
          passenger: { seatNumber: number, isAdult, coach_id } 
        }));
      }
    } else {
      // Если место занято, показываем подсказку
      setTooltipVisible(true);
      setTimeout(() => setTooltipVisible(false), 1000); // Скрыть подсказку через 1 секунду
    }

    onClick(); // Обработчик клика
  };

  return (
    <div className={seatClass} onClick={handleClick}>
      {number}
      {tooltipVisible && !isAvailable && <Tooltip content={"Место занято"} visible={tooltipVisible} />}
    </div>
  );
};
