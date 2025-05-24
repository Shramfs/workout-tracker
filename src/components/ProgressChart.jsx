import React, { useState, useEffect } from 'react';
import './ProgressChart.css';

const ProgressChart = ({ workouts }) => {
  const [stats, setStats] = useState({
    daily: { labels: [], data: [] },
    weekly: { labels: [], data: [] },
    monthly: { labels: [], data: [] }
  });

  const [view, setView] = useState('daily');

  useEffect(() => {
    if (!workouts || !workouts.length) return;

    const now = new Date();
    const last30Days = new Array(30).fill(0);
    const last7Days = new Array(7).fill(0);
    const today = new Array(24).fill(0);

    workouts.forEach(workout => {
      const workoutDate = new Date(workout.date);
      const dayDiff = Math.floor((now - workoutDate) / (1000 * 60 * 60 * 24));
      const hourOfDay = workoutDate.getHours();

      // Daily stats (24 hours)
      if (dayDiff === 0) {
        today[hourOfDay]++;
      }

      // Weekly stats (7 days)
      if (dayDiff < 7) {
        last7Days[dayDiff]++;
      }

      // Monthly stats (30 days)
      if (dayDiff < 30) {
        last30Days[dayDiff]++;
      }
    });

    setStats({
      daily: {
        labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
        data: today.reverse()
      },
      weekly: {
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        data: last7Days.reverse()
      },
      monthly: {
        labels: Array.from({ length: 30 }, (_, i) => `Day ${30 - i}`),
        data: last30Days.reverse()
      }
    });
  }, [workouts]);

  const renderChart = () => {
    const currentStats = stats[view];
    const maxValue = Math.max(...currentStats.data);
    
    return (
      <div className="chart">
        <div className="bars">
          {currentStats.data.map((value, index) => (
            <div key={index} className="bar-container">
              <div 
                className="bar"
                style={{ 
                  height: `${(value / maxValue) * 100}%`,
                  backgroundColor: `rgba(74, 202, 245, ${0.3 + (value / maxValue) * 0.7})`
                }}
              >
                <span className="bar-value">{value}</span>
              </div>
              <span className="bar-label">{currentStats.labels[index]}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="progress-chart">
      <h2>Workout Progress</h2>
      <div className="view-controls">
        <button 
          className={view === 'daily' ? 'active' : ''} 
          onClick={() => setView('daily')}
        >
          Today
        </button>
        <button 
          className={view === 'weekly' ? 'active' : ''} 
          onClick={() => setView('weekly')}
        >
          This Week
        </button>
        <button 
          className={view === 'monthly' ? 'active' : ''} 
          onClick={() => setView('monthly')}
        >
          This Month
        </button>
      </div>
      {renderChart()}
    </div>
  );
};

export default ProgressChart; 