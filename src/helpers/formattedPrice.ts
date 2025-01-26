export const formattedPrice = (price: number | undefined | null) => {
    if (typeof price !== 'number' || isNaN(price)) {
      return ' — ';
    }
    return new Intl.NumberFormat('ru-RU').format(price);
  };