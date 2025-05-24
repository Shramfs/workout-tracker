import React, { useState, useEffect } from 'react';
import './WorkoutTracker.css';

const WorkoutTracker = () => {
  const [workouts, setWorkouts] = useState(() => {
    const saved = localStorage.getItem('workouts');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [newWorkout, setNewWorkout] = useState({
    exercise: '',
    sets: '',
    reps: '',
    weight: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }, [workouts]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWorkout(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newWorkout.exercise || !newWorkout.sets || !newWorkout.reps) {
      alert('Please fill in all required fields');
      return;
    }
    setWorkouts(prev => [...prev, { ...newWorkout, id: Date.now() }]);
    setNewWorkout({
      exercise: '',
      sets: '',
      reps: '',
      weight: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const deleteWorkout = (id) => {
    setWorkouts(prev => prev.filter(workout => workout.id !== id));
  };

  return (
    <div className="workout-tracker">
      <h1>Workout Tracker</h1>
      
      <form onSubmit={handleSubmit} className="workout-form">
        <div className="form-group">
          <label>Exercise:</label>
          <input
            type="text"
            name="exercise"
            value={newWorkout.exercise}
            onChange={handleInputChange}
            placeholder="e.g., Bench Press"
          />
        </div>

        <div className="form-group">
          <label>Sets:</label>
          <input
            type="number"
            name="sets"
            value={newWorkout.sets}
            onChange={handleInputChange}
            placeholder="3"
          />
        </div>

        <div className="form-group">
          <label>Reps:</label>
          <input
            type="number"
            name="reps"
            value={newWorkout.reps}
            onChange={handleInputChange}
            placeholder="12"
          />
        </div>

        <div className="form-group">
          <label>Weight (kg):</label>
          <input
            type="number"
            name="weight"
            value={newWorkout.weight}
            onChange={handleInputChange}
            placeholder="50"
          />
        </div>

        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={newWorkout.date}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="add-button">Add Workout</button>
      </form>

      <div className="workouts-list">
        <h2>Your Workouts</h2>
        {workouts.map(workout => (
          <div key={workout.id} className="workout-card">
            <h3>{workout.exercise}</h3>
            <p>Sets: {workout.sets}</p>
            <p>Reps: {workout.reps}</p>
            {workout.weight && <p>Weight: {workout.weight}kg</p>}
            <p>Date: {workout.date}</p>
            <button 
              onClick={() => deleteWorkout(workout.id)}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutTracker; 