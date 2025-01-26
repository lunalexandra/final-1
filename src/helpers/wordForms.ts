
export const getAdultWord = (number: number): string => {
    if (number === 1) return 'Взрослый';
    return 'Взрослых';
};

// Функция для получения слова для детей
export const getChildWord = (number: number): string => {
    if (number === 1) return 'Ребенок';
    if (number >= 2 && number <= 4) return 'Ребенка';
    return 'Детей';
};

 //родительный падеж
export function declinePassenger(count: number): string {
    if (count % 10 === 1 && count !== 11) {
      return `${count} пассажира`;
    } else {
      return `${count} пассажиров`;
    }
  }
  
  //родительный падеж
  export function declineChild(count: number): string {
    if (count % 10 === 1 && count !== 11) {
      return `${count} ребенка`;
    } else {
      return `${count} детей`;
    }
  }
