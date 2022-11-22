import {format} from 'date-fns';
import {useEffect, useRef, useState} from 'react';

const HOURS_MINUTES = 'HH:mm';
const SECONDS = 's';

const getCurrentTime = (pattern: string = HOURS_MINUTES) =>
    format(new Date(), pattern);

export const useCurrentTime = (debug?: true) => {
  const prevTime = useRef<string>(getCurrentTime());
  const timer = useRef<NodeJS.Timeout | null>(null);

  const [currentTime, setCurrentTime] = useState(() => getCurrentTime());

  const [seconds, setSeconds] = useState<number>(() =>
      parseInt(getCurrentTime(SECONDS))
  );

  useEffect(() => {
    if (!timer.current) {
      timer.current = setInterval(() => {
        const nextTime = getCurrentTime();

        if (nextTime !== prevTime.current) {
          prevTime.current = nextTime;
          setCurrentTime(nextTime);
        }

        if (debug) {
          setSeconds(parseInt(getCurrentTime(SECONDS)));
        }
      }, 1000);
    }
  }, []);

  useEffect(() => {
    if (debug) {
      console.log('SECONDS:', seconds);
    }
  }, [seconds, debug])

  return currentTime;
};
