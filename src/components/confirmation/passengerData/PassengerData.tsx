import { useNavigate } from "react-router-dom";
import { ChangeBtn } from "../changeBtn/ChangeBtn";
//import { clearOrder } from "../../../redux/slices/passengersSlise";
import { useAppSelector } from "../../../hooks";
import { RootState } from "../../../redux/store";
import { formattedPrice } from "../../../helpers/formattedPrice";
import resonIcon from "../../../assets/images/payment/person.png";
import classes from "./passengerData.module.css";
import { SeatInfo } from "../../../types/IPassengers";

export const PassengerData = () => {
    //const dispatch = useAppDispatch();
  const order = useAppSelector((state: RootState) => state.order);
  const seats = order.order.departure.seats;
  const { total_combined_price } = useAppSelector((state: RootState) => state.seats_list);
  const navigate = useNavigate();

const onChangePassengers = () => {
    navigate(`/passengers`)
    //dispatch(clearOrder());
      }

  return (
    <>
      <div className={classes.container}>
        <div className={classes.data}>
          {seats.map((seat: SeatInfo, index: number) => (
            <div key={`seat-${index}`} className={classes.passenger}>
              <div className={classes.age}>
                <img src={resonIcon} alt="" />
                {seat.person_info.is_adult ? <p>Взрослый</p> : <p>Детский</p>}
              </div>
              <div>
                <p>
                  {seat.person_info.first_name} {seat.person_info.last_name}{" "}
                  {seat.person_info.patronymic}
                </p>{" "}
                <p className={classes.gray}>
                  Пол: {seat.person_info.gender ? "мужской" : "женский"}
                </p>{" "}
                <p className={classes.gray}>
                  Дата рождения: {seat.person_info.birthday}
                </p>{" "}
                <p className={classes.gray}>
                    {seat.person_info.document_type === "passport" ? `Паспорт РФ: ${seat.person_info.document_data}`: `Свидетельство о рождении: ${seat.person_info.document_data}`}
                </p>{" "}
              </div>
            </div>
          ))}
        </div>
        <div className={classes.price}>
          <div className={classes.sum}>
            <p>Всего</p>
            <span>{formattedPrice(total_combined_price)}</span>
            <span className={classes.ruble}>₽</span>
          </div>
          <ChangeBtn onClick={onChangePassengers}/>
          {/* Укажите правильный маршрут для перехода */}
        </div>
      </div>
    </>
  );
};
