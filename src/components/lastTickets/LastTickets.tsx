import { useEffect, useState } from "react";
import { fetchLastTickets } from "../../api/fetchLastTickets";
import { LastTicketsCard } from "./lastTicketsCard/LastTicketsCard";
import { ILastTickets } from "../../types/ILastTickets";

const LastTickets: React.FC = () => {
  const [tickets, setTickets] = useState<ILastTickets[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const updateTickets = async () => {
    setLoading(true);
    try {
      const data = await fetchLastTickets();
      if (data) {
        setTickets(data);
      } else {
        setTickets([]);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error("An unknown error occurred"));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateTickets();

    const intervalId = setInterval(() => {
      updateTickets();
    }, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {tickets.length > 0 ? (
        tickets.map((ticket) => (
          <LastTicketsCard
            key={ticket.departure._id}
            cityFrom={ticket.departure.from.city.name}
            cityTo={ticket.departure.to.city.name}
            stationFrom={ticket.departure.from.railway_station_name}
            stationTo={ticket.departure.to.railway_station_name}
            price={ticket.departure.min_price}
          />
        ))
      ) : (
        <div>No tickets available.</div>
      )}
    </>
  );
};

export default LastTickets;
