import { UserInfo } from "../types/IPassengers";

export const validateName = (name: string): string | null => {
    const nameRegex = /^[a-zA-Zа-яА-Я]+(-[a-zA-Zа-яА-Я]+)*$/;
    if (name.trim() === "") {
      return `Поле обязательно для заполнения.`;
    }
    if (!nameRegex.test(name)) {
      return "Имя и фамилия могут содержать только буквы и дефис (для двойных фамилий).";
    }
    return null;
};

export const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
        return "Email обязательный для заполнения.";
    }
    if (!emailRegex.test(email.trim())) {
        return "Неверный формат email.";
    }
    return null;
};

export const validatePhoneNumber = (phone: string): string | null => {
    const phoneRegex = /^(?:\+7|8)[0-9]{10}$/;
    if (!phone.trim()) {
        return "Номер телефона обязательный для заполнения.";
    }
    if (!phoneRegex.test(phone)) {
        return "Номер телефона должен быть в формате +7XXXXXXXXXX или 8XXXXXXXXXX.";
    }
    return null;
};

export const validateUserForm = (UserInfo: UserInfo) => {
  const errors: { [key: string]: string | null } = {};
  errors.first_name = validateName(UserInfo.first_name);
  errors.last_name = validateName(UserInfo.last_name);
  errors.email = validateEmail(UserInfo.email);
  errors.phone = validatePhoneNumber(UserInfo.phone);
  return errors;
};
