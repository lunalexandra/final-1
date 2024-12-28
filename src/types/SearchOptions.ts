export interface City {
  _id: string;
  name: string;
}

export interface SearchOptions {
 //from_city_id: string; // Обязательный идентификатор города отправления
  //to_city_id: string; // Обязательный идентификатор города назначения
  date_start?: string; // Дата отбытия туда (в формате YYYY-MM-DD)
  date_end?: string; // Дата отбытия обратно (в формате YYYY-MM-DD)
  date_start_arrival?: string; // Дата прибытия туда (в формате YYYY-MM-DD)
  date_end_arrival?: string; // Дата прибытия обратно (в формате YYYY-MM-DD)
  have_first_class?: boolean; // Люкс (true/false)
  have_second_class?: boolean; // Купе (true/false)
  have_third_class?: boolean; // Плацкарт (true/false)
  have_fourth_class?: boolean; // Сидячее место (true/false)
  have_wifi?: boolean; // Имеется WiFi (true/false)
  have_air_conditioning?: boolean; // Имеется кондиционер (true/false)
  have_express?: boolean; // Экспресс (true/false)
  price_from?: number; // Цена от
  price_to?: number; // Цена до
  start_departure_hour_from?: number; // Час отбытия от
  start_departure_hour_to?: number; // Час отбытия до
  start_arrival_hour_from?: number; // Час прибытия от
  start_arrival_hour_to?: number; // Час прибытия до
  end_departure_hour_from?: number; // Час отбытия назад от
  end_departure_hour_to?: number; // Час отбытия назад до
  end_arrival_hour_from?: number; // Час прибытия назад от
  end_arrival_hour_to?: number; // Час прибытия назад до
  limit?: number; // Количество результатов на странице
  offset?: number; // Количество результатов, которое необходимо пропустить в выдаче
  sort?: "date" | "min-price" | "duration"; // Сортировка результатов
}
