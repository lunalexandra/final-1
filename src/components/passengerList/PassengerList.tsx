import { RootState } from "../../redux/store";
import { TripDetails } from "../tripDetails";
import { Passenger } from "./passenger/Passenger";
import { useAppSelector } from "../../hooks";
import { NextBtn } from "../buttons/next/NextBtn";
import classes from "./passengerList.module.css";
import { useState } from "react";

export const PassengerList = () => {
  const { to, back } = useAppSelector((state: RootState) => state.seats_list);

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

  const onSubmit = () => {
    console.log(`click`)
  }

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
                number={passenger.id} // Нумерация пассажиров
                seatNumberTo={to.seat_numbers[index]?.seatNumber}
                seatNumberBack={
                  back ? back.seat_numbers[index]?.seatNumber : undefined
                }
                coach_idTo={to.seat_numbers[index]?.coach_id}
                coach_idBack={
                  back ? back.seat_numbers[index]?.coach_id : undefined
                }
                onNextPassenger={onNextPassenger}
                onDeletePassenger={() => onDeletePassenger(passenger.id)}
              />
            ))
          : null}
        {passengers.length < to.total_seats ? (
          <>
            <div className={classes.add} onClick={onNextPassenger}>
              <p>Добавить пассажира</p>
              <div className={classes.plus}>+</div>
            </div>
          </>
        ) : null}
        <NextBtn type={"submit"} onClick={onSubmit}active={passengers.length === to.total_seats ? true : false} />
      </main>
    </>
  );
};
