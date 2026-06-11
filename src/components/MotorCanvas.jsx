const MotorCanvas = {
  draw(ctx, width, height, angle) {
    // Canvas löschen
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, width, height);

    // Zentrum des Motors
    const centerX = width / 2;
    const centerY = height / 2;

    // Kurbelwelle-Radius
    const crankRadius = 40;

    // Kolben-Bewegung berechnen (Sinus-Bewegung)
    const kolbenPos = this.calculateKolbenPosition(angle, crankRadius);

    // Zeichne Zylinder
    this.drawZylinder(ctx, centerX, centerY, kolbenPos);

    // Zeichne Kurbelwelle
    this.drawKurbelwelle(ctx, centerX, centerY, angle, crankRadius);

    // Zeichne Nockenwelle
    this.drawNockenwelle(ctx, centerX, centerY, angle);

    // Zeichne Beschriftungen
    this.drawLabels(ctx, centerX, centerY, angle, kolbenPos);

    // Zeichne OT und UT Markierungen
    this.drawTotpunkte(ctx, centerX, centerY);
  },

  calculateKolbenPosition(angle, crankRadius) {
    const stangenlänge = 120;
    const rad = (angle * Math.PI) / 180;
    
    // Vereinfachte Kolbenbewegung
    const x = crankRadius * Math.cos(rad);
    const y = Math.sqrt(stangenlänge * stangenlänge - x * x);
    
    return crankRadius + y;
  },

  drawZylinder(ctx, centerX, centerY, kolbenPos) {
    const zylinderX = centerX - 150;
    const zylinderY = centerY - 100;
    const zylinderWidth = 200;
    const zylinderHeight = 200;
    const kolbenDurchmesser = 60;

    // Zylinder-Wand
    ctx.strokeStyle = '#34495e';
    ctx.lineWidth = 3;
    ctx.strokeRect(zylinderX, zylinderY, zylinderWidth, zylinderHeight);

    // Zylinder-Kopf (oberer Teil)
    ctx.fillStyle = '#95a5a6';
    ctx.fillRect(zylinderX, zylinderY - 20, zylinderWidth, 20);
    ctx.strokeStyle = '#34495e';
    ctx.lineWidth = 2;
    ctx.strokeRect(zylinderX, zylinderY - 20, zylinderWidth, 20);

    // Kolben
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath();
    ctx.arc(centerX, zylinderY + kolbenPos, kolbenDurchmesser / 2, 0, Math.PI * 2);
    ctx.fill();

    // Kolben-Ring
    ctx.strokeStyle = '#c0392b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, zylinderY + kolbenPos, kolbenDurchmesser / 2, 0, Math.PI * 2);
    ctx.stroke();

    // Zylinder-Raum (Animation der Gase)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(zylinderX + 2, zylinderY + 2, zylinderWidth - 4, kolbenPos - 2);

    // Kolbenstange
    ctx.strokeStyle = '#7f8c8d';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(centerX, zylinderY + kolbenPos + kolbenDurchmesser / 2);
    ctx.lineTo(centerX, centerY + 60);
    ctx.stroke();
  },

  drawKurbelwelle(ctx, centerX, centerY, angle, crankRadius) {
    const rad = (angle * Math.PI) / 180;

    // Kurbelwelle-Mittelpunkt
    ctx.fillStyle = '#2c3e50';
    ctx.beginPath();
    ctx.arc(centerX, centerY + 60, 8, 0, Math.PI * 2);
    ctx.fill();

    // Kurbelzapfen
    const zapfenX = centerX + crankRadius * Math.cos(rad);
    const zapfenY = centerY + 60 + crankRadius * Math.sin(rad);

    ctx.fillStyle = '#2ecc71';
    ctx.beginPath();
    ctx.arc(zapfenX, zapfenY, 6, 0, Math.PI * 2);
    ctx.fill();

    // Kurbelarm
    ctx.strokeStyle = '#2ecc71';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY + 60);
    ctx.lineTo(zapfenX, zapfenY);
    ctx.stroke();

    // Pleuelstange
    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(zapfenX, zapfenY);
    ctx.lineTo(centerX, centerY - 60);
    ctx.stroke();

    // Kurbelwelle (Kreis)
    ctx.strokeStyle = '#2ecc71';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.arc(centerX, centerY + 60, crankRadius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  },

  drawNockenwelle(ctx, centerX, centerY, angle) {
    const nockenwelleX = centerX - 120;
    const nockenwelleY = centerY - 130;
    const nockenwelleRadius = 35;

    // Nockenwellen-Mittelpunkt
    ctx.fillStyle = '#f39c12';
    ctx.beginPath();
    ctx.arc(nockenwelleX, nockenwelleY, 6, 0, Math.PI * 2);
    ctx.fill();

    // Nockenwelle (2x Rotation der Kurbelwelle)
    const nockenAngle = (angle * 2 * Math.PI) / 180;
    ctx.strokeStyle = '#f39c12';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(nockenwelleX, nockenwelleY, nockenwelleRadius, 0, Math.PI * 2);
    ctx.stroke();

    // Nocken (Nockenhübe)
    const nockenAnzahl = 4; // 4 Nocken für 4 Takte
    for (let i = 0; i < nockenAnzahl; i++) {
      const nockenWinkel = (i * Math.PI * 2) / nockenAnzahl + nockenAngle;
      const nockenX = nockenwelleX + nockenwelleRadius * Math.cos(nockenWinkel);
      const nockenY = nockenwelleY + nockenwelleRadius * Math.sin(nockenWinkel);

      ctx.fillStyle = '#e67e22';
      ctx.beginPath();
      ctx.arc(nockenX, nockenY, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Beschriftung
    ctx.fillStyle = '#f39c12';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Nockenwelle (2:1)', nockenwelleX, nockenwelleY + 55);
  },

  drawTotpunkte(ctx, centerX, centerY) {
    const zylinderY = centerY - 100;
    const zylinderHeight = 200;

    // OT - Oberer Totpunkt
    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(centerX - 170, zylinderY);
    ctx.lineTo(centerX + 170, zylinderY);
    ctx.stroke();

    ctx.fillStyle = '#e74c3c';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('OT (Oberer Totpunkt)', centerX - 165, zylinderY - 5);

    // UT - Unterer Totpunkt
    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(centerX - 170, zylinderY + zylinderHeight);
    ctx.lineTo(centerX + 170, zylinderY + zylinderHeight);
    ctx.stroke();

    ctx.fillStyle = '#3498db';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('UT (Unterer Totpunkt)', centerX - 165, zylinderY + zylinderHeight + 15);

    ctx.setLineDash([]);
  },

  drawLabels(ctx, centerX, centerY, angle, kolbenPos) {
    const zylinderY = centerY - 100;
    const kolbenY = zylinderY + kolbenPos;

    // Kolben-Position Beschriftung
    ctx.fillStyle = '#2c3e50';
    ctx.font = '11px Arial';
    ctx.textAlign = 'right';
    ctx.fillText(`Kolben: ${kolbenPos.toFixed(0)}px`, centerX - 20, kolbenY - 10);

    // Kurbelwinkel Beschriftung
    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`Kurbelwinkel: ${angle.toFixed(1)}°`, centerX, centerY + 100);

    // Ventile (schematisch)
    this.drawVentile(ctx, centerX, zylinderY, angle);
  },

  drawVentile(ctx, centerX, zylinderY, angle) {
    const ventilY = zylinderY - 25;
    const ventilAbstand = 40;

    // Einlass-Ventil (links)
    const einlassOffen = (angle >= 0 && angle < 180);
    ctx.fillStyle = einlassOffen ? '#2ecc71' : '#c0392b';
    ctx.beginPath();
    ctx.arc(centerX - ventilAbstand, ventilY, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Auslass-Ventil (rechts)
    const auslassOffen = (angle >= 180 && angle < 360);
    ctx.fillStyle = auslassOffen ? '#2ecc71' : '#c0392b';
    ctx.beginPath();
    ctx.arc(centerX + ventilAbstand, ventilY, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Ventil-Beschriftungen
    ctx.fillStyle = '#2c3e50';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Einlass', centerX - ventilAbstand, ventilY + 20);
    ctx.fillText('Auslass', centerX + ventilAbstand, ventilY + 20);
  }
};

export default MotorCanvas;
