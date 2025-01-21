import { TripDetails } from "../tripDetails";
import classes from "./passengerList.module.css";

export const PassengerList = () => {
    return (
        <>
        <aside><TripDetails/></aside>
        <main className={classes.container}>
        </main>
        </>
    )
}