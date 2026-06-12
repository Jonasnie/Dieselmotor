import React, { useState } from 'react';
import DieselMotorAnimation from './components/DieselMotorAnimation';
import './styles/App.css';

function App() {
  const [angle, setAngle] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAngleChange = (e) => {
    setAngle(parseFloat(e.target.value));
  };

  const handlePlayPause = () => {
    setIsAnimating(!isAnimating);
  };

  const handleReset = () => {
    setAngle(0);
    setIsAnimating(false);
  };

  // Animation abspielen
  React.useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setAngle((prev) => {
        const newAngle = (prev + 2) % 360;
        return newAngle;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🔧 4-Takt Dieselmotor Animation</h1>
        <p>Interaktive Simulation eines modernen Dieselmotors</p>
      </header>

      <main className="app-main">
        <div className="animation-container">
          <DieselMotorAnimation angle={angle} />
        </div>

        <div className="controls-container">
          <div className="control-group">
            <label htmlFor="angle-slider">Kurbelwinkel: <span className="angle-value">{angle.toFixed(1)}°</span></label>
            <input
              id="angle-slider"
              type="range"
              min="0"
              max="359.9"
              step="0.1"
              value={angle}
              onChange={handleAngleChange}
              className="slider"
              disabled={isAnimating}
            />
          </div>

          <div className="button-group">
            <button 
              onClick={handlePlayPause}
              className={`btn btn-play ${isAnimating ? 'active' : ''}`}
            >
              {isAnimating ? '⏸ Pause' : '▶ Abspielen'}
            </button>
            <button 
              onClick={handleReset}
              className="btn btn-reset"
            >
              ⟲ Zurücksetzen
            </button>
          </div>

          <div className="stroke-info">
            <h3>Takt-Information</h3>
            <div id="stroke-display" className="stroke-display"></div>
          </div>

          <div className="legend">
            <h3>Legende</h3>
            <div className="legend-item">
              <div className="legend-color" style={{backgroundColor: '#e74c3c'}}></div>
              <span>OT - Oberer Totpunkt</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{backgroundColor: '#3498db'}}></div>
              <span>UT - Unterer Totpunkt</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{backgroundColor: '#2ecc71'}}></div>
              <span>Kurbelwelle</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{backgroundColor: '#f39c12'}}></div>
              <span>Nockenwelle</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
