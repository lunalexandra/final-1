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
  
    // Функция для переключения открытия/закрытия списка
    const toggleSelect = () => {
      setIsOpen((prev) => !prev);
    };
  
    // Функция для обработки выбора опции
    const handleOptionClick = (optionValue: string) => {
      onChange(optionValue);
      setIsOpen(false);
    };
  
    return (
      <div className={classes.document}>
        {/* Отображаем текущий выбранный документ */}
        {!isOpen && (
          <div onClick={toggleSelect} style={{ cursor: "pointer" }} className={classes.select}>
            {options.find((option) => option.value === value)?.label || "Паспорт РФ"} <span>▼</span>
          </div>
        )}
  
        {/* Список опций, если он открыт */}
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
  