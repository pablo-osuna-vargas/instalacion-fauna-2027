let socket;
let sliderR, sliderG, sliderB;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  // Conectar al servidor WebSocket en la PC
  socket = new WebSocket("ws://192.168.0.243:8081");

  // Crear sliders sin etiquetas
  sliderR = createSlider(0, 255, 100);
  sliderR.position(width/4, height/3);
  sliderR.style('width', '50%');

  sliderG = createSlider(0, 255, 100);
  sliderG.position(width/4, height/2);
  sliderG.style('width', '50%');

  sliderB = createSlider(0, 255, 100);
  sliderB.position(width/4, 2*height/3);
  sliderB.style('width', '50%');

  // Cada vez que cambian, enviar datos
  sliderR.input(enviarDatos);
  sliderG.input(enviarDatos);
  sliderB.input(enviarDatos);
}

function draw() {
  background(sliderR.value(), sliderG.value(), sliderB.value());
}

function enviarDatos() {
  if (socket.readyState === WebSocket.OPEN) {
    let r = sliderR.value();
    let g = sliderG.value();
    let b = sliderB.value();
    socket.send(`${r},${g},${b}`);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
