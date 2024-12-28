export interface ILastTickets {
  departure: {
    _id: string
    from: {
      city: {
        _id: string;
        name: string;
      }
      railway_station_name: string
    }
    to: {
      city: {
        _id: string;
        name: string;
      }
      railway_station_name: string
    }
    min_price: number
  }
}