import { useState } from "react";
import classes from "./selectAge.module.css";

interface SelectAgeProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

export const SelectAge: React.FC<SelectAgeProps> = ({
  value,
  onChange,
  options,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSelect = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={classes.age}>
      {!isOpen && (
        <div onClick={toggleSelect} style={{ cursor: "pointer" }} className={classes.select}>
          {options.find((option) => option.value === value)?.label || "Выберите..."} <span>▼</span>
        </div>
      )}
      
      {isOpen && (
        <div className={classes.optionsContainer}>
          {options.map((option) => (
            <div
              className={classes.option}
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              style={{ cursor: "pointer", padding: "5px" }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
