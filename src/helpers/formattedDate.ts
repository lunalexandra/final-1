export const formattedDate = (date: number | Date): string => {
    if ((typeof date === "number" && !isNaN(date)) || (date instanceof Date && !isNaN(date.getTime()))) {
      const dateObj = typeof date === "number" ? new Date(date * 1000) : date;
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const day = String(dateObj.getDate()).padStart(2, "0");
      return `${day}.${month}.${year}`;
    }
    return ""; 
  };
  