import classes from "../header.module.css";

export const Logo = () => {
  return (
    <div className={classes["header__logo"]}>
      <a href="#" className={`${classes["header__logo-link"]} ${"logo-link"}`} >
        Лого
      </a>
    </div>
  );
};
