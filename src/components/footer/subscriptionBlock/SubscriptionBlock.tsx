import React, { useState } from "react";
import { subscribeEmail } from "../../../api/subscribeEmail";
import Tooltip from "../../tooltip/Tooltip";
import Icon from "../../universalIcon/Icon"
import { validateEmail } from "./validateEmail";
import youtubeIcon from "/src/assets/images/youtube.png";
import youtubeIconActive from "/src/assets/images/youtube-yellow.png";
import inIcon from "/src/assets/images/in.png";
import inIconActive from "/src/assets/images/in-yellow.png";
import gIcon from "/src/assets/images/g-icon.png";
import gIconActive from "/src/assets/images/g-icon-yellow.png";
import fIcon from "/src/assets/images/f-icon.png";
import fIconActive from "/src/assets/images/f-icon-yellow.png";
import twitterIcon from "/src/assets/images/twitter.png";
import twitterIconActive from "/src/assets/images/twitter-yellow.png";
import classes from "../footer.module.css";

export const SubscriptionBlock = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [tooltipMessage, setTooltipMessage] = useState<string>("");
  const [showTooltip, setShowTooltip] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Проверяем email:", email);

    // Проверяем, если поле пустое или содержит только пробелы
    if (!email.trim()) {
      console.log("Email пустой или состоит из пробелов.");
      setStatus("error");
      setTooltipMessage("Email не может быть пустым");
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 1000);
      return;
    }

    // Проверяем формат email
    if (!validateEmail(email)) {
      console.log("Email некорректный.");
      setStatus("error");
      setTooltipMessage("Введите корректный email");
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 1000);
      return;
    }

    console.log("Email валидный, продолжаем обработку...");
    setStatus("loading");
    try {
      await subscribeEmail(email);
      setStatus("success");
      setTooltipMessage("Спасибо за подписку!");
      setEmail("");
    } catch (error) {
      console.error("Ошибка при подписке:", error);
      setTooltipMessage("Ошибка! Попробуйте снова.");
      setStatus("error");
    } finally {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 1000);
    }
  };

  return (
    <div className={classes["footer__subscription"]}>
      <h3 className={classes["footer__subscription-title"]}>Подписка</h3>
      <form
        onSubmit={handleSubmit}
        className={classes["footer__subscription-form"]}
      >
        <div className={classes["footer__subscription-label"]}>
          <Tooltip content={tooltipMessage} visible={showTooltip}>
            <label htmlFor="subscribe">Будьте в курсе событий</label>
          </Tooltip>
        </div>
        <input
          id="subscribe"
          value={email}
          onChange={handleChange}
          placeholder="e-mail"
          className={classes["footer__subscription-input"]}
        />
        <button
          type="submit"
          className={classes["footer__subscription-button"]}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Отправка..." : "ОТПРАВИТЬ"}
        </button>
      </form>
      <h3 className={classes["footer__subscription-title"]}>
        Подписывайтесь на нас
      </h3>
      <div className={classes["footer__subscription-socials"]}>
        <div className={classes["footer__subscription-icon"]}>
          <a href="#">
          <Icon normalSrc={youtubeIcon} activeSrc={youtubeIconActive} alt="youtube" classname="footer__contacts-img"/>
          </a>
        </div>
        <div className={classes["footer__subscription-icon"]}>
          <a href="#">
          <Icon normalSrc={inIcon} activeSrc={inIconActive} alt="in" classname="footer__contacts-img"/>
          </a>
        </div>
        <div className={classes["footer__subscription-icon"]}>
          <a href="#">
          <Icon normalSrc={gIcon} activeSrc={gIconActive} alt="g+" classname="footer__contacts-img"/>
          </a>
        </div>
        <div className={classes["footer__subscription-icon"]}>
          <a href="#">
          <Icon normalSrc={fIcon} activeSrc={fIconActive} alt="f" classname="footer__contacts-img"/>
          </a>
        </div>
        <div className={classes["footer__subscription-icon"]}>
          <a href="#">
          <Icon normalSrc={twitterIcon} activeSrc={twitterIconActive} alt="twitter" classname="footer__contacts-img"/>
          </a>
        </div>
      </div>
    </div>
  );
};
