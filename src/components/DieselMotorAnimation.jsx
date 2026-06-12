import React, { useEffect, useRef } from 'react';
import MotorCanvas from './MotorCanvas';
import { getStrokeInfo } from '../utils/motorUtils';

function DieselMotorAnimation({ angle }) {
  const canvasRef = useRef(null);
  const strokeDisplayRef = useRef(null);

  useEffect(() => {
    if (strokeDisplayRef.current) {
      const strokeInfo = getStrokeInfo(angle);
      strokeDisplayRef.current.innerHTML = `
        <div class="stroke-name">${strokeInfo.name}</div>
        <div class="stroke-description">${strokeInfo.description}</div>
        <div class="stroke-progress">
          <div class="progress-bar" style="width: ${strokeInfo.progress}%"></div>
        </div>
        <div class="stroke-phase">${strokeInfo.phase}</div>
      `;
    }
  }, [angle]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas zeichnen
    MotorCanvas.draw(ctx, canvas.width, canvas.height, angle);
  }, [angle]);

  return (
    <div className="motor-animation">
      <canvas
        ref={canvasRef}
        width={900}
        height={600}
        className="motor-canvas"
      />
      <div ref={strokeDisplayRef} id="stroke-display" className="stroke-display"></div>
    </div>
  );
}

export default DieselMotorAnimation;
