import classes from "./passenger.module.css";

export const Passenger = () => {
  return (
    <>
      <form className={classes.form}>
        <div className={classes.topline}>
            <button className={classes.cross}></button>
        </div>
        <div className={classes.title}>
            <p>Пассажир</p>
            <span className={classes.number}>1</span>
        </div>
        <button className={classes.cross}>✖️</button>
      </form>
    </>
  );
};
