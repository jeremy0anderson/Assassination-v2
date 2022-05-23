import { useEffect, useState } from 'react';
//This is the Timer
export const Timer = () => {
    const [countDown, setCountDown] = useState(0);
    const [runTimer, setRunTimer] = useState(false);

    //if runTimer is called count down is set to 5 min
    useEffect(() => {
        let timerId;
        if (runTimer) {
            setCountDown(60 * 5);
            timerId = setInterval(() => {
                setCountDown((countDown) => countDown - 1);
            }, 1000);
        } else {
            clearInterval(timerId);
        }

        return () => clearInterval(timerId);
    }, [runTimer]);

    //checks is timer is is running and less than zero and changes the states
    useEffect(() => {
        if (countDown < 0 && runTimer) {
            console.log("expired");
            setRunTimer(false);
            setCountDown(0);
        }
    }, [countDown, runTimer]);

    const startTimer = () => setRunTimer((t) => !t);

    const seconds = String(countDown % 60).padStart(2, 0);
    const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);

    return (
        <div className="timer">
            <div>
                Time: {minutes}:{seconds}
            </div>
            <button onClick={startTimer}>
                {runTimer ? "Stop" : "Start"}
            </button>
        </div>

    );
};

