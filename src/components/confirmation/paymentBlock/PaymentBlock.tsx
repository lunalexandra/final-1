import { useNavigate } from "react-router-dom";
import { ChangeBtn } from "../changeBtn/ChangeBtn";
import { useAppSelector } from "../../../hooks";
import { RootState } from "../../../redux/store";
import classes from "./paymentBlock.module.css";

export const PaymentBlock = () => {
    const method = useAppSelector((state: RootState) => state.order.order.user.payment_method);
    const navigate = useNavigate();
  
  const onChangeMethod = () => {
      navigate(-1)
        }


    return (
    <>
      <div className={classes.container}>
        <div className={classes.method}>
          {method === "cash" ? <p>Наличными</p>:<p>Онлайн</p>}
        </div>
        <div className={classes.btn}>
          <ChangeBtn onClick={onChangeMethod}/>
        </div>
      </div>
    </>
  );
};
