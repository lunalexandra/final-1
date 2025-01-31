import { Header, Footer, ThankYouBlock } from "../../components";
import banner from "../../assets/images/banner3.png";
import classes from "./thankYouPage.module.css";

export const ThankYouPage = () => {
  return (
    <>
      <Header
        background={banner}
        children={<div className={classes.empty}></div>}
      />
      <div className={classes["main-container"]}>
        <ThankYouBlock/>
      </div>
      <Footer />
      
    </>
  );
};
