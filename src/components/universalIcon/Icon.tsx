import React, { useState } from "react";

interface IconProps {
  normalSrc: string;  //  путь к обычной иконке
  activeSrc?: string;  // путь к иконке при клике
  hoverSrc?: string;   // путь к иконке при наведении
  alt: string; // Альт-текст для изображения
  classname: string;        
}

const Icon: React.FC<IconProps> = ({ normalSrc, activeSrc, hoverSrc, alt, classname}) => {
  const [isActive, setIsActive] = useState(false);  
  const [isHovered, setIsHovered] = useState(false); 

  const handleClick = () => {
    setIsActive(true);  

    
    setTimeout(() => {
      setIsActive(false);
    }, 1000);
  };


  const getIconSrc = () => {
    if (isActive && activeSrc) {
      return activeSrc;
    }
    if (isHovered && hoverSrc) {
      return hoverSrc;
    }
    return normalSrc;
  };

  return (
    <img
      src={getIconSrc()}
      alt={alt}
      onClick={handleClick} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={classname}
    />
  );
};

export default Icon;
