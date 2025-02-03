import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  fetchSeatsTo,
  fetchSeatsBack,
} from "../../redux/slices/seatsSlice";
import { Modal } from "../modal/Modal";
import { NextBtn } from "../buttons/next/NextBtn";
import { RootState } from "../../redux/store";
import { Carriage } from "./сarriage/Carriage";
import { TrainInfo } from "../../types/TrainInfo";
import classes from "./seatsPage.module.css";

interface SeatsPageProps {
  direction: TrainInfo | null;
  onBackToDirections: () => void;
}

export const SeatsPage: React.FC<SeatsPageProps> = ({
  direction,
  onBackToDirections,
}) => {
  const dispatch = useAppDispatch();
  const seats = useAppSelector((state: RootState) => state.seats);
  const selectedSeats = useAppSelector((state: RootState) => state.seats_list);
  const filtersTo = useAppSelector((state: RootState) => state.filterCarriages.filtersTo);
  const filtersBack = useAppSelector((state: RootState) => state.filterCarriages.filtersBack);

  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (selectedSeats.back.total_seats && selectedSeats.back.total_seats !== selectedSeats.to.total_seats) {
      openModal();
    } else {
      navigate(`/passengers`);
    }
  };

  const openModal = () => {
    setIsVisible(true);
  };

  useEffect(() => {
    if (direction && direction.departure?._id) { 
      dispatch(fetchSeatsTo(direction.departure._id));

      
      if (direction.arrival?._id) {
        dispatch(fetchSeatsBack(direction.arrival._id)); 
      }

      console.table(`Массив мест на странице мест: ${JSON.stringify(seats)}`);
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
      {selectedSeats.to.total_seats === 0 ? (<NextBtn active={false} type={"button"} />) : (<NextBtn active={true} type={"button"} onClick={handleClick}/>) }
      <Modal 
        modalType="error" 
        isOpen={isVisible} 
        children={<p>Число мест по направлениям "туда" и "обратно" должно совпадать</p>} 
        onClose={() => setIsVisible(false)} 
      />
    </div>
  );
};
