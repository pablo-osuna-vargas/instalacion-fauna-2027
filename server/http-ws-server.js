// server.js
const express = require('express');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const PORT_HTTP = 8080;   // Puerto para servir HTML
const PORT_WS   = 8081;   // Puerto para WebSocket

// Servidor HTTP: entrega index.html, p5-client.js, estilos.css
app.use(express.static(path.join(__dirname, '..')));
app.listen(PORT_HTTP, () => {
  console.log(`Servidor web en http://192.168.1.34:${PORT_HTTP}`);
  // "http://192.168.0.243:" ---> juan b justo
  // "http://192.168.1.34:" ---> aristobulo
});

// Servidor WebSocket: recibe y reenvía datos
const wss = new WebSocket.Server({ port: PORT_WS });
console.log(`Servidor WebSocket escuchando en ws://192.168.1.34:${PORT_WS}`);
  // "ws://192.168.0.243:8081" ---> juan b justo
  // "ws://192.168.1.34:8081" ---> aristobulo

wss.on('connection', (ws) => {
  console.log('Cliente conectado');

  ws.on('message', (msg) => {
    console.log('Datos recibidos:', msg.toString());

    // Reenviar a todos los clientes conectados (broadcast)
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg.toString());
      }
    });
  });

  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});