import trainImg from "../../assets/images/trains/all_train.png";
import classes from "./loadingPage.module.css";

export const LoadingPage = () => {
  return (
    <>
      <div className={classes.container}>
        <div className={classes.box}>
          <p className={classes.title}>ИДЕТ ПОИСК</p>
          <div className={classes.train}>
            <img src={trainImg} alt="" />
          </div>
          <div className={classes.line}></div>
        </div>
      </div>
    </>
  );
};
