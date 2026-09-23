let socket;

let r = 0;
let g = 0;
let b = 0;

let oscR, oscG, oscB;

function setup() {
  createCanvas(windowWidth, windowHeight);

  oscR = new p5.Oscillator('sine');
  oscG = new p5.Oscillator('sine');
  oscB = new p5.Oscillator('sine');

  oscR.amp(0); oscR.freq(400);
  oscG.amp(0); oscG.freq(496);
  oscB.amp(0); oscB.freq(592);

  // Conexión al servidor expuesto por PC
  socket = new WebSocket("ws://192.168.1.34:8081");
    // "ws://192.168.0.243:8081" ---> juan b justo
    // "ws://192.168.1.34:8081" ---> aristobulo

  // Callback cuando llegan datos
  socket.onmessage = (event) => {
    recibirDatos(event.data);
  };
}

function draw() {
  background(r, g, b); 
}

function recibirDatos(datosWs) {
  let valores = datosWs.split(',');
  let valorR = Number(valores[0]);
  let valorG = Number(valores[1]);
  let valorB = Number(valores[2]);

  console.log("datosWs:", valorR, valorG, valorB);

  r = valorR;
  g = valorG;
  b = valorB;

  oscR.amp(map(valorR, 0, 255, 0, 0.2));
  oscG.amp(map(valorG, 0, 255, 0, 0.3));
  oscB.amp(map(valorB, 0, 255, 0, 0.1));
}

function mousePressed() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
    oscR.start();
    oscG.start();
    oscB.start();
    console.log("Audio activado en navegador");
  }
}