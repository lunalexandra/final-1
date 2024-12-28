const fetchLastTickets = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/routes/last`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };
  
  export { fetchLastTickets };
  