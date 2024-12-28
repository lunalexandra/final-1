export const subscribeEmail = async (email: string): Promise<void> => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/subscribe?email=${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
  
      if (!response.ok) {
        throw new Error("Ошибка при подписке");
      }
    } catch (error) {
      console.error("Ошибка в API subscribeEmail:", error);
      throw error;
    }
  };
  