const QRCode = require('qrcode');

// URL de tu servidor HTTP
const url = 'http://192.168.0.243:8080/';

// Generar archivo PNG
QRCode.toFile('instalacion-qr.png', url, {
  color: {
    dark: '#000000',
    light: '#ffffff'
  }
}, function (err) {
  if (err) throw err;
  console.log('✅ QR generado instalacion-qr.png');
});
