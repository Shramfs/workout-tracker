import React, { useState, useEffect } from 'react';
import './WeeklyPlanner.css';

const WeeklyPlanner = () => {
  const [weeklyPlan, setWeeklyPlan] = useState(() => {
    const saved = localStorage.getItem('weeklyPlan');
    return saved ? JSON.parse(saved) : {
      Monday: { exercises: [], notes: '' },
      Tuesday: { exercises: [], notes: '' },
      Wednesday: { exercises: [], notes: '' },
      Thursday: { exercises: [], notes: '' },
      Friday: { exercises: [], notes: '' },
      Saturday: { exercises: [], notes: '' },
      Sunday: { exercises: [], notes: '' }
    };
  });

  const [selectedDay, setSelectedDay] = useState('Monday');
  const [newExercise, setNewExercise] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    localStorage.setItem('weeklyPlan', JSON.stringify(weeklyPlan));
  }, [weeklyPlan]);

  const addExercise = (e) => {
    e.preventDefault();
    if (!newExercise.trim()) return;

    setWeeklyPlan(prev => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        exercises: [...prev[selectedDay].exercises, newExercise]
      }
    }));
    setNewExercise('');
  };

  const removeExercise = (day, index) => {
    setWeeklyPlan(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        exercises: prev[day].exercises.filter((_, i) => i !== index)
      }
    }));
  };

  const updateNotes = (day, notes) => {
    setWeeklyPlan(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        notes
      }
    }));
  };

  return (
    <div className="weekly-planner">
      <h2>Weekly Workout Plan</h2>
      <div className="days-container">
        {Object.keys(weeklyPlan).map(day => (
          <button
            key={day}
            className={`day-button ${selectedDay === day ? 'active' : ''}`}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="day-plan">
        <h3>{selectedDay}'s Workout</h3>
        
        <form onSubmit={addExercise} className="exercise-form">
          <input
            type="text"
            value={newExercise}
            onChange={(e) => setNewExercise(e.target.value)}
            placeholder="Add exercise..."
            className="exercise-input"
          />
          <button type="submit" className="add-exercise-btn">Add</button>
        </form>

        <div className="exercises-list">
          {weeklyPlan[selectedDay].exercises.map((exercise, index) => (
            <div key={index} className="exercise-item">
              <span>{exercise}</span>
              <button
                onClick={() => removeExercise(selectedDay, index)}
                className="remove-exercise-btn"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="notes-section">
          <h4>Notes</h4>
          <textarea
            value={weeklyPlan[selectedDay].notes}
            onChange={(e) => updateNotes(selectedDay, e.target.value)}
            placeholder="Add notes for this day..."
            className="notes-input"
          />
        </div>
      </div>
    </div>
  );
};

export default WeeklyPlanner; 