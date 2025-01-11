import { TrainInfo } from "../../../types/TrainInfo";
import { formatDuration } from "./formatDuration";
import { FilterIcon } from "../filterIcon/FilterIcon";
import thereIcon from "../../../assets/images/seats/there.png";
import backIcon from "../../../assets/images/seats/back.png";
import trainIcon from "../../../assets/images/seats/train.png";
import rightIcon from "../../../assets/images/seats/arrow-right.png";
import leftIcon from "../../../assets/images/seats/arrow-left.png";
import clockIcon from "../../../assets/images/seats/clock.png";
import class1Icon from "../../../assets/images/seats/1class.png";
import class2Icon from "../../../assets/images/seats/2class.png";
import class3Icon from "../../../assets/images/seats/3class.png";
import class4Icon from "../../../assets/images/seats/4class.png";
import class1IconActive from "../../../assets/images/seats/1class-yellow.png";
import class2IconActive from "../../../assets/images/seats/2class-yellow.png";
import class3IconActive from "../../../assets/images/seats/3class-yellow.png";
import class4IconActive from "../../../assets/images/seats/4class-yellow.png";
import classes from "./carriage.module.css";

interface CarriageProps {
  direction: TrainInfo | null;
  type: "туда" | "обратно";
  onReturn: () => void;
}

export const Carriage: React.FC<CarriageProps> = ({
  direction,
  onReturn,
  type,
}) => {
  return (
    <div className={classes.container}>
      <div
        className={
          type === "туда" ? classes["topline-there"] : classes["topline-back"]
        }
      >
        <div className={classes.arrow}>
          {type === "туда" ? (
            <img src={thereIcon} alt="" />
          ) : (
            <img src={backIcon} alt="" />
          )}
        </div>
        <button className={classes.return} onClick={onReturn}>
          Выбрать другой поезд
        </button>
      </div>
      <div className={classes.train}>
        <div className={classes.icon}>
          <img src={trainIcon} alt="" />
        </div>
        <div className={classes.name}>
          <div className={classes.number}>
          {type === "туда" ? (direction?.departure.train.name) : (direction?.arrival? (direction?.arrival.train.name) : ("") )}
          </div>
          <div className={classes.cities}>
            <p className={classes.initial}>
            {type === "туда" ? (direction?.departure.from.city.name) : (direction?.arrival? (direction?.arrival.from.city.name) : ("") )}➔
            </p>
            <p className={classes.from}>
            {type === "туда" ? (direction?.departure.from.city.name) : (direction?.arrival? (direction?.arrival.from.city.name) : ("") )}➔
            </p>
            <p className={classes.to}>{type === "туда" ? (direction?.departure.to.city.name) : (direction?.arrival? (direction?.arrival.to.city.name) : ("") )}</p>
          </div>
        </div>
        <div className={classes.departure}>
          {type === "туда" ? (
            <>
              <div className={classes["departure-time"]}>
                {direction?.departure.from.datetime
                  ? new Date(
                      direction?.departure.from.datetime * 1000
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""}
              </div>
              <div className={classes["departure-city"]}>
                {direction?.departure.from.city.name}
              </div>
              <div className={classes["departure-station"]}>
                {direction?.departure.from.railway_station_name}
              </div>
            </>
          ) : direction?.arrival ? (
            <>
              <div className={classes["departure-time"]}>
                {direction?.arrival.from.datetime
                  ? new Date(
                      direction?.arrival.from.datetime * 1000
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""}
              </div>
              <div className={classes["departure-city"]}>
                {direction?.arrival.from.city.name}
              </div>
              <div className={classes["departure-station"]}>
                {direction?.arrival.from.railway_station_name}
              </div>
            </>
          ) : (
            ""
          )}
        </div>


        <div className={classes["arrow-box"]}>
          {type === "туда" ? (
            <img src={rightIcon} alt="" />
          ) : (
            <img src={leftIcon} alt="" />
          )}
        </div>


        <div className={classes.arrival}>
          {type === "туда" ? (<>
          <div className={classes["arrival-time"]}>
            {direction?.departure.to.datetime
              ? new Date(
                  direction?.departure.to.datetime * 1000
                ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
              : ("")}
          </div>
          <div className={classes["arrival-city"]}>
            {direction?.departure.to.city.name}
          </div>
          <div className={classes["arrival-station"]}>
            {direction?.departure.to.railway_station_name}
          </div>
          </>) : (direction?.arrival ? (<><div className={classes["arrival-time"]}>
            {direction?.arrival.to.datetime
              ? new Date(
                  direction?.arrival.to.datetime * 1000
                ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
              : ""}
          </div>
          <div className={classes["arrival-city"]}>
            {direction?.arrival.to.city.name}
          </div>
          <div className={classes["arrival-station"]}>
            {direction?.arrival.to.railway_station_name}
          </div>
          </>) : (""))}
        </div>


        <div className={classes.duration}>
          <div className={classes.clock}>
            <img src={clockIcon} alt="" />
          </div>
          {type === "туда" ? (<><div className={classes.time}>
            {direction?.departure.duration
              ? formatDuration(direction?.departure.duration)
              : ""}
          </div></>) : (direction?.arrival ? (<div className={classes.time}>
            {direction?.arrival.duration
              ? formatDuration(direction?.arrival.duration)
              : ""}
          </div>) : (""))}
          
        </div>
      </div>
      <div className={classes["quantity-wrp"]}>
        <h3>Количество билетов</h3>
        <div className={classes.quantity}>
          <div className={classes.adults}>
            <div className={classes["input-box"]}>
              <label htmlFor="">
                Взрослых -{" "}
                <input type="text" className={classes.input} placeholder="0" />
              </label>
            </div>
            <div className={classes.add}>
              Можно добавить еще
              {} пассажиров
            </div>
          </div>
          <div className={classes.kids}>
            <div className={classes["input-box"]}>
              <label htmlFor="">
                Детских -{" "}
                <input type="text" className={classes.input} placeholder="0" />
              </label>
            </div>
            <div className={classes.add}>
              Можно добавить еще {} детей до 10 лет.Свое место в вагоне, как у
              взрослых, но дешевле в среднем на 50-65%
            </div>
          </div>
          <div className={classes.babies}>
            <div className={classes["input-box"]}>
              <label htmlFor="">
                Детских «без места» -{" "}
                <input type="text" className={classes.input} placeholder="0" />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.carriage}>
        <h3 className={classes["types-title"]}>Тип вагона</h3>
        <div className={classes.types}>
          <div className={classes.fourth}>
            <FilterIcon type={type} filterKey="have_fourth_class" activeImg={class4IconActive} inactiveImg={class4Icon} uniqueKey={`key-icon-have_fourth_class`} />
            <p className={classes["types-text"]}>Сидячий</p>
          </div>
          <div className={classes.third}>
            {" "}
            <FilterIcon type={type} filterKey="have_third_class" activeImg={class3IconActive} inactiveImg={class3Icon} uniqueKey={`key-icon-have_third_class`} />
            <p className={classes["types-text"]}>Плацкарт</p>
          </div>
          <div className={classes.second}>
            {" "}
            <FilterIcon type={type} filterKey="have_second_class" activeImg={class2IconActive} inactiveImg={class2Icon} uniqueKey={`key-icon-have_second_class`} />
            <p className={classes["types-text"]}>Купе</p>
          </div>
          <div className={classes.first}>
            {" "}
            <FilterIcon type={type} filterKey="have_first_class" activeImg={class1IconActive} inactiveImg={class1Icon} uniqueKey={`key-icon-have_first_class`} />
            <p className={classes["types-text"]}>Люкс</p>
          </div>
        </div>

        <div className={classes.numbers}>
          <p>
            Вагоны <span>12 13 {}</span>
          </p>
          <p>Нумерация вагонов начинается с головы поезда</p>
        </div>
        <div className={classes.info}>
          <div className={classes["carriage-number"]}>
            <p className={classes.numeric}>12</p>
            <span>вагон</span>
          </div>
          <div className={classes.places}>
            <div className={classes.total}>
              Места <span className={classes["total-number"]}>21 {}</span>
            </div>
            <div className={classes.upper}>
              Верхние <span>22{}</span>
            </div>
            <div className={classes.lower}>
              Нижние <span>23{}</span>
            </div>
          </div>

          <div className={classes.cost}>
            <div className={classes["cost-title"]}>Стоимость</div>
            <div className={classes["upper-number"]}>
              2200 <span>₽</span>
            </div>
            <div className={classes["lower-number"]}>
              2300 <span>₽</span>
            </div>
          </div>

          <div className={classes.service}>
            <p>Обслуживание ФПК</p>
            <div className={classes.facilities}>
              
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};
