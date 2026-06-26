let FondoActual // FONDO CON EL QUE IREMOS ALTERNANDO EN LOS ESTADOS
let Fondo1 // FONDO DE ESTADO 1
let Fondo2 // FONDO DE ESTADO 2
let Fondo3 // FONDO DE ESTADO 3
let Carrito // IMG
let Pan // IMG
let Palta // IMG
let Tomate // IMG
let Vienesa // IMG
let Coca // IMG
let Italiano // IMG
let Zanahoria // IMG
let Lechuga // IMG 
let Pimenton // IMG
let Brocoli // IMG
let Corazon // IMG
let Mayonesa // IMG
let Fuente // LETRA 

let estado = 1; // 1 = supermercado

let CarritoX, CarritoY, CarritoW, CarritoH; // Con esto movemos el carrito
let displayY, displayX // Variable de posición
let VienesaX, VienesaY; //Variable de posición
let TomateX, TomateY; //Variable de posición
let PaltaX, PaltaY; //Variable de posición
let PanX, PanY; //Variable de posición
let LechugaX, LechugaY; //Variable de posición
let ZanahoriaX, ZanahoriaY; //Variable de posición
let PimentonX, PimentonY; //Variable de posición
let BrocoliX, BrocoliY; //Variable de posición
let CocaX, CocaY; //Variable de posición

let vidas = 3;
let vienesaAgarrada = false;
let tomateAgarrado  = false;
let paltaAgarrada   = false;
let panAgarrado     = false;
let cocaAgarrada    = false;

// ESTADO 2
let spritesMesa = [];
let ordenCorrecto     = ["Pan", "Vienesa", "Tomate", "Palta", "Mayonesa", "Coca"];
let pasoActual        = 0;
let mensajeMesa       = "";
let tiempoMensaje     = 0;
let completoTerminado = false;

//============================IMAGENES======================0//
function preload() {
  Fuente    = loadFont("./Minecraft.ttf");
  Carrito   = loadImage("./Carrito.png");
  Pan       = loadImage("./Pan.png");
  Palta     = loadImage("./Palta.png");
  Tomate    = loadImage("./Tomate.png");
  Vienesa   = loadImage("./Vienesa.png");
  Coca      = loadImage("./Coca.png");
  Italiano  = loadImage("./Italiano.png");
  Zanahoria = loadImage("./Zanahoria.png");
  Lechuga   = loadImage("./Lechuga.png");
  Pimenton  = loadImage("./Pimenton.png");
  Brocoli   = loadImage("./Brocoli.png");
  Fondo1    = loadImage("./Fondo1.png");
  Fondo2    = loadImage("./Fondo2.png");
  Fondo3    = loadImage("./Boca.png");
  Corazon   = loadImage("./Corazon.png");
  Mayonesa  = loadImage("./Mayonesa.png");
}

//============================================================//

function setup() {
  createCanvas(800, 700);
  FondoActual = Fondo1;
  CarritoW = 260;
  CarritoH = 240;
  CarritoX = width / 2;
  CarritoY = height - CarritoH / 2 - 10;
  displayX = width - CarritoW;
  displayY = width - CarritoY;

  spritesMesa = [
    { nombre: "Pan",      x: 185, y: 290, w: 280, h: 180, visible: true },
    { nombre: "Vienesa",  x: 410, y: 300, w: 200, h: 160, visible: true },
    { nombre: "Tomate",   x: 400, y: 510, w: 185, h: 180, visible: true },
    { nombre: "Palta",    x: 140, y: 510, w: 185, h: 180, visible: true },
    { nombre: "Mayonesa", x: 585, y: 265, w: 105, h: 190, visible: true },
    { nombre: "Coca",     x: 735, y: 275, w: 100, h: 210, visible: true },
  ];

  inicioVienesa();
  inicioTomate();
  inicioPalta();
  inicioPan();
  inicioLechuga();
  inicioZanahoria();
  inicioPimenton();
  inicioBrocoli();
  inicioCoca();
}

function draw() {
  background(220);
  image(FondoActual, 0, 0, width, height);

  //==============ESTADO 1===============//
  
  if (estado == 1) {
    dibujarComanda();

    CocaFall();
    VienesaFall();
    TomateFall();
    PaltaFall();
    PanFall();
    LechugaFall();
    ZanahoriaFall();
    PimentonFall();
    BrocoliFall();

    CarritoX = mouseX;
    CarritoX = constrain(CarritoX, CarritoW / 2 + 10, width - CarritoW / 2 - 10);
    rectMode(CENTER);
    push();
    imageMode(CENTER);
    image(Carrito, CarritoX, CarritoY - 10, CarritoH, CarritoW);
    pop();

    if (colisionLechuga())   { vidas--; inicioLechuga(); }
    if (colisionZanahoria()) { vidas--; inicioZanahoria(); }
    if (colisionPimenton())  { vidas--; inicioPimenton(); }
    if (colisionBrocoli())   { vidas--; inicioBrocoli(); }
    if (colisionVienesa()) { vienesaAgarrada = true; inicioVienesa(); }
    if (colisionTomate())  { tomateAgarrado  = true; inicioTomate(); }
    if (colisionPalta())   { paltaAgarrada   = true; inicioPalta(); }
    if (colisionPan())     { panAgarrado     = true; inicioPan(); }
    if (colisionCoca())    { cocaAgarrada    = true; inicioCoca(); }

    if (VienesaY > height) inicioVienesa();
    if (TomateY  > height) inicioTomate();
    if (PaltaY   > height) inicioPalta();
    if (PanY     > height) inicioPan();
    if (CocaY    > height) inicioCoca();

    if (vienesaAgarrada && tomateAgarrado && paltaAgarrada && panAgarrado && cocaAgarrada) {
      push();
      rectMode(CORNER);
      fill(0, 200, 0, 150);
      rect(0, 0, width, height);
      textFont(Fuente);
      textAlign(CENTER);
      fill(255);
      textSize(40);
      text("BIEN!", width / 2, height / 2 - 30);
      textSize(20);
      text("Ahora a comerme mi tocomple", width / 2, height / 2 + 20);
      textSize(15);
      text("Click para continuar", width / 2, height / 2 + 60);
      pop();
    }

    if (vidas <= 0) {
      push();
      rectMode(CORNER);
      fill(255, 0, 0, 150);
      rect(0, 0, width, height);
      textFont(Fuente);
      textAlign(CENTER);
      fill(255);
      textSize(60);
      text("HAS PERDIDO", width / 2, height / 2);
      textSize(20);
      text("Click para reiniciar", width / 2, height / 2 + 60);
      pop();
    }
  }

  //=================ESTADO 2===============
  if (estado == 2) {
    dibujarMesa();
  }


  //=========ESTADO 3===========//
  if (estado == 3) {
    // ocultamos el cursor del sistema
    noCursor();
    // mensaje final
    push();
    textFont(Fuente);
    textAlign(CENTER);
    fill(255);
    stroke(0);
    strokeWeight(3);
    textSize(48);
    text("KE RICO UN COMPLETITO <3", width / 2, height / 2 - 40);
    textSize(16);
    text("Click para volver a jugar", width / 2, height / 2 + 30);
    pop();
    // dibujamos el italiano como cursor
    push();
    imageMode(CENTER);
    image(Italiano, mouseX, mouseY, 80, 80);
    pop();
  }
}

//===================ESTADO 2=====================
function dibujarMesa() {
  push();

  for (let i = 0; i < spritesMesa.length; i++) {
    let s = spritesMesa[i];
    if (s.visible && i === pasoActual && !completoTerminado) {
      noFill();
      let pulso = sin(frameCount * 0.1) * 30 + 180;
      stroke(255, pulso, 0);
      strokeWeight(3);
      rectMode(CENTER);
      rect(s.x, s.y, s.w + 10, s.h + 10, 6);
      noStroke();
    }
  }

  if (!completoTerminado) {
    push();
    textFont(Fuente);
    textAlign(CENTER);
    fill(255);
    stroke(0);
    strokeWeight(3);
    textSize(16);
    text("Arma tu completito en orden", width / 2, 35);
    textSize(13);
    text("Siguiente: " + ordenCorrecto[pasoActual], width / 2, 58);
    pop();
  }

  if (tiempoMensaje > 0) {
    push();
    textFont(Fuente);
    textAlign(CENTER);
    textSize(28);
    fill(mensajeMesa === "¡Correcto!" ? color(0, 200, 0) : color(220, 0, 0));
    stroke(0);
    strokeWeight(2);
    text(mensajeMesa, width / 2, height / 2 - 50);
    pop();
    tiempoMensaje--;
  }

  push();
  imageMode(CENTER);
  let xv = 30;
  for (let i = 0; i < vidas; i++) {
    image(Corazon, xv, 30, 25, 25);
    xv += 30;
  }
  pop();

  if (completoTerminado) {
    push();
    rectMode(CORNER);
    fill(0, 180, 0, 160);
    rect(0, 0, width, height);
    textFont(Fuente);
    textAlign(CENTER);
    fill(255);
    noStroke();
    textSize(42);
    text("¡COMPLETO LISTO!", width / 2, height / 2 - 30);
    textSize(18);
    text("Click para continuar", width / 2, height / 2 + 30);
    pop();
  }

  pop();
}

//====================CONFIGURACIÓN DE LA CAIDA============================//
function VienesaFall() {
  VienesaY += VienesaSpeed;
  image(Vienesa, VienesaX - 45, VienesaY - 45, 90, 90);
  if (VienesaY > height) inicioVienesa();
}
function TomateFall() {
  TomateY += TomateSpeed;
  image(Tomate, TomateX - 35, TomateY - 35, 70, 70);
  if (TomateY > height) inicioTomate();
}
function LechugaFall() {
  LechugaY += LechugaSpeed;
  image(Lechuga, LechugaX - 35, LechugaY - 35, 70, 70);
  if (LechugaY > height) inicioLechuga();
}
function PaltaFall() {
  PaltaY += PaltaSpeed;
  image(Palta, PaltaX - 35, PaltaY - 35, 70, 70);
  if (PaltaY > height) inicioPalta();
}
function ZanahoriaFall() {
  ZanahoriaY += ZanahoriaSpeed;
  image(Zanahoria, ZanahoriaX - 35, ZanahoriaY - 35, 70, 70);
  if (ZanahoriaY > height) inicioZanahoria();
}
function BrocoliFall() {
  BrocoliY += BrocoliSpeed;
  image(Brocoli, BrocoliX - 35, BrocoliY - 35, 70, 70);
  if (BrocoliY > height) inicioBrocoli();
}
function CocaFall() {
  CocaY += CocaSpeed;
  image(Coca, CocaX - 45, CocaY - 45, 90, 90);
  if (CocaY > height) inicioCoca();
}
function PimentonFall() {
  PimentonY += PimentonSpeed;
  image(Pimenton, PimentonX - 35, PimentonY - 35, 70, 70);
  if (PimentonY > height) inicioPimenton();
}
function PanFall() {
  PanY += PanSpeed;
  image(Pan, PanX - 45, PanY - 45, 90, 90);
  if (PanY > height) inicioPan();
}

//=====================CONFIGURACIÓN DE INICIO=============================//
function inicioVienesa() {
  VienesaX     = random(100, width - 100);
  VienesaY     = random(-300, -50);
  VienesaSpeed = random(2, 7);
}
function inicioTomate() {
  TomateX     = random(100, width - 100);
  TomateY     = random(-600, -50);
  TomateSpeed = random(2, 7);
}
function inicioPalta() {
  PaltaX     = random(100, width - 100);
  PaltaY     = random(-900, -50);
  PaltaSpeed = random(2, 7);
}
function inicioCoca() {
  CocaX     = random(100, width - 100);
  CocaY     = random(-1200, -50);
  CocaSpeed = random(2, 7);
}
function inicioLechuga() {
  LechugaX     = random(100, width - 100);
  LechugaY     = random(-1500, -50);
  LechugaSpeed = random(2, 7);
}
function inicioZanahoria() {
  ZanahoriaX     = random(100, width - 100);
  ZanahoriaY     = random(-1800, -50);
  ZanahoriaSpeed = random(2, 7);
}
function inicioPimenton() {
  PimentonX     = random(100, width - 100);
  PimentonY     = random(-2100, -50);
  PimentonSpeed = random(2, 7);
}
function inicioPan() {
  PanX     = random(100, width - 100);
  PanY     = random(-2400, -50);
  PanSpeed = random(2, 7);
}
function inicioBrocoli() {
  BrocoliX     = random(100, width - 100);
  BrocoliY     = random(-2700, -50);
  BrocoliSpeed = random(2, 7);
}

//============================COLISION=================================================//
function colisionLechuga() {
  let condicion1 = LechugaX >= CarritoX - CarritoW / 2;
  let condicion2 = LechugaX <= CarritoX + CarritoW / 2;
  let condicion3 = LechugaY >= CarritoY - CarritoH / 2;
  let condicion4 = LechugaY <= CarritoY + CarritoH / 2;
  return condicion1 && condicion2 && condicion3 && condicion4;
}
function colisionZanahoria() {
  let condicion1 = ZanahoriaX >= CarritoX - CarritoW / 2;
  let condicion2 = ZanahoriaX <= CarritoX + CarritoW / 2;
  let condicion3 = ZanahoriaY >= CarritoY - CarritoH / 2;
  let condicion4 = ZanahoriaY <= CarritoY + CarritoH / 2;
  return condicion1 && condicion2 && condicion3 && condicion4;
}
function colisionPimenton() {
  let condicion1 = PimentonX >= CarritoX - CarritoW / 2;
  let condicion2 = PimentonX <= CarritoX + CarritoW / 2;
  let condicion3 = PimentonY >= CarritoY - CarritoH / 2;
  let condicion4 = PimentonY <= CarritoY + CarritoH / 2;
  return condicion1 && condicion2 && condicion3 && condicion4;
}
function colisionBrocoli() {
  let condicion1 = BrocoliX >= CarritoX - CarritoW / 2;
  let condicion2 = BrocoliX <= CarritoX + CarritoW / 2;
  let condicion3 = BrocoliY >= CarritoY - CarritoH / 2;
  let condicion4 = BrocoliY <= CarritoY + CarritoH / 2;
  return condicion1 && condicion2 && condicion3 && condicion4;
}
function colisionVienesa() {
  let condicion1 = VienesaX >= CarritoX - CarritoW / 2;
  let condicion2 = VienesaX <= CarritoX + CarritoW / 2;
  let condicion3 = VienesaY >= CarritoY - CarritoH / 2;
  let condicion4 = VienesaY <= CarritoY + CarritoH / 2;
  return condicion1 && condicion2 && condicion3 && condicion4;
}
function colisionTomate() {
  let condicion1 = TomateX >= CarritoX - CarritoW / 2;
  let condicion2 = TomateX <= CarritoX + CarritoW / 2;
  let condicion3 = TomateY >= CarritoY - CarritoH / 2;
  let condicion4 = TomateY <= CarritoY + CarritoH / 2;
  return condicion1 && condicion2 && condicion3 && condicion4;
}
function colisionPalta() {
  let condicion1 = PaltaX >= CarritoX - CarritoW / 2;
  let condicion2 = PaltaX <= CarritoX + CarritoW / 2;
  let condicion3 = PaltaY >= CarritoY - CarritoH / 2;
  let condicion4 = PaltaY <= CarritoY + CarritoH / 2;
  return condicion1 && condicion2 && condicion3 && condicion4;
}
function colisionPan() {
  let condicion1 = PanX >= CarritoX - CarritoW / 2;
  let condicion2 = PanX <= CarritoX + CarritoW / 2;
  let condicion3 = PanY >= CarritoY - CarritoH / 2;
  let condicion4 = PanY <= CarritoY + CarritoH / 2;
  return condicion1 && condicion2 && condicion3 && condicion4;
}
function colisionCoca() {
  let condicion1 = CocaX >= CarritoX - CarritoW / 2;
  let condicion2 = CocaX <= CarritoX + CarritoW / 2;
  let condicion3 = CocaY >= CarritoY - CarritoH / 2;
  let condicion4 = CocaY <= CarritoY + CarritoH / 2;
  return condicion1 && condicion2 && condicion3 && condicion4;
}

//=================COMANDA====================================//
function dibujarComanda() {
  push();
  rectMode(CORNER);
  noStroke();

  fill(180, 170, 140);
  rect(25, 25, 160, 240, 5);

  fill(255, 252, 220);
  stroke(180);
  strokeWeight(1);
  rect(20, 20, 160, 240, 5);

  textFont(Fuente);
  textAlign(CENTER);
  fill(50);
  textSize(14);
  text("COMANDA", 100, 48);

  stroke(150);
  line(30, 55, 170, 55);
  noStroke();

  textAlign(LEFT);
  textSize(12);
  dibujarItem(Vienesa, "Vienesa", vienesaAgarrada, 65);
  dibujarItem(Tomate,  "Tomate",  tomateAgarrado,  100);
  dibujarItem(Palta,   "Palta",   paltaAgarrada,   135);
  dibujarItem(Pan,     "Pan",     panAgarrado,     170);
  dibujarItem(Coca,    "Coca",    cocaAgarrada,    205);

  let x = 30;
  for (let i = 0; i < vidas; i++) {
    image(Corazon, x, 228, 25, 25);
    x += 30;
  }

  pop();
  noTint();
}

function dibujarItem(icono, nombre, agarrado, y) {
  image(icono, 30, y - 18, 30, 30);

  if (agarrado) {
    fill(150, 150, 150, 150);
    noStroke();
    rect(30, y - 18, 30, 30);
  }

  fill(agarrado ? 150 : 0);
  text(nombre, 68, y);

  if (agarrado) {
    stroke(100);
    strokeWeight(1);
    line(68, y - 4, 68 + textWidth(nombre), y - 4);
    noStroke();
  }
}

//=================REINICIAR====================================//
function reiniciarTodo() {
  cursor(); // restaura el cursor del sistema
  vidas             = 3;
  vienesaAgarrada   = false;
  tomateAgarrado    = false;
  paltaAgarrada     = false;
  panAgarrado       = false;
  cocaAgarrada      = false;
  pasoActual        = 0;
  completoTerminado = false;
  estado            = 1;
  FondoActual       = Fondo1;
  for (let s of spritesMesa) s.visible = true;
  inicioVienesa(); inicioTomate(); inicioPalta();
  inicioPan(); inicioLechuga(); inicioZanahoria();
  inicioPimenton(); inicioBrocoli(); inicioCoca();
}

function mousePressed() {

  // ESTADO 1
  if (estado == 1) {
    if (vienesaAgarrada && tomateAgarrado && paltaAgarrada && panAgarrado && cocaAgarrada) {
      estado            = 2;
      FondoActual       = Fondo2;
      pasoActual        = 0;
      completoTerminado = false;
      for (let s of spritesMesa) s.visible = true;
    }
    if (vidas <= 0) reiniciarTodo();
  }

  // ESTADO 2 - click en ingrediente
  if (estado == 2 && !completoTerminado) {
    let s = spritesMesa[pasoActual];
    let dentroX = mouseX > s.x - s.w / 2 && mouseX < s.x + s.w / 2;
    let dentroY = mouseY > s.y - s.h / 2 && mouseY < s.y + s.h / 2;

    if (dentroX && dentroY) {
      s.visible     = false;
      mensajeMesa   = "¡Correcto!";
      tiempoMensaje = 40;
      pasoActual++;
      if (pasoActual >= ordenCorrecto.length) completoTerminado = true;
    } else {
      mensajeMesa   = "¡Orden incorrecto!";
      tiempoMensaje = 50;
      vidas--;
      if (vidas <= 0) reiniciarTodo();
    }
  }

  // ESTADO 2 - victoria: pasa a estado 3 y corta
  if (estado == 2 && completoTerminado) {
    estado      = 3;
    FondoActual = Fondo3;
    return; // evita que el bloque de estado 3 se ejecute en el mismo click
  }

  // ESTADO 3 - click reinicia
  if (estado == 3) reiniciarTodo();
}