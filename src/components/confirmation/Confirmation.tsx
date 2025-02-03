import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { RootState } from "../../redux/store";
import { sendOrder } from "../../redux/slices/passengersSlise";
import { TripDetails } from "../tripDetails";
import { Train } from "./trainBlock/Train";
import { PassengerData } from "./passengerData/PassengerData";
import { PaymentBlock } from "./paymentBlock/PaymentBlock";

import classes from "./confirmation.module.css";

export const Confirmation = () => {
    const direction = useAppSelector((state: RootState) => state.selectedDirection.direction);
    const order = useAppSelector((state: RootState) => state.order.order);
    const navigate = useNavigate();
const dispatch = useAppDispatch();

const handleSubmit = async () => {
    const resultAction = await dispatch(sendOrder(order));
    if (sendOrder.fulfilled.match(resultAction)) {
        navigate(`/completion`);
    } else {
        console.error('Ошибка при отправке заказа:', resultAction.error);
    }
};

  return (
    <>
      <aside>
        <TripDetails />
      </aside>
      <main className={classes.container}>
        {direction ? <>
            <div className={classes.card}>
          <div className={classes.title}>
            <p>Поезд</p>
          </div>
          <Train />
        </div>
        <div className={classes.card}>
          <div className={classes.title}>
            <p>Пассажиры</p>
          </div>
          <PassengerData />
        </div>
        <div className={classes.card}>
          <div className={classes.title}>
            <p>Способ оплаты</p>
          </div>
          <PaymentBlock />
        </div>
        <div className={classes.confirm}>
            <button type="button" className={classes.btn} onClick={handleSubmit}>ПОДТВЕРДИТЬ</button>
        </div>
        </> : <p>Нет выбранных направлений</p>}
      </main>
    </>
  );
};
