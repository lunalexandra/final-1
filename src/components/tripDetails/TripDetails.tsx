import { useState } from "react";
import { useAppSelector } from "../../hooks";
import { RootState } from "../../redux/store";
import { formattedDate } from "../../helpers/formattedDate";
import { formattedTime } from "../../helpers/formattedTime";
import { convertSecondsToTime } from "../../helpers/convertSecondsToTime";
import { formattedPrice } from "../../helpers/formattedPrice";
import { getAdultWord, getChildWord } from "../../helpers/wordForms";
import arrowRight from "../../assets/images/arrow-right.png";
import arrowLeft from "../../assets/images/arrow-left.png";
import right from "../../assets/images/trains/right.png";
import left from "../../assets/images/trains/left.png";
import human from "../../assets/images/passengers/human.png";
import classes from "./tripDetails.module.css";

export const TripDetails = () => {
  const [isExpandedThere, setIsExpandedThere] = useState<boolean>(false);
  const [isExpandedBack, setIsExpandedBack] = useState<boolean>(false);
  const [isExpandedPassengers, setIsExpandedPassengers] =
    useState<boolean>(false); // Новое состояние для пассажиров

  const { direction } = useAppSelector(
    (state: RootState) => state.selectedDirection
  );
  const { total_combined_price, total_adult_price, total_children_price, to } =
    useAppSelector((state: RootState) => state.seats_list);

  const toggleExpandThere = () => {
    setIsExpandedThere((prevState) => !prevState);
  };

  const toggleExpandBack = () => {
    setIsExpandedBack((prevState) => !prevState);
  };

  const toggleExpandPassengers = () => {
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
            <p className={classes.date}>
              {direction?.departure.from.datetime
                ? formattedDate(direction?.departure.from.datetime)
                : ""}
            </p>
            <button onClick={toggleExpandThere} className={classes.button}>
              {isExpandedThere ? "—" : "+"}
            </button>
          </div>
          {isExpandedThere && (
            <>
              <div className={classes["train-number"]}>
                <p className={classes.text}>Поезд №</p>
                <p className={classes.number}>
                  {direction?.departure.train.name}
                </p>
              </div>
              <div className={classes["train-name"]}>
                <p className={classes.text}>Название</p>
                <div className={classes["train-cities"]}>
                  <p className={classes.name}>
                    {direction?.departure.to.city.name}
                  </p>
                  <p className={classes.name}>
                    {direction?.departure.from.city.name}
                  </p>
                </div>
              </div>
              <div className={classes.time}>
                <div className={classes.from}>
                  <p className={classes["from-time"]}>
                    {direction?.departure.from.datetime
                      ? formattedTime(direction?.departure.from.datetime)
                      : ""}
                  </p>
                  <p className={classes["from-date"]}>
                    {direction?.departure.from.datetime
                      ? formattedDate(direction?.departure.from.datetime)
                      : ""}
                  </p>
                </div>
                <div className={classes.duration}>
                  {direction?.departure.duration
                    ? convertSecondsToTime(direction?.departure.duration)
                    : ""}
                  {direction?.departure.duration ? (
                    <img
                      src={right}
                      alt=""
                      className={classes["arrow-duration"]}
                    />
                  ) : null}
                </div>
                <div className={classes.to}>
                  <p className={classes["to-time"]}>
                    {direction?.departure.to.datetime
                      ? formattedTime(direction?.departure.to.datetime)
                      : ""}
                  </p>
                  <p className={classes["to-date"]}>
                    {direction?.departure.to.datetime
                      ? formattedDate(direction?.departure.to.datetime)
                      : ""}
                  </p>
                </div>
              </div>
              <div className={classes.cities}>
                <div className={classes["from-city"]}>
                  <p>{direction?.departure.from.city.name}</p>
                  <p className={classes.station}>
                    {direction?.departure.from.railway_station_name}
                  </p>
                </div>
                <div className={classes["to-city"]}>
                  <p>{direction?.departure.to.city.name}</p>
                  <p className={classes.station}>
                    {direction?.departure.to.railway_station_name}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
        <div className={classes.back}>
          <div className={classes.topline}>
            <img src={arrowLeft} alt="" />
            <p className={classes.title}>Обратно</p>
            <p className={classes.date}>
              {direction?.arrival?.from.datetime
                ? formattedDate(direction?.arrival.from.datetime)
                : ""}
            </p>
            <button onClick={toggleExpandBack} className={classes.button}>
              {isExpandedBack ? "—" : "+"}
            </button>
          </div>
          {isExpandedBack && (
            <>
              <div className={classes["train-number"]}>
                <p className={classes.text}>Поезд №</p>
                <p className={classes.number}>
                  {direction?.arrival?.train.name}
                </p>
              </div>
              <div className={classes["train-name"]}>
                <p className={classes.text}>Название</p>
                <div className={classes["train-cities"]}>
                  <p className={classes.name}>
                    {direction?.arrival?.from.city.name}
                  </p>
                  <p className={classes.name}>
                    {direction?.arrival?.to.city.name}
                  </p>
                </div>
              </div>
              <div className={classes.time}>
                <div className={classes.from}>
                  <p className={classes["from-time"]}>
                    {direction?.arrival?.from.datetime
                      ? formattedTime(direction?.arrival?.from.datetime)
                      : ""}
                  </p>
                  <p className={classes["from-date"]}>
                    {direction?.arrival?.from.datetime
                      ? formattedDate(direction?.arrival?.from.datetime)
                      : ""}
                  </p>
                </div>
                <div className={classes.duration}>
                  {direction?.arrival?.duration
                    ? convertSecondsToTime(direction?.arrival?.duration)
                    : ""}
                  {direction?.arrival?.duration ? (
                    <img
                      src={left}
                      alt=""
                      className={classes["arrow-duration"]}
                    />
                  ) : null}
                </div>
                <div className={classes.to}>
                  <p className={classes["to-time"]}>
                    {direction?.arrival?.to.datetime
                      ? formattedTime(direction?.arrival?.to.datetime)
                      : ""}
                  </p>
                  <p className={classes["to-date"]}>
                    {direction?.arrival?.to.datetime
                      ? formattedDate(direction?.arrival?.to.datetime)
                      : ""}
                  </p>
                </div>
              </div>
              <div className={classes.cities}>
                <div className={classes["from-city"]}>
                  <p>{direction?.arrival?.from.city.name}</p>
                  <p className={classes.station}>
                    {direction?.arrival?.from.railway_station_name}
                  </p>
                </div>
                <div className={classes["to-city"]}>
                  <p>{direction?.arrival?.to.city.name}</p>
                  <p className={classes.station}>
                    {direction?.arrival?.to.railway_station_name}
                  </p>
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
            <>
              <div className={classes.adults}>
                <p className={classes.text}>
                  <>
                    {to.adults}
                    {` ${getAdultWord(to.adults)}`}
                  </>
                </p>
                <div className={classes.number}>
                  {formattedPrice(total_adult_price)}
                  <span className={classes.ruble}> ₽</span>
                </div>
              </div>
              <div className={classes.kids}>
                <p className={classes.text}>
                  {to.children}
                  {` ${getChildWord(to.children)}`}
                </p>
                <div className={classes.number}>
                  {formattedPrice(total_children_price)}
                  <span className={classes.ruble}> ₽</span>
                </div>
              </div>
            </>
          )}
        </div>
        <div className={classes.sum}>
          <h2>ИТОГ</h2>
          <div className={classes.total}>
            {formattedPrice(total_combined_price)}
            <span> ₽</span>
          </div>
        </div>
      </div>
    </>
  );
};
