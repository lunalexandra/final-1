export interface Seats {
  coach: {
    _id: string; // Идентификатор вагона
    name: string; // Название вагона
    class_type: string; // Тип вагона
    have_first_class: boolean; // Люкс
    have_second_class: boolean; // Купе
    have_third_class: boolean; // Плацкарт
    have_fourth_class: boolean; // Сидячее место
    have_wifi: boolean; // Имеется WiFi
    have_air_conditioning: boolean; // Имеется кондиционер
    have_express: boolean; // Экспресс
    price: number; // Цена за место (Люкс)
    top_price: number; // Цена верхнего места
    bottom_price: number; // Цена нижнего места
    side_price: number; // Цена бокового места
    linens_price: number; // Цена постельного белья
    wifi_price: number; // Цена услуги Wi-Fi
    available_seats: number; // Количество свободных мест в вагоне
    is_linens_included: boolean; // Включена ли стоимость белья в стоимость билета
  };
seats: [{
      index: number; // Номер места в вагоне
      available: boolean; // Место доступно для бронирования
    }];
  // Информация о посадочных местах
}

export interface SeatsResponse {
  carriages: Seats[]; // Массив вагонов с информацией о местах
}
