import React, { useState, useEffect } from 'react'
import WorkoutTracker from './components/WorkoutTracker'
import WeeklyPlanner from './components/WeeklyPlanner'
import WorkoutTimer from './components/WorkoutTimer'
import ProgressChart from './components/ProgressChart'
import './App.css'

function App() {
  const [workouts, setWorkouts] = useState(() => {
    const saved = localStorage.getItem('workouts');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }, [workouts]);

  return (
    <div className="App">
      <header className="app-header">
        <h1>Shram's Workouts</h1>
        <p className="subtitle">Track your fitness journey</p>
      </header>
      <div className="content">
        <div className="main-section">
          <WorkoutTracker workouts={workouts} setWorkouts={setWorkouts} />
          <WorkoutTimer />
        </div>
        <ProgressChart workouts={workouts} />
        <WeeklyPlanner />
      </div>
    </div>
  )
}

export default App
