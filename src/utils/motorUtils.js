export function getStrokeInfo(angle) {
  // 360° = 4 Takte, also 90° pro Takt
  const normalizedAngle = angle % 360;

  let strokeInfo = {
    name: '',
    description: '',
    progress: 0,
    phase: '',
  };

  if (normalizedAngle >= 0 && normalizedAngle < 90) {
    // 1. Takt: Ansaugen
    const progress = (normalizedAngle / 90) * 100;
    strokeInfo = {
      name: '1. Takt: Ansaugen',
      description: 'Kolben bewegt sich nach unten. Einlass-Ventil öffnet. Frische Luft strömt ein.',
      progress: progress,
      phase: `${(normalizedAngle).toFixed(1)}° - Kolben senkt sich`,
    };
  } else if (normalizedAngle >= 90 && normalizedAngle < 180) {
    // 2. Takt: Verdichten
    const progress = ((normalizedAngle - 90) / 90) * 100;
    strokeInfo = {
      name: '2. Takt: Verdichten',
      description: 'Kolben bewegt sich nach oben. Beide Ventile geschlossen. Luft wird komprimiert und erhitzt.',
      progress: progress,
      phase: `${(normalizedAngle - 90).toFixed(1)}° - Luft wird verdichtet`,
    };
  } else if (normalizedAngle >= 180 && normalizedAngle < 270) {
    // 3. Takt: Verbrennung (Expansion)
    const progress = ((normalizedAngle - 180) / 90) * 100;
    strokeInfo = {
      name: '3. Takt: Verbrennung & Expansion',
      description: 'Dieselkraftstoff wird eingespritzt und entzündet. Explosion treibt Kolben nach unten. Großes Drehmoment!',
      progress: progress,
      phase: `${(normalizedAngle - 180).toFixed(1)}° - Krafterzeugung`,
    };
  } else if (normalizedAngle >= 270 && normalizedAngle < 360) {
    // 4. Takt: Ausstoß
    const progress = ((normalizedAngle - 270) / 90) * 100;
    strokeInfo = {
      name: '4. Takt: Ausstoß',
      description: 'Kolben bewegt sich nach oben. Auslass-Ventil öffnet. Abgase werden ausgestoßen.',
      progress: progress,
      phase: `${(normalizedAngle - 270).toFixed(1)}° - Abgase werden ausgestoßen`,
    };
  }

  return strokeInfo;
}

export function getStrokeColor(angle) {
  const normalizedAngle = angle % 360;

  if (normalizedAngle >= 0 && normalizedAngle < 90) {
    return '#3498db'; // Blau - Ansaugen
  } else if (normalizedAngle >= 90 && normalizedAngle < 180) {
    return '#f39c12'; // Orange - Verdichten
  } else if (normalizedAngle >= 180 && normalizedAngle < 270) {
    return '#e74c3c'; // Rot - Verbrennung
  } else {
    return '#9b59b6'; // Lila - Ausstoß
  }
}
