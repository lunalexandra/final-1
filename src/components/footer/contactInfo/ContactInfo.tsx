import phone from "/src/assets/images/phone.png";
import letter from "/src/assets/images/letter.png";
import skype from "/src/assets/images/skype.png";
import geolocation from "/src/assets/images/geolocation.png";
import classes from "../footer.module.css";

export const ContactInfo = () => {
  return (
    <div id="contacts" className={classes["footer__contacts"]}>
      <h3 className={classes["footer__contacts-title"]}>Свяжитесь с нами</h3>
      <div className={classes["footer__contacts-list"]}>
        <div className={classes["footer__contacts-item"]}>
          <div className={classes["footer__contacts-icon"]}>
            <img
              src={phone}
              alt="icon"
              className={classes["footer__contacts-img"]}
            />
          </div>
          <span className={classes["footer__contacts-text"]}>
            8 (800) 000 00 00
          </span>
        </div>
        <div className={classes["footer__contacts-item"]}>
          <div className={classes["footer__contacts-icon"]}>
            <img
              src={letter}
              alt="icon"
              className={classes["footer__contacts-img"]}
            />
          </div>
          <span className={classes["footer__contacts-text"]}>
            inbox@mail.ru
          </span>
        </div>
        <div className={classes["footer__contacts-item"]}>
          <div className={classes["footer__contacts-icon"]}>
            <img
              src={skype}
              alt="icon"
              className={classes["footer__contacts-img"]}
            />
          </div>
          <span className={classes["footer__contacts-text"]}>
            tu.train.tickets
          </span>
        </div>
        <div className={classes["footer__contacts-item"]}>
          <div className={classes["footer__contacts-icon"]}>
            <img
              src={geolocation}
              alt="icon"
              className={classes["footer__contacts-img"]}
            />
          </div>
          <span className={classes["footer__contacts-text"]}>
            г. Москва ул. Московская 27-35 555 555
          </span>
        </div>
      </div>
    </div>
  );
};
