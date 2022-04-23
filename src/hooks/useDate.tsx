import { useEffect, useState } from "react";

const useDate = (timeZone: string) => {
  const locale = "en";
  const [today, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const day = today.toLocaleDateString(locale, { weekday: "long" });
  const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, {
    month: "long",
  })} ${today.getFullYear()}`;

  const time = today.toLocaleTimeString(locale, {
    timeZone,
    hour: "numeric",
    hour12: true,
    minute: "numeric",
  });

  const hours = today.getHours();

  return [date, time, hours];
};

export default useDate;
