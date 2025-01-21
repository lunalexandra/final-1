import { useState } from "react";
import {getAdultWord, getChildWord} from "../../wordForms/wordForms";
import arrowRight from "../../assets/images/arrow-right.png";
import arrowLeft from "../../assets/images/arrow-left.png";
import right from "../../assets/images/trains/right.png";
import left from "../../assets/images/trains/left.png";
import human from "../../assets/images/passengers/human.png";
import classes from "./tripDetails.module.css";

export const TripDetails = () => {
  const [isExpandedThere, setIsExpandedThere] = useState<boolean>(false);
  const [isExpandedBack, setIsExpandedBack] = useState<boolean>(false);
  const [isExpandedPassengers, setIsExpandedPassengers] = useState<boolean>(false); // Новое состояние для пассажиров

  const toggleExpandThere = () => {
    setIsExpandedThere((prevState) => !prevState);
  };

  const toggleExpandBack = () => {
    setIsExpandedBack((prevState) => !prevState);
  };

  const toggleExpandPassengers = () => { // Новая функция для переключения состояния пассажиров
    setIsExpandedPassengers((prevState) => !prevState);
  };

  return (
    <>
      <div className={classes.container}>
        <h3>ДЕТАЛИ ПОЕЗДКИ</h3>
        <div className={classes.there}>
          <div className={classes.topline}>
            <img src={arrowRight} alt="" />
            <p className={classes.title}>Туда</p>
            <p className={classes.date}>{/* Здесь можно вставить дату */} 30.05.2018</p>
            <button onClick={toggleExpandThere} className={classes.button}>
              {isExpandedThere ? "—" : "+"}
            </button>
          </div>
          {isExpandedThere && (
            <>
              <div className={classes["train-number"]}>
                <p className={classes.text}>Поезд №</p>
                <p className={classes.number}>116</p>
              </div>
              <div className={classes["train-name"]}>
                <p className={classes.text}>Название</p>
                <div className={classes["train-cities"]}>
                  <p className={classes.name}>Москва</p>
                  <p className={classes.name}>Адлер</p>
                </div>
              </div>
              <div className={classes.time}>
                <div className={classes.from}>
                  <p className={classes["from-time"]}>00:35</p>
                  <p className={classes["from-date"]}>30.08.2022</p>
                </div>
                <div className={classes.duration}>9:43
                  <img src={right} alt="" />
                </div>
                <div className={classes.to}>
                  <p className={classes["to-time"]}>2:38</p>
                  <p className={classes["to-date"]}>31.08.2022</p>
                </div>
              </div>
              <div className={classes.cities}>
                <div className={classes["from-city"]}>
                  <p>Москва</p>
                  <p className={classes.station}>Курский</p>
                </div>
                <div className={classes["to-city"]}>
                  <p>Адлер</p>
                  <p className={classes.station}>Вокзал</p>
                </div>
              </div>
            </>
          )}
        </div>
        <div className={classes.back}>
          <div className={classes.topline}>
            <img src={arrowLeft} alt="" />
            <p className={classes.title}>Обратно</p>
            <p className={classes.date}>{/* Здесь можно вставить дату */} 30.05.2018</p>
            <button onClick={toggleExpandBack} className={classes.button}>
              {isExpandedBack ? "—" : "+"}
            </button>
          </div>
          {isExpandedBack && (
            <>
              <div className={classes["train-number"]}>
                <p className={classes.text}>Поезд №</p>
                <p className={classes.number}>116</p>
              </div>
              <div className={classes["train-name"]}>
                <p className={classes.text}>Название</p>
                <div className={classes["train-cities"]}>
                  <p className={classes.name}>Москва</p>
                  <p className={classes.name}>Адлер</p>
                </div>
              </div>
              <div className={classes.time}>
                <div className={classes.from}>
                  <p className={classes["from-time"]}>00:35</p>
                  <p className={classes["from-date"]}>30.08.2022</p>
                </div>
                <div className={classes.duration}>9:43
                  <img src={left} alt="" />
                </div>
                <div className={classes.to}>
                  <p className={classes["to-time"]}>2:38</p>
                  <p className={classes["to-date"]}>31.08.2022</p>
                </div>
              </div>
              <div className={classes.cities}>
                <div className={classes["from-city"]}>
                  <p>Москва</p>
                  <p className={classes.station}>Курский</p>
                </div>
                <div className={classes["to-city"]}>
                  <p>Адлер</p>
                  <p className={classes.station}>Вокзал</p>
                </div>
              </div>
            </>
          )}
        </div>
        <div className={classes.passengers}>
          <div className={classes.topline}>
            <img src={human} alt="" />
            <p className={classes.title}>Пассажиры</p>
            <button onClick={toggleExpandPassengers} className={classes.button}> 
              {isExpandedPassengers ? "—" : "+"}
            </button>
          </div>
          {isExpandedPassengers && ( 
            <><div className={classes.adults}>
              <p className={classes.text}><>5{` ${getAdultWord(5)}`}</></p>
              {/* добавить условие чтобы детей или взролых было больше 0 */}
              <div className={classes.number}>5600<span className={classes.ruble}> ₽</span></div>
            </div>
            <div className={classes.kids}>
              <p className={classes.text}>5{` ${getChildWord(5)}`}</p>
              <div className={classes.number}>3200<span className={classes.ruble}> ₽</span></div>
            </div>
            </>
          )}
        </div>
        <div className={classes.sum}>
          <h2>ИТОГ</h2>
          <div className={classes.total}>
            7600<span>  ₽</span>
          </div>
        </div>
      </div>
    </>
  );
};
