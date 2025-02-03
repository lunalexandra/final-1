import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { PersonInfo } from "../../../types/IPassengers";
import {
  addSeat,
  setPassengerValidation,
  checkAllValidations,
} from "../../../redux/slices/passengersSlise";
import { SelectAge } from "../selectAge/SelectAge";
import { Modal } from "../../modal/Modal";
import { SelectDocument } from "../selectDocument/selectDocument";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { validateForm } from "../../../helpers/validatePassengerInfo";
import tick from "../../../assets/images/passengers/tick.png";
import error from "../../../assets/images/passengers/error.png";
import classes from "./passenger.module.css";

export interface PassengerHandle {
  handleSubmit: (e: React.FormEvent) => void; // Метод теперь принимает React.FormEvent
}

interface PassengerProps {
  number: number;
  seatNumberTo: number;
  seatNumberBack?: number;
  coach_idTo: string;
  coach_idBack?: string;
  onNextPassenger: () => void;
  onDeletePassenger: (number: number) => void;
}

export const Passenger = forwardRef<PassengerHandle, PassengerProps>(
  (
    {
      number,
      seatNumberTo,
      seatNumberBack,
      coach_idTo,
      coach_idBack,
      onDeletePassenger,
      onNextPassenger,
    },
    ref
  ) => {
    const dispatch = useAppDispatch();

    const [personInfo, setPersonInfo] = useState<PersonInfo>({
      is_adult: true,
      first_name: "",
      last_name: "",
      patronymic: "",
      gender: true,
      birthday: "",
      document_type: "passport",
      document_data: "",
    });
    const passengerData = useAppSelector(
      (state) => state.order.order.departure.seats[number - 1]
    );
    const [isExpandedPassenger, setIsExpandedPassenger] =
      useState<boolean>(false);
    const [passportSeries, setPassportSeries] = useState<string>("");
    const [passportNumber, setPassportNumber] = useState<string>("");

    const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
    const [isValid, setIsValid] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const toggleExpandedPassenger = () => {
      setIsExpandedPassenger((prevState) => !prevState);
    };

    const openModal = () => {
      setIsVisible(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setPersonInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
    };

    const handlePassportSeriesChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      setPassportSeries(e.target.value);
      const formErrors = validateForm(
        personInfo,
        e.target.value,
        passportNumber
      );
      setErrors(formErrors);
    };

    const handlePassportNumberChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      setPassportNumber(e.target.value);
      const formErrors = validateForm(
        personInfo,
        passportSeries,
        e.target.value
      );
      setErrors(formErrors);
    };

    const handleSubmit = () => {
      console.log(`Отправка формы для пассажира ${number}`);

      const formErrors = validateForm(
        personInfo,
        passportSeries,
        passportNumber
      );
      setErrors(formErrors);

      if (Object.values(formErrors).some((error) => error !== null)) {
        return;
      }

      setIsValid(true);

      let fullDocumentData;
      if (personInfo.document_type === "passport") {
        fullDocumentData = `${passportSeries} ${passportNumber}`;
      } else {
        fullDocumentData = personInfo.document_data;
      }

      const seatTo = {
        coach_id: coach_idTo || "",
        person_info: { ...personInfo, document_data: fullDocumentData },
        seat_number: seatNumberTo,
        is_child: !personInfo.is_adult,
        include_children_seat: false,
      };
      dispatch(addSeat({ route: "departure", seat: seatTo }));

      if (coach_idBack && seatNumberBack) {
        const seatBack = {
          person_info: { ...personInfo, document_data: fullDocumentData },
          coach_id: coach_idBack,
          seat_number: seatNumberBack,
          is_child: !personInfo.is_adult,
          include_children_seat: false,
        };
        dispatch(addSeat({ route: "arrival", seat: seatBack }));
      }
    };

    const handleSelectChange = (value: string) => {
      setPersonInfo((prevInfo) => ({
        ...prevInfo,
        is_adult: value === "true",
      }));
    };

    const handleSelectDocumentChange = (value: string) => {
      setPersonInfo((prevInfo) => ({
        ...prevInfo,
        document_type: value,
        document_data: "", // Очищаем данные документа при смене типа
      }));

      // Очистить ошибки, связанные с паспортом, если выбран тип документа "Свидетельство о рождении"
      if (value !== "passport") {
        setPassportSeries("");
        setPassportNumber("");
      }
    };

    useEffect(() => {
      if (
        personInfo.document_type === "birth_certificate" &&
        personInfo.is_adult
      ) {
        openModal();
      }
    }, [personInfo.document_type, personInfo.is_adult]);

    useEffect(() => {
      console.log(`00`);
      dispatch(setPassengerValidation({ index: number - 1, isValid }));
      dispatch(checkAllValidations());
    }, [isValid]);

    // useEffect для сброса ошибок, когда меняется тип документа
    useEffect(() => {
      if (personInfo.document_type !== "passport") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          passportSeries: null,
          passportNumber: null,
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          document_data: null,
        }));
      }
    }, [personInfo.document_type]);

    useEffect(() => {
      const formErrors = validateForm(
        personInfo,
        passportSeries,
        passportNumber
      );
      setErrors(formErrors);

      const hasErrors = Object.values(formErrors).some(
        (error) => error !== null
      );
      setIsValid(!hasErrors);
    }, [personInfo, passportSeries, passportNumber]);

    useImperativeHandle(ref, () => ({
      handleSubmit: () => {
        //console.log(`handleSubmit вызван для пассажира ${number}`);
        handleSubmit(); // вызываем handleSubmit, переданный в компонент
      },
    }));

    useEffect(() => {
      if (passengerData) {
        setPersonInfo(passengerData.person_info);

        const [series, number] =
          passengerData.person_info.document_data.split(" ");
        setPassportSeries(series || "");
        setPassportNumber(number || "");
      }
    }, [passengerData]);

    return (
      <>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.topline}>
            <button
              type="button"
              onClick={toggleExpandedPassenger}
              className={isExpandedPassenger ? classes.minus : classes.plus}
            >
              {isExpandedPassenger ? "—" : "+"}
            </button>
            <div className={classes.title}>
              <p>
                Пассажир <span className={classes.number}>{number}</span>
              </p>
            </div>
            <button
              type="button"
              className={classes.cross}
              onClick={() => onDeletePassenger(number)}
            >
              ✖
            </button>
          </div>
          {isExpandedPassenger && (
            <>
              <SelectAge
                value={personInfo.is_adult ? "true" : "false"}
                onChange={handleSelectChange}
                options={[
                  { value: "true", label: "Взрослый" },
                  { value: "false", label: "Детский" },
                ]}
              />
              <div className={classes["complete-name"]}>
                <div className={classes["input-container"]}>
                  <label htmlFor="last_name" className={classes.label}>
                    Фамилия
                  </label>
                  <input
                    id="last_name"
                    type="text"
                    name="last_name"
                    value={personInfo.last_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={classes["input-container"]}>
                  <label htmlFor="first_name" className={classes.label}>
                    Имя
                  </label>
                  <input
                    id="first_name"
                    type="text"
                    name="first_name"
                    value={personInfo.first_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={classes["input-container"]}>
                  <label htmlFor="patronymic" className={classes.label}>
                    Отчество
                  </label>
                  <input
                    id="patronymic"
                    type="text"
                    name="patronymic"
                    value={personInfo.patronymic}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={classes["gender-date-box"]}>
                <div>
                  <p className={classes.label}>Пол</p>
                  <div className={classes["gender-selection"]}>
                    <div
                      className={`${classes["gender-block"]} ${
                        personInfo.gender === true ? classes.selected : ""
                      }`}
                      onClick={() =>
                        setPersonInfo({ ...personInfo, gender: true })
                      }
                    >
                      М
                    </div>
                    <div
                      className={`${classes["gender-block"]} ${
                        personInfo.gender === false ? classes.selected : ""
                      }`}
                      onClick={() =>
                        setPersonInfo({ ...personInfo, gender: false })
                      }
                    >
                      Ж
                    </div>
                  </div>
                </div>

                <div className={classes["date-container"]}>
                  <label htmlFor="birthday" className={classes.label}>
                    Дата рождения
                  </label>
                  <input
                    type="date"
                    name="birthday"
                    value={personInfo.birthday}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={classes.checkbox}>
                <input
                  type="checkbox"
                  id="checkbox-mobility"
                  name="checkbox-mobility"
                />
                <label
                  htmlFor="checkbox-mobility"
                  className={classes["checkbox-label"]}
                >
                  ограниченная подвижность
                </label>
              </div>

              <div className={classes.documents}>
                <div className={classes.type}>
                  <div className={classes.label}>Тип документа</div>
                  <SelectDocument
                    value={personInfo.document_type}
                    onChange={handleSelectDocumentChange}
                    options={[
                      { value: "passport", label: "Паспорт РФ" },
                      {
                        value: "birth_certificate",
                        label: "Свидетельство о рождении",
                      },
                    ]}
                  />
                </div>

                {personInfo.document_type === "passport" ? (
                  <>
                    <div className={classes["passport-series"]}>
                      <label
                        htmlFor="passport-series"
                        className={classes.label}
                      >
                        Серия
                      </label>
                      <input
                        id="passport-series"
                        type="text"
                        value={passportSeries}
                        name="document_data"
                        className={classes["passport-series-input"]}
                        onChange={handlePassportSeriesChange}
                        placeholder="__  __  __  __"
                        required
                      />
                    </div>

                    <div className={classes["passport-number"]}>
                      <label
                        htmlFor="passport-number"
                        className={classes.label}
                      >
                        Номер
                      </label>
                      <input
                        id="passport-number"
                        type="text"
                        name="document_data"
                        value={passportNumber}
                        className={classes["passport-number-input"]}
                        onChange={handlePassportNumberChange}
                        placeholder="__  __  __  __  __  __"
                        required
                      />
                    </div>
                  </>
                ) : (
                  <div className={classes["birth-number"]}>
                    <label htmlFor="birth-number" className={classes.label}>
                      Номер
                    </label>
                    <input
                      id="birth-number"
                      type="text"
                      name="document_data"
                      value={personInfo.document_data}
                      onChange={handleChange}
                      className={classes["birth-number-input"]}
                      placeholder="_ _ _ _ _ _ _ _ _ _ _ _"
                      required
                    />
                  </div>
                )}
              </div>

              {Object.values(errors).some((error) => error !== null) && (
                <div className={classes.error}>
                  <img src={error} alt="" />
                  <p>{Object.values(errors).find((error) => error !== null)}</p>
                </div>
              )}

              {isValid && (
                <div className={classes.end}>
                  <img src={tick} alt="" />
                  <button
                    type="button"
                    className={classes["next-passenger-btn"]}
                    onClick={onNextPassenger}
                  >
                    Следующий пассажир
                  </button>
                </div>
              )}
            </>
          )}
          <Modal
            modalType="info"
            children={<p>Обратите внимание на тип документа</p>}
            isOpen={isVisible}
            onClose={() => setIsVisible(false)}
          />
        </form>
      </>
    );
  }
);
