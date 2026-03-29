import { differenceInMilliseconds } from "date-fns";
import { useEffect, useState } from "react";

type TargetDate = Date;

export const useCountdownTimer = (targetDate: TargetDate): any => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isClosed, setIsClosed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();

      const countDown = differenceInMilliseconds(
        new Date(targetDate),
        currentDate
      );

      if (countDown < 0) {
        setIsClosed(true);
        clearInterval(interval);
      } else {
        setIsClosed(false);
        const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (countDown % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((countDown / 1000) % 60);

        setDays(days);
        setMinutes(minutes);
        setHours(hours);
        setSeconds(seconds);
      }
      setIsLoading(false);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return {
    days,
    isClosed,
    minutes,
    hours,
    seconds,
    isLoading,
  };
};
