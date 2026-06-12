# 🔧 Dieselmotor - 4-Takt Animation

Eine interaktive React-Anwendung, die den Arbeitsablauf eines 4-Takt-Dieselmotors visualisiert und erklärt.

## 🎯 Features

- **Interaktive Animation**: Slider zur Steuerung des Kurbelwinkels (0-360°)
- **Zylinder-Querschnitt**: Detaillierte Darstellung des Zylinders mit Kolben
- **Kurbelwelle**: Visualisierung der Kurbelwelle mit drehender Animation
- **Nockenwelle**: 2:1 Untersetzung der Nockenwelle (rotiert mit halber Geschwindigkeit)
- **OT/UT Markierungen**: 
  - **OT** = Oberer Totpunkt (rot gestrichelt)
  - **UT** = Unterer Totpunkt (blau gestrichelt)
- **4 Takte des Motors**:
  1. **Ansaugen**: Frische Luft strömt in den Zylinder
  2. **Verdichten**: Luft wird komprimiert und erhitzt
  3. **Verbrennung & Expansion**: Krafterzeugung durch Verbrennung
  4. **Ausstoß**: Abgase werden ausgestoßen
- **Echtzeit-Informationen**: Anzeige des aktuellen Taktes mit Beschreibung
- **Automatische Animation**: Abspielen und Pausieren möglich

## 📋 Installation

```bash
npm install
npm start
```

## 🚀 Verwendung

1. **Slider bewegen**: Nutze den Slider, um den Motor manuell durchzufahren
2. **Abspielen**: Klicke "▶ Abspielen" für automatische Animation
3. **Pause**: Stoppe die Animation mit "⏸ Pause"
4. **Zurücksetzen**: Setze den Motor auf 0° zurück

## 📁 Projektstruktur

```
Dieselmotor/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── DieselMotorAnimation.jsx
│   │   └── MotorCanvas.jsx
│   ├── utils/
│   │   └── motorUtils.js
│   ├── styles/
│   │   └── App.css
│   ├── App.jsx
│   └── index.js
├── package.json
└── README.md
```

## 📄 Lizenz

MIT
