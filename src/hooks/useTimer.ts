import { useRef, useState } from "react";

export const useTimer = () => {
    const [time, setTime] = useState<number>(0);
    const timerRef = useRef<ReturnType<typeof setInterval>>();

    const startTimer = () => timerRef.current = setInterval(() => setTime(prev => prev + 1), 1000);

    const endTimer = () => clearInterval(timerRef.current);

    const resetTimer = () => setTime(0);

    return { time, startTimer, endTimer, resetTimer };
}