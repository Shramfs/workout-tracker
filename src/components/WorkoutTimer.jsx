import React, { useState, useEffect } from 'react';
import './WorkoutTimer.css';

const WorkoutTimer = () => {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [lastExercise, setLastExercise] = useState(null);
  const [restTime, setRestTime] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime(time => time + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const calculateRestTime = (exerciseType) => {
    // Basic rest time calculator based on exercise type
    const restTimes = {
      'strength': 180, // 3 minutes for strength training
      'cardio': 120,   // 2 minutes for cardio
      'hiit': 60,      // 1 minute for HIIT
      'default': 90    // 1.5 minutes default
    };
    return restTimes[exerciseType] || restTimes.default;
  };

  const startTimer = () => {
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(0);
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleExerciseComplete = (type) => {
    setLastExercise(type);
    const recommendedRest = calculateRestTime(type);
    setRestTime(recommendedRest);
    resetTimer();
  };

  return (
    <div className="workout-timer">
      <div className="timer-display">
        <h3>Workout Timer</h3>
        <div className="time">{formatTime(time)}</div>
        <div className="timer-controls">
          {!isActive ? (
            <button onClick={startTimer} className="start-btn">Start</button>
          ) : (
            <button onClick={pauseTimer} className="pause-btn">Pause</button>
          )}
          <button onClick={resetTimer} className="reset-btn">Reset</button>
        </div>
      </div>

      <div className="exercise-complete">
        <h4>Complete Exercise:</h4>
        <div className="exercise-buttons">
          <button onClick={() => handleExerciseComplete('strength')}>Strength</button>
          <button onClick={() => handleExerciseComplete('cardio')}>Cardio</button>
          <button onClick={() => handleExerciseComplete('hiit')}>HIIT</button>
        </div>
      </div>

      {restTime > 0 && (
        <div className="rest-timer">
          <h4>Recommended Rest Time:</h4>
          <p>{formatTime(restTime)}</p>
        </div>
      )}
    </div>
  );
};

export default WorkoutTimer; 