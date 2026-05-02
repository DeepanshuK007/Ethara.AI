import React, { useState, useEffect } from 'react';

const FocusTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Play a sound or show a notification here in a real app
      alert('Focus session complete! Take a 5 minute break.');
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="card glass" style={{ width: '300px', textAlign: 'center', position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 100, border: '2px solid var(--ethara-300)' }}>
      <h3 style={{ marginBottom: '1rem', color: 'var(--ethara-600)' }}>🧠 Focus Mode</h3>
      
      <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--foreground)', marginBottom: '1.5rem', fontVariantNumeric: 'tabular-nums' }}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      
      <div className="flex gap-4 justify-center">
        <button 
          onClick={toggleTimer} 
          className="btn"
          style={{ 
            backgroundColor: isActive ? '#f59e0b' : 'var(--ethara-500)', 
            color: 'white',
            flex: 1
          }}
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button onClick={resetTimer} className="btn btn-outline" style={{ flex: 1 }}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default FocusTimer;
