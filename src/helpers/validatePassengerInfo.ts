import { PersonInfo } from "../types/IPassengers";

export const validateName = (name: string): string | null => {
    const nameRegex = /^[a-zA-Zа-яА-Я]+(-[a-zA-Zа-яА-Я]+)*$/;
    if (name.trim() === "") {
      return `Поля "Имя" и "Фамилия" обязательны для заполнения.`;
    }
    if (!nameRegex.test(name)) {
      return "Имя и фамилия могут содержать только буквы и дефис (для двойных фамилий).";
    }
    return null;
  };

export const validatePassportSeries = (series: string): string | null => {
  // Проверка, что серия паспорта состоит из 4 цифр
  const seriesRegex = /^\d{4}$/;
  return series.trim().length !== 4 || !seriesRegex.test(series)
    ? "Серия паспорта должна состоять из 4 цифр."
    : null;
};

export const validatePassportNumber = (number: string): string | null => {
  // Проверка, что номер паспорта состоит из 6 цифр
  const numberRegex = /^\d{6}$/;
  return number.trim().length !== 6 || !numberRegex.test(number)
    ? "Номер паспорта должен состоять из 6 цифр."
    : null;
};

export const validateBirthday = (birthday: string): string | null => {
  return birthday.trim() === "" ? `Поле "Дата рождения" обязательно для заполнения.` : null;
};

export const validateDocumentData = (documentData: string): string | null => {
  return documentData.trim() === "" ? "Это поле обязательно для заполнения." : null;
};

export const validateBirthCertificate = (certificate: string): string | null => {
  const sanitizedCertificate = certificate.replace(/[-\s]/g, "");
  const regex = /^(?:[IVX]+[А-Я]{2})(\d{6})$/i;
  return regex.test(sanitizedCertificate)
    ? null
    : `Номер свидетельства о рождении указан некорректно. Пример: VIII-ЫП-123456`;
};

export const validateForm = (personInfo: PersonInfo, passportSeries: string, passportNumber: string) => {
  const errors: { [key: string]: string | null } = {};

  errors.first_name = validateName(personInfo.first_name);
  errors.last_name = validateName(personInfo.last_name);
  errors.birthday = validateBirthday(personInfo.birthday);

  if (personInfo.document_type === "passport") {
    errors.passportSeries = validatePassportSeries(passportSeries);
    errors.passportNumber = validatePassportNumber(passportNumber);
  } else if (personInfo.document_type === "birth_certificate") {
    errors.document_data = validateBirthCertificate(personInfo.document_data);
  } else {
    errors.document_data = validateDocumentData(personInfo.document_data);
  }

  return errors;
};
