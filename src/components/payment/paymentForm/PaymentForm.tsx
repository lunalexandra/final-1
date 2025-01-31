import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import { addUserInfo } from "../../../redux/slices/passengersSlise";
import { validateUserForm } from "../../../helpers/validateUserInfo";
import { UserInfo } from "../../../types/IPassengers";
import classes from "./paymentForm.module.css";

export const PaymentForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userInfoFromRedux = useAppSelector(state => state.order.order.user);
  const [userInfo, setUserInfo] = useState<UserInfo>(userInfoFromRedux);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "online">("cash");
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null,
    }));

    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateUserForm(userInfo);
    setErrors(formErrors);

    if (Object.values(formErrors).every((error) => error === null)) {
      console.log("Форма прошла валидацию. Данные отправлены!");
    }
    dispatch(addUserInfo(userInfo));
    navigate('/order');
  };

  const handlePaymentMethodChange = (method: "cash" | "online") => {
    setPaymentMethod(method);
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      payment_method: method,
    }));
  };

  useEffect(() => {
    if (userInfoFromRedux !== userInfo) {
        setUserInfo(userInfoFromRedux);
      }
  }, [userInfoFromRedux]);

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.container}>
        <div className={classes.topline}>
          <p>Персональные данные</p>
        </div>

        <div className={classes["complete-name"]}>
          <div className={classes["input-container"]}>
            <label htmlFor="first_name" className={classes.label}>
              Имя
            </label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              onChange={handleChange}
              value={userInfo.first_name}
              required
            />
            {errors.first_name && <p className={classes.error}>{errors.first_name}</p>}
          </div>

          <div className={classes["input-container"]}>
            <label htmlFor="last_name" className={classes.label}>
              Фамилия
            </label>
            <input
              id="last_name"
              type="text"
              name="last_name"
              onChange={handleChange}
              value={userInfo.last_name}
              required
            />
            {errors.last_name && <p className={classes.error}>{errors.last_name}</p>}
          </div>

          <div className={classes["input-container"]}>
            <label htmlFor="patronymic" className={classes.label}>
              Отчество
            </label>
            <input
              id="patronymic"
              type="text"
              name="patronymic"
              onChange={handleChange}
              value={userInfo.patronymic}
            />
          </div>
        </div>
        <div className={classes["mobile-number"]}>
          <div className={classes["input-container"]}>
            <label htmlFor="mobile-number" className={classes.label}>
              Контактный телефон
            </label>
            <input
              id="mobile-number"
              type="text"
              name="phone"
              value={userInfo.phone}
              onChange={handleChange}
              placeholder="+7 ___ ___ __ __"
              required
            />
            {errors.phone && <p className={classes.error}>{errors.phone}</p>}
          </div>
        </div>

        <div className={classes["e-mail"]}>
          <div className={classes["input-container"]}>
            <label htmlFor="e-mail" className={classes.label}>
              E-mail
            </label>
            <input
              id="e-mail"
              type="text"
              name="email"
              placeholder="inbox@gmail.ru"
              value={userInfo.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className={classes.error}>{errors.email}</p>}
          </div>
        </div>
        <div className={classes.topline}>
          <p>Способ оплаты</p>
        </div>

        <div className={classes["payment-method"]}>
          <div className={classes.online}>
            <div className={classes["checkbox-container"]}>
              <div 
                onClick={() => handlePaymentMethodChange("online")}
                className={paymentMethod === "online" ? `${classes["checkbox-custom"]} ${classes["active"]}` : classes["checkbox-custom"]}
              ></div>
              <p
                className={paymentMethod === "online" ? `${classes["checkbox-label"]} ${classes["label-active"]}` : classes["checkbox-label"]}
              >
                Онлайн
              </p>
            </div>
            <div className={classes["payment-systems"]}>
              <p>Банковской картой</p>
              <p>PayPal</p>
              <p>Visa QIWI Wallet</p>
            </div>
          </div>

          <div className={classes.cash}>
            <div className={classes["checkbox-container"]}>
              <div 
                onClick={() => handlePaymentMethodChange("cash")}
                className={paymentMethod === "cash" ? `${classes["checkbox-custom"]} ${classes["active"]}` : classes["checkbox-custom"]}
              ></div>
              <p
                className={paymentMethod === "cash" ? `${classes["checkbox-label"]} ${classes["label-active"]}` : classes["checkbox-label"]}
              >
                Наличными
              </p>
            </div>
          </div>
        </div>
      </div>
        
      <div className={classes["button-box"]}>
        <button type="submit" className={classes.buy}>Купить билеты</button>  
      </div>
    </form>
  );
};
