import { convertSecondsToTime } from "../../../helpers/convertSecondsToTime"; 
import { formattedPrice } from "../../../helpers/formattedPrice";
import arrowRight from "../../../assets/images/trains/right.png";
import arrowLeft from "../../../assets/images/trains/left.png";
import trainIcon from "../../../assets/images/trains/train.png";
import icons from "../../../assets/images/triple.png";
import classes from "./trainCard.module.css";

const types = {
  first: "люкс",
  second: "купе",
  third: "плацкарт",
  fourth: "сидячий",
} as const;

type SeatType = keyof typeof types; 

interface SeatsInfo {
  [key: string]: number | null;
}

// Интерфейс для информации о ценах
interface PriceInfo {
  [key: string]: {
    bottom_price: number;
  };
}
  
interface TrainCardProps {
  trainNumber: string;
  departureCityFrom: string;
  departureCityTo: string;
  departureFromTime: number;
  departureStationFrom?: string;
  departureDuration: number;
  departureToTime: number;
  departureStationTo?: string;
  arrivalCityFrom?: string;
  arrivalCityTo?: string;
  arrivalFromTime?: number;
  arrivalStationFrom?: string;
  arrivalDuration?: number;
  arrivalToTime?: number;
  arrivalStationTo?: string;
  seats_info: SeatsInfo;
  price_info: PriceInfo;
  onSelect: () => void;
}

export const TrainCard: React.FC<TrainCardProps> = ({
  trainNumber,
  departureCityFrom,
  departureCityTo,
  departureFromTime,
  departureStationFrom,
  departureDuration,
  departureToTime,
  departureStationTo,
  arrivalCityFrom,
  arrivalCityTo,
  arrivalFromTime,
  arrivalStationFrom,
  arrivalDuration,
  arrivalToTime, 
  arrivalStationTo,
  seats_info,
  price_info,
  onSelect
}) => {
  return (
    <article className={classes.container}>
      <div className={classes.train}>
        <div className={classes.icon}>
          <img src={trainIcon} alt="" className={classes.img} />
        </div>
        <div className={classes.number}>{trainNumber}</div>
        <div className={classes.cities}>
          <p className={classes.initial}>{departureCityFrom} ➔</p>
          <p className={classes.from}>{departureCityFrom} ➔</p>
          <p className={classes.to}>{departureCityTo}</p>
        </div>
      </div>
      <div className={classes["time-box"]}>
        <div className={classes["departure-box"]}>
          <div className={classes["departure-box__from"]}>
            <div className={classes.time}>
              {new Date(departureFromTime*1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </div>
            <div className={classes.city}>{departureCityFrom}</div>
            <div className={classes.station}>{departureStationFrom}</div>
          </div>

          <div className={classes.direction}>
            <div className={classes.duration}>{convertSecondsToTime(departureDuration)}</div>
            <img src={arrowRight} alt="" className={classes.arrow} />
          </div>

          <div className={classes["departure-box__to"]}>
            <div className={classes.time}>
              {new Date(departureToTime*1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </div>
            <div className={classes.city}>{departureCityTo}</div>
            <div className={classes.station}>{departureStationTo}</div>
          </div>
        </div>

        <div className={classes["arrival-box"]}>
          {arrivalCityFrom && (
            <>
             <div className={classes["arrival-box__from"]}>
            <p className={classes.time}>
            {arrivalFromTime ? new Date(arrivalFromTime*1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
            </p>
            <p className={classes.city}>{arrivalCityFrom}</p>
            <p className={classes.station}>{arrivalStationFrom}</p>
          </div>

          <div className={classes.direction}>
            <p className={classes.duration}>{arrivalDuration && convertSecondsToTime(arrivalDuration)}</p>
            <img src={arrowLeft} alt="" className={classes.arrow} />
          </div>

          <div className={classes["arrival-box__to"]}>
            <p className={classes.time}>
            {arrivalToTime ? new Date(arrivalToTime*1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
            </p>
            <p className={classes.city}>{arrivalCityTo}</p>
            <p className={classes.station}>{arrivalStationTo}</p>
          </div>
            </>
          )} 
        </div>
      </div>

      <div className={classes["price-box"]}>
        {seats_info && Object.keys(seats_info).map((classType) => {
          return (
            <div className={classes["type-box"]} key={classType}>
              <div className={classes.type}>{types[classType as SeatType]}</div>
              <div className={classes.quantity}>{seats_info[classType]}</div>
              <div className={classes.price}><span>от </span> 
                <span className={classes.amount}>
                {formattedPrice(price_info[classType]?.bottom_price) ?? '—'}
                </span>
                <span className={classes.ruble}>₽</span>
              </div>
            </div>
          );
        })}
        <div className={classes.tripple}>
          <img src={icons} alt="" />
        </div>
        <button type="button" className={classes.button} onClick={onSelect} >
          Выбрать места
        </button>
      </div>
    </article>
  );
};
