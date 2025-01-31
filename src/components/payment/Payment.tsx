
import { TripDetails } from "../tripDetails";
import { PaymentForm } from './paymentForm/PaymentForm';
import classes from "./payment.module.css";

export const Payment = () => {
  return (
    <>
      <aside>
        <TripDetails />
      </aside>
      <main className={classes.container}>
       <PaymentForm/>
      </main>
    </>
  );
};
