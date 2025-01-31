import { formattedPrice } from "../../helpers/formattedPrice";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { clearOrder } from "../../redux/slices/passengersSlise";
import { clearCities } from "../../redux/slices/citySlice";
import { clearDates } from "../../redux/slices/dateSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { StarRating } from "../starRating/StarRating";
import screen from "../../assets/images/thankyou/screen.png";
import print from "../../assets/images/thankyou/print.png";
import conductor from "../../assets/images/thankyou/conductor.png";
import classes from "./thankYouBlock.module.css";

export const ThankYouBlock = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { total_combined_price } = useAppSelector(
    (state: RootState) => state.seats_list
  );
  const user = useAppSelector((state) => state.order.order.user);

  const handleClick = () => {
    navigate("/");
    dispatch(clearOrder());
    dispatch(clearCities());
    dispatch(clearDates());
  };

  return (
    <>
      {total_combined_price !== 0 ? (
        <>
          <div className={classes.container}>
            <div className={classes.title}>Благодарим Вас за заказ!</div>
            <div className={classes.headline}>
              <div className={classes.order}>№Заказа 285АА</div>
              <p>
                <span className={classes.gray}>сумма</span>
                {formattedPrice(total_combined_price)}
                <span className={classes.gray}>₽</span>
              </p>
            </div>
            <div className={classes.instructions}>
              <div className={classes.step}>
                <img src={screen} alt="" />
                <p>билеты будут отправлены на ваш e-mail</p>
              </div>
              <div className={classes.step}>
                <img src={print} alt="" />
                <p>распечатайте и сохраняйте билеты до даты поездки</p>
              </div>
              <div className={classes.step}>
                <img src={conductor} alt="" />
                <p>предьявите распечатанные билеты при посадке</p>
              </div>
            </div>
            <div className={classes.info}>
              <p className={classes.name}>
                {user.first_name} {user.last_name}!
              </p>
              <p>
                Ваш заказ успешно оформлен. В ближайшее время с вами свяжется
                наш оператор для подтверждения.
              </p>
              <p className={classes.gratitude}>
                Благодарим Вас за оказанное доверие и желаем приятного
                путешествия!
              </p>
            </div>
            <div className={classes.bottom}>
              <div className={classes.estimation}>
                <p>Оценить сервис</p>
                <StarRating />
                <div className={classes.stars}></div>
              </div>
              <button className={classes.btn} onClick={handleClick}>
                вернуться на главную
              </button>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
