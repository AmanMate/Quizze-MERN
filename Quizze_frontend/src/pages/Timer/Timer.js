import React, { useState } from 'react';
import './Timer.css';

const TimerComponent = () => {
    const [timerDuration, setTimerDuration] = useState(0);
    const [activeButton, setActiveButton] = useState('off');

    const handleStartTimer = (duration) => {
        setTimerDuration(duration);
        setActiveButton(duration > 0 ? duration + ' sec' : 'off');
        // Start timer logic
    };

    return (
        <div className="Timer-container">
            <div className='timer-option'>
                <h3>Timer</h3>
                <button
                    className={activeButton === 'off' ? 'active' : ''}
                    onClick={() => handleStartTimer(0)}
                >
                    OFF
                </button>
                <button
                    className={activeButton === '5 sec' ? 'active' : ''}
                    onClick={() => handleStartTimer(5)}
                >
                    5 sec
                </button>
                <button
                    className={activeButton === '10 sec' ? 'active' : ''}
                    onClick={() => handleStartTimer(10)}
                >
                    10 sec
                </button>
            </div>
        </div>
    );
};

export default TimerComponent;
