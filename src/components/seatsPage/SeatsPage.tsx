import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  fetchSeatsTo,
  fetchSeatsBack,
} from "../../redux/slices/seatsSlice";
import { RootState } from "../../redux/store";
import { Carriage } from "./сarriage/Carriage";
import { TrainInfo } from "../../types/TrainInfo";
import classes from "./seatsPage.module.css";

interface SeatsPageProps {
  direction: TrainInfo | null; // Добавляем тип для direction
  onBackToDirections: () => void; // Добавляем тип для onBack
}

export const SeatsPage: React.FC<SeatsPageProps> = ({
  direction,
  onBackToDirections,
}) => {
  const dispatch = useAppDispatch();
  const seats = useAppSelector((state: RootState) => state.seats);
  const filtersTo = useAppSelector((state: RootState) => state.filterCarriages.filtersTo);
  const filtersBack = useAppSelector((state: RootState) => state.filterCarriages.filtersBack);

  useEffect(() => {
    if (direction && direction.departure._id) { // Проверяем, что direction и id существуют
      dispatch(fetchSeatsTo(direction.departure._id)); // Передаем id в fetchSeatsTo
      
      // Проверяем наличие id для возврата перед вызовом fetchSeatsBack
      if (direction.arrival?._id) {
        dispatch(fetchSeatsBack(direction.arrival._id)); // Передаем id в fetchSeatsBack, если он существует
      }

      console.table(
        `Массив мест в странице мест: ${JSON.stringify(seats)}`
      );
    } else {
      console.error("Города не выбраны или ID отсутствует.");
    }
  }, [dispatch, direction, filtersTo, filtersBack]);

  return (
    <div className={classes.container}>
      <h3 className={classes.title}>ВЫБОР МЕСТ</h3>
      {direction?.arrival ? (
        <>
          <Carriage
          seats={seats.seatsTo}
            type="туда"
            direction={direction}
            onReturn={onBackToDirections}
          />
          <Carriage
          seats={seats.seatsBack}
            type="обратно"
            direction={direction}
            onReturn={onBackToDirections}
          />
        </>
      ) : (
        <Carriage
        seats={seats.seatsTo}
          type="туда"
          direction={direction}
          onReturn={onBackToDirections}
        />
      )}
    </div>
  );
};
