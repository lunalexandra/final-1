import { Calendar } from "../calendar/Calendar";
import Icon from "../universalIcon/Icon";
import Slider from "../slider/Slider";
import  LastTickets from "../lastTickets/LastTickets";
import TimeSliderCard from "../timeSliderCard/TimeSliderCard";
import compartmentIcon from "../../assets/images/wagons/compartment.png";
import couchetteCarIcon from "../../assets/images/wagons/couchette-car.png";
import coachIcon from "../../assets/images/wagons/coach.png";
import loungeCarIcon from "../../assets/images/wagons/lux.png";
import WiFiIcon from "../../assets/images/wagons/wi-fi.png";
import expressIcon from "../../assets/images/wagons/express.png";
import ToggleSwitch from "../toggleSwitch/ToggleSwitch";
import classes from "./filter.module.css";

export const Filter = () => { 

  return (
    <>
      <div className={classes["filter__container"]}>
        <div className={classes["filter__dates"]}>
          <label className={classes["filter__dates-label"]} htmlFor="filter-date-from">Дата поездки</label>
          <Calendar
            id={"filter-date-from"}
            type="date_start"
            classname={"filter__dates-from"}
            classnameImg={"filter-img"}
          />
          <label className={classes["filter__dates-label"]} htmlFor="filter-date-to">Дата возвращения</label>
          <Calendar
            id={"filter-date-to"}
            type="date_end"
            classname={"filter__dates-to"}
            classnameImg={"filter-img"}
          />
        </div>
        <div className={classes["filter__wagons"]}>
          <div className={classes["wagons__item"]}>
            <div className={classes["wagons__img"]}>
              <Icon
                normalSrc={compartmentIcon}
                alt={"compartmentIcon"}
                classname={classes["wagons__icon"]}
              />
            </div>
            <ToggleSwitch filterType={"have_second_class"} label={"Купе"} />
          </div>

          <div className={classes["wagons__item"]}>
            <div className={classes["wagons__img"]}>
              <Icon
                normalSrc={couchetteCarIcon}
                alt={"couchetteCarIcon"}
                classname={classes["wagons__icon"]}
              />
            </div>
            <ToggleSwitch filterType={"have_third_class"} label={"Плацкарт"} />
          </div>

          <div className={classes["wagons__item"]}>
            <div className={classes["wagons__img"]}>
              <Icon
                normalSrc={coachIcon}
                alt={"coachIcon"}
                classname={classes["wagons__icon"]}
              />{" "}
            </div>
            <ToggleSwitch filterType={"have_fourth_class"} label={"Сидячий"} />
          </div>

          <div className={classes["wagons__item"]}>
            <div className={classes["wagons__img"]}>
              <Icon
                normalSrc={loungeCarIcon}
                alt={"loungeCarIcon"}
                classname={classes["wagons__icon"]}
              />{" "}
            </div>
            <ToggleSwitch filterType={"have_first_class"} label={"Люкс"} />
          </div>

          <div className={classes["wagons__item"]}>
            <div className={classes["wagons__img"]}>
              <Icon
                normalSrc={WiFiIcon}
                alt={"WiFiIcon"}
                classname={classes["wagons"]}
              />{" "}
            </div>
            <ToggleSwitch filterType={"have_wifi"} label={"Wi-Fi"} />
          </div>

          <div className={classes["wagons__item"]}>
            <div className={classes["wagons__img"]}>
              <Icon
                normalSrc={expressIcon}
                alt={"expressIcon"}
                classname={classes["wagons__icon"]}
              />
            </div>
            <ToggleSwitch filterType={"have_express"} label={"Экспресс"} />
          </div>
        </div>
        <div className={classes["filter__cost"]}>
          <h3 className={classes["filter__titles"]}>Стоимость</h3>
          <p className={classes["filter__from-to-titles"]}>
            <span>от</span>
            <span>до</span>
          </p>
          <div className={classes["slider-box"]}>
            <Slider key="slider-price" type="price" min={1000} max={15000} step={100} />
          </div>
        </div>
        <TimeSliderCard title={"Туда"} />
        <TimeSliderCard title={"Обратно"} />
      </div>

      <div className={classes["last-tickets"]}>
        <h3 className={classes["last-tickets__titles"]}>ПОСЛЕДНИЕ БИЛЕТЫ</h3>
      <LastTickets />
      </div>
    </>
  );
};
