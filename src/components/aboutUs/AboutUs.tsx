import classes from "./aboutUs.module.css";

export const AboutUs = () => {
  return (
    <section id="about" className={classes["about-us"]}>
      <h2 className={classes["about-us__title"]}>О НАС</h2>
      <div className={classes["about-us__text"]}>
        <p className={classes["about-us__text-normal"]}>
          Мы рады видеть вас! Мы рботаем для Вас с 2003 года. 14 лет мы
          наблюдаем, как с каждым днем все больше людей заказывают жд билеты
          через интернет.{" "}
        </p>
        <p className={classes["about-us__text-normal"]}>
          Сегодня можно заказать железнодорожные билеты онлайн всего в 2 клика,
          но стоит ли это делать? Мы расскажем о преимуществах заказа через
          интернет.
        </p>
        <p className={classes["about-us__text-bold"]}>
          Покупать жд билеты дешево можно за 90 суток до отправления поезда.
          Благодаря динамическому ценообразованию цена на билеты в это время
          самая низкая.
        </p>
      </div>
    </section>
  );
};
