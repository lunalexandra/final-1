import { useState, useEffect, useRef } from "react";
import { RootState } from "../../redux/store";
import {
  setFromCity,
  setToCity,
  clearSuggestions,
  fetchDepartureSuggestions,
  fetchDestinationSuggestions,
} from "../../redux/slices/citySlice";
import { useAppSelector, useAppDispatch } from "../../hooks";
import "./cityInput.css";

interface CityInputProps {
  type: "fromCity" | "toCity";
  idForLabel: string;
}

const CityInput: React.FC<CityInputProps> = ({ type, idForLabel }) => {
  const dispatch = useAppDispatch();

  const value = useAppSelector((state: RootState) =>
    type === "fromCity" ? state.cities.fromCity : state.cities.toCity
  );
  const suggestions = useAppSelector((state: RootState) =>
    type === "fromCity"
      ? state.cities.departureSuggestions
      : state.cities.destinationSuggestions
  );
  const loading = useAppSelector((state: RootState) =>
    type === "fromCity"
      ? state.cities.loadingFromCity
      : state.cities.loadingToCity
  );

  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestionsRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (type === "fromCity") {
      dispatch(setFromCity({ name: newValue, _id: "" }));
    } else {
      dispatch(setToCity({ name: newValue, _id: "" }));
    }

    if (newValue.length >= 2) {
      if (type === "fromCity") {
        dispatch(fetchDepartureSuggestions(newValue));
      } else {
        dispatch(fetchDestinationSuggestions(newValue));
      }
      setShowSuggestions(true); 
    } else {
      dispatch(clearSuggestions());
      setShowSuggestions(false); 
    }
  };

  const handleSuggestionClick = (city: { name: string; _id: string }) => {
    if (type === "fromCity") {
      dispatch(setFromCity(city));
    } else {
      dispatch(setToCity(city));
    }
    dispatch(clearSuggestions());
    setShowSuggestions(false); 
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      suggestionsRef.current &&
      !suggestionsRef.current.contains(event.target as Node)
    ) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="city-input-container" ref={suggestionsRef}>
      <input
        id={idForLabel}
        type="text"
        value={value.name}
        onChange={handleInputChange}
        className={type === "fromCity" ? "input-from" : "input-to"}
        placeholder={type === "fromCity" ? "Откуда" : "Куда"}
      />
      {loading && (
        <p
          style={{ position: "absolute", color: "#928f94", paddingTop: "4px" }}
        >
          Поиск...
        </p>
      )}
      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-container">
          {suggestions.map((city) => (
            <div
              key={city._id}
              className={
                type === "fromCity"
                  ? "suggestion-item suggestion-item-from"
                  : "suggestion-item suggestion-item-to"
              }
              onClick={() => handleSuggestionClick(city)}
            >
              {city.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CityInput;