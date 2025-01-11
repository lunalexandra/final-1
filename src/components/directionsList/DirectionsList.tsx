import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Filter } from "../filter";
import {
  fetchDirections,
  clearDirections,
} from "../../redux/slices/directionsSlice";
import { RootState } from "../../redux/store";
import { LoadingPage } from "../loadingPage/LoadingPage";
import { TrainInfo } from "../../types/TrainInfo";
import { SeatsPage } from "../seatsPage/SeatsPage";
import { TrainCard } from "./trainCard/TrainCard";
import { SortBlock } from "./sortBlock/SortBlock";
import { Pagination } from "./pagination/Pagination";
import classes from "./directionsList.module.css";

const DirectionsList: React.FC = () => {
  const dispatch = useAppDispatch();

  const [currentView, setCurrentView] = useState<"directions" | "seats">(
    "directions"
  );
  const [selectedDirection, setSelectedDirection] = useState<TrainInfo | null>(
    null
  );

  const showSeats = (direction: TrainInfo) => {
    setSelectedDirection(direction);
    setCurrentView("seats");
  };

  const goBackToDirections = () => {
    setCurrentView("directions");
    setSelectedDirection(null);
  };

  const { directions, total_count, loading, error } = useAppSelector(
    (state: RootState) => state.directions
  );
  const { fromCity, toCity } = useAppSelector(
    (state: RootState) => state.cities
  );

  const { date_end, date_start } = useAppSelector(
    (state: RootState) => state.dates
  );

  const {
    have_first_class,
    have_second_class,
    have_third_class,
    have_fourth_class,
    have_wifi,
    have_express,
    price_from,
    price_to,
    start_departure_hour_from,
    start_departure_hour_to,
    start_arrival_hour_from,
    start_arrival_hour_to,
    end_departure_hour_from,
    end_departure_hour_to,
    end_arrival_hour_from,
    end_arrival_hour_to,
  } = useAppSelector((state: RootState) => state.filters);

  const { sort, limit, offset } = useAppSelector(
    (state: RootState) => state.sort
  );

  useEffect(() => {
    if (fromCity && toCity) {
      dispatch(fetchDirections(""));
      console.log(
        `Названия городов в направлениях: ${fromCity._id}, ${toCity._id}`
      );
    } else {
      console.error("Города не выбраны.");
    }

    return () => {
      dispatch(clearDirections());
    };
  }, [
    dispatch,
    fromCity,
    toCity,
    date_end,
    date_start,
    have_first_class,
    have_second_class,
    have_third_class,
    have_fourth_class,
    have_wifi,
    have_express,
    price_from,
    price_to,
    start_departure_hour_from,
    start_departure_hour_to,
    start_arrival_hour_from,
    start_arrival_hour_to,
    end_departure_hour_from,
    end_departure_hour_to,
    end_arrival_hour_from,
    end_arrival_hour_to,
    sort,
    limit,
    offset,
  ]);

  if (loading && fromCity._id && toCity._id) {
    return <LoadingPage />;
}

  if (error) {
    console.log(error);
    return (
      <>
        <aside>
          <Filter />
        </aside>
        <main>
          Произошла ошибка при загрузке направлений. Пожалуйста, попробуйте
          позже.
        </main>
      </>
    );
  }

  return (
    <>
      <aside>
        <Filter />
      </aside>
      <main className={classes["container"]}>
        {currentView === "directions" ? (
          <>
            <SortBlock />
            {total_count === 0 ? null : (
              <div className={classes.list}>
                {directions.map((direction: TrainInfo) => (
                  <TrainCard
                    key={`${direction.departure.from.datetime}`}
                    trainNumber={direction.departure.train.name}
                    departureCityFrom={direction.departure.from.city.name}
                    departureCityTo={direction.departure.to.city.name}
                    departureFromTime={direction.departure.from.datetime}
                    departureStationFrom={
                      direction.departure.from.railway_station_name
                    }
                    departureDuration={direction.departure.duration}
                    departureToTime={direction.departure.to.datetime}
                    departureStationTo={
                      direction.departure.to.railway_station_name
                    }
                    arrivalCityFrom={direction.arrival?.from.city.name}
                    arrivalCityTo={direction.arrival?.to.city.name}
                    arrivalFromTime={direction.arrival?.from.datetime}
                    arrivalStationFrom={
                      direction.arrival?.from.railway_station_name
                    }
                    arrivalDuration={direction.arrival?.duration}
                    arrivalToTime={direction.arrival?.to.datetime}
                    arrivalStationTo={
                      direction.arrival?.to.railway_station_name
                    }
                    seats_info={direction.available_seats_info}
                    price_info={direction.departure.price_info}
                    onSelect={() => showSeats(direction)} // Передаем функцию для выбора направления
                  />
                ))}
              </div>
            )}
            <Pagination />
          </>
        ) : (
          <>
            <main>
                <SeatsPage
              direction={selectedDirection}
              onBackToDirections={goBackToDirections} // Передаем функцию для возврата к списку направлений
            />
            </main>
          </>
        )}
      </main>
    </>
  );
};

export default DirectionsList;
