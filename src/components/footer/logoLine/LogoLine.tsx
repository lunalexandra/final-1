import FooterArrow from "../../../assets/images/arrow.png";
import classes from "../footer.module.css";
export const LogoLine = () => {
  return (
    <div className={classes["footer__logoline"]}>
      <div className={classes["footer__logoline-logo"]}>
        <a href="#" className={`${classes["footer__logoline-link"]} ${"logo-link"}`} >
          Лого
        </a>
      </div>
      <div className={classes["footer__logoline-arrow"]}>
        <img
          src={FooterArrow}
          alt=""
          className={classes["footer__logoline-icon"]}
        />
      </div>
      <div className={classes["footer__logoline-details"]}>2018 WEB</div>
    </div>
  );
};
