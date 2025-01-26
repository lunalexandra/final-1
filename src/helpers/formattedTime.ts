export const formattedTime = (date: number | Date): string => {
    if (typeof date === "number" && !isNaN(date)) {
      const time = new Date(date * 1000).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });
      return time;
    } else if (date instanceof Date && !isNaN(date.getTime())) {
      const time = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });
      return time;
    } else {
      return "";
    }
  };

  