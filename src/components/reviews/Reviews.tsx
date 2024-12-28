import avatar1 from "../../assets/images/women.png";
import avatar2 from "../../assets/images/men.png";

import classes from "./reviews.module.css";

export const Reviews = () => {
  return (
    <section id="reviews" className={classes["reviews-block"]}>
      <h2 className={classes["reviews-block__title"]}>ОТЗЫВЫ</h2>
      <div className={classes["reviews-block__reviews"]}>
        <div className={classes["reviews-block__review-box"]}>
          <div className={classes["reviews-block__avatar-box"]}>
            <img src={avatar1} alt="" className={classes["reviews-block__img"]} />
          </div>
          <div className={classes["reviews-block__text-box"]}>
            <p className={classes["reviews-block__name"]}>Екатерина Вальнова</p>
            <p className={classes["reviews-block__blockquote"]}>
           “Доброжелательные подсказки на всех этапах помогут правильно
              заполнить поля и без затруднений купить авиа или ж/д билет, даже
              если вы заказываете онлайн билет впервые. ”
            </p>
          </div>
        </div>
        <div className={classes["reviews-block__review-box"]}>
          <div className={classes["reviews-block__avatar-box"]}>
            <img src={avatar2} alt="" className={classes["reviews-block__img"]} />
          </div>
          <div className={classes["reviews-block__text-box"]}>
            <p className={classes["reviews-block__name"]}>Евгений Стрыкало</p>
            <p className={classes["reviews-block__blockquote"]}>
            “СМС-сопровождение до посадки Сразу после оплаты
              ж/д билетов и за 3 часа до отправления мы пришлем вам
              СМС-напоминание о поездке.”
            </p>
          </div>
        </div>
      </div>

      <div className={classes["reviews-block__circles"]}>
        <div className={classes["reviews-block__circle"]}></div>
        <div className={classes["reviews-block__circle"]}></div>
        <div className={classes["reviews-block__circle"]}></div>
        <div className={classes["reviews-block__circle"]}></div>
        <div className={classes["reviews-block__circle"]}></div>
      </div>
    </section>
  );
};
