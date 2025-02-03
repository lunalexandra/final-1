import { useNavigate } from 'react-router-dom';
import { RootState } from "../../redux/store";
import { TripDetails } from "../tripDetails";
import { Passenger } from "./passenger/Passenger";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { clearOrder } from "../../redux/slices/passengersSlise";
import { NextBtn } from "../buttons/next/NextBtn";
import { PassengerHandle } from "./passenger/Passenger";
import classes from "./passengerList.module.css";
import { useState, useRef } from "react";

export const PassengerList = () => {
const navigate = useNavigate();
const dispatch = useAppDispatch();
  const { to, back } = useAppSelector((state: RootState) => state.seats_list);
  const {allValid} = useAppSelector((state: RootState) => state.order);
  
  const passengerRefs = useRef<(PassengerHandle | null)[]>([]);
  
  const [passengers, setPassengers] = useState([{ id: 1 }]);

  const onNextPassenger = () => {
    if (passengers.length < to.total_seats) {
      setPassengers([...passengers, { id: passengers.length + 1 }]);
    }
  };

  const onDeletePassenger = (id: number) => {
    const updatedPassengers = passengers.filter(
      (passenger) => passenger.id !== id
    );

    const reindexedPassengers = updatedPassengers.map((passenger, index) => ({
      ...passenger,
      id: index + 1, // Новая нумерация
    }));
    setPassengers(reindexedPassengers);
  };

  const handleSubmitAll = () => {
    if (!allValid) {
      console.log("Не все формы валидны. Отправка отменена.");
      return; // Прекращаем выполнение, если не все формы валидны
    }
    dispatch(clearOrder())
    passengerRefs.current.forEach((ref, index) => {
      if (ref) {
        console.log(`Ref at index ${index} перед отправкой:`, ref);
        if (ref.handleSubmit) {
          console.log(`Вызов метода handleSubmit для пассажира ${index + 1}`);
          ref.handleSubmit({} as React.FormEvent); // Вызов метода с пустым событием
        } else {
          console.log(`Метод handleSubmit не найден для пассажира ${index + 1}`);
        }
      } else {
        console.log(`Реф для пассажира ${index + 1} не существует`);
      }
    });
    navigate(`/payment`);
  };

  return (
    <>
      <aside>
        <TripDetails />
      </aside>
      <main className={classes.container}>
        {passengers.length > 0
          ? passengers.map((passenger, index) => (
              <Passenger
                key={passenger.id}
                ref={(el) => (passengerRefs.current[passenger.id - 1] = el)} // Добавляем реф для каждого пассажира
                number={passenger.id} // Нумерация пассажиров
                seatNumberTo={to.seat_numbers[index]?.seatNumber}
                seatNumberBack={back ? back.seat_numbers[index]?.seatNumber : undefined}
                coach_idTo={to.seat_numbers[index]?.coach_id}
                coach_idBack={back ? back.seat_numbers[index]?.coach_id : undefined}
                onNextPassenger={onNextPassenger}
                onDeletePassenger={() => onDeletePassenger(passenger.id)}
              />
            ))
          : null}
        {passengers.length < to.total_seats ? (
          <div className={classes.add} onClick={onNextPassenger}>
            <p>Добавить пассажира</p>
            <div className={classes.plus}>+</div>
          </div>
        ) : null}
        <NextBtn 
          type={"submit"} 
          onClick={handleSubmitAll} 
          active={passengers.length === to.total_seats && allValid} // Только если все пассажиры добавлены и валидны
        />
      </main>
    </>
  );
};
