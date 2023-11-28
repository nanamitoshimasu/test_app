import React, { useState, useRef } from 'react';

function Stopwatch() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    function handleStart() {
        setIsRunning(true);
        intervalRef.current = setInterval(() => {
            setTime(prevTime => prevTime + 60000);
        }, 60000);
    }

    function handlePause() {
        clearInterval(intervalRef.current);
        setIsRunning(false);
    }

    function handleReset() {
        clearInterval(intervalRef.current);
        setIsRunning(false);
        setTime(0);
    }

    const minutes = `0${Math.floor(time / 60000) % 60}`.slice(-2);
    const hours = `0${Math.floor(time / 3600000)}`.slice(-2);

    return (
        <div>
            <h1>Stopwatch</h1>
            <p>{hours}時間{minutes}分</p>
            {isRunning ? (
                <button onClick={handlePause}>ストップ</button>
            ) : (
                <button onClick={handleStart}>スタート</button>
            )}
            <button onClick={handleReset}>リセット</button>
        </div>
    );
}

export default Stopwatch;
