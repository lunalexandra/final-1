import { useState} from "react";
import classes from "./selectDocument.module.css";

interface SelectDocumentProps {
  value: string; // Значение выбранного документа
  onChange: (value: string) => void; // Обработчик изменения
  options: { value: string; label: string }[]; // Доступные варианты документов
}

export const SelectDocument: React.FC<SelectDocumentProps> = ({
    value,
    onChange,
    options = [{ value: "passport", label: "Паспорт РФ" }],
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
      <div className={classes.document}>
        {!isOpen && (
          <div onClick={toggleSelect} style={{ cursor: "pointer" }} className={classes.select}>
            {options.find((option) => option.value === value)?.label || "Паспорт РФ"} <span>▼</span>
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
  