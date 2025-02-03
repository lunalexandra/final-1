import { useAppDispatch, useAppSelector } from "../../hooks";
import { toggleFilter } from "../../redux/slices/filterSlice";
import "./toggleSwitch.css";

interface ToggleSwitchProps {
  filterType: | "have_first_class"
  | "have_second_class"
  | "have_third_class"
  | "have_fourth_class"
  | "have_wifi"
  | "have_express";
  label: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ filterType, label }) => {
  const dispatch = useAppDispatch();
  
  const isChecked = useAppSelector((state) => {
    const filterValue = state.filters[filterType];
    return typeof filterValue === 'boolean' ? filterValue : false;
  });

  const handleChange = () => {
    dispatch(toggleFilter(filterType));
  };

  return (
    <div className="toggle-switch-container">
      <div className="toggle-switch__title">
        {label}
      </div>
      <label className="toggle-switch">
        <input
          id={label}
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
        />
        <span className="toggle-switch__slider"></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
