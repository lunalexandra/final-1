export const formatTime = (value: number) => {
    const hours = Math.floor(value);
    const minutes = Math.round((value - hours) * 60);
    return `${String(hours)}:${String(minutes).padStart(2, '0')}`;
  };