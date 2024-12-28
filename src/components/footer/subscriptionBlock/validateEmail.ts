  // Функция для валидации email
  export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Регулярное выражение для email
    return emailRegex.test(email.trim());
  };