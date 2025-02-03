export interface UserInfo {
    first_name: string;
    last_name: string;
    patronymic: string;
    phone: string;
    email: string;
    payment_method: "cash" | "online";
  }
  
  export interface PersonInfo {
    is_adult: boolean;
    first_name: string;
    last_name: string;
    patronymic: string;
    gender: boolean; // true для мужчины, false для женщины
    birthday: string; // Формат даты: YYYY-MM-DD
    document_type: string;
    document_data: string;
  }
  
  export interface SeatInfo {
    coach_id: string;
    person_info: PersonInfo;
    seat_number: number;
    is_child: boolean;
    include_children_seat: boolean;
  }
  
  export interface RouteInfo {
    route_direction_id: string;
    seats: SeatInfo[];
  }
  
  export interface OrderRequest {
    user: UserInfo;
    departure: RouteInfo;
    arrival?: RouteInfo;
  }
  