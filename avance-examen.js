26/06/2026 1:28 Am 
AYER EN LA NOCHE TRABAJE LAS IMAGENES EN PIXEL ART



let FondoActual // FONDO CON EL QUE IREMOS ALTERNANDO EN LOS ESTADOS
let Fondo1 // Imagen del supermercado / Estado 1 / Caen los ingredientes del cielo
let Fondo2 // Imagen de la mesa / Estado 2 / Nos armamos el completito
let Fondo3 // Imagen de la boca / Estado 3 / Comemos nuestro completito
let Carrito // Imagen
let Pan // Imagen
let Palta // Imagen      
let Tomate // Imagen      
let Vienesa // Imagen    
let Coca // Imagen        
let Italiano // Imagen    
let Zanahoria // Imagen   
let Lechuga // Imagen   
let Pimenton // Imagen  
let Brocoli // Imagen     
let CarritoX, CarritoY, CarritoW, CarritoH; // Con esto movemos el carrito
let  displayY, displayX
function setup() {
  createCanvas(800, 700);

/////////////////////////Imagenes//////////////////
  Carrito      = loadImage("./Carrito.png");
  Pan          = loadImage("./Pan.png");
  Palta        = loadImage("./Palta.png");
  Tomate       = loadImage("./Tomate.png");
  Vienesa      = loadImage("./Vienesa.png");
  Coca         = loadImage("./Coca.png");
  Italiano     = loadImage("./Italiano.png");
  Zanahoria    = loadImage("./Zanahoria.png");
  Lechuga      = loadImage("./Lechuga.png");
  Pimenton     = loadImage("./Pimenton.png");
  Brocoli      = loadImage("./Brocoli.png");
  Fondo1       = loadImage("./Fondo1.png");
////////////////////////////////////////////////////
FondoActual = Fondo1; // aplicamos esto para que sea más facil a la hora de cambiar fondos
 // w es ancho y h es alto
  CarritoW = 260; // con estos valores podemos cambiar el tamaño del carrito
  CarritoH = 240; // con estos valores podemos cambiar el tamaño del carrito
  CarritoX = width / 2;
  CarritoY = height - CarritoH / 2 - 10;
  displayX = width - CarritoW;
  displayY = width - CarritoY;






}


function draw() {
  background(220);

////////////////////Primer estado/////////////////////
image(FondoActual,0,0,width,height); // insertamos nuestro fondo1
CarritoX = mouseX // nuestro mouse ahora es el carrito
CarritoX  = constrain(CarritoX, CarritoW / 2 + 10, width - CarritoW / 2 - 10);
  rectMode(CENTER);
 // rect(CarritoX, CarritoY, CarritoW, CarritoH);
push();
  imageMode(CENTER);
  image(Carrito , CarritoX, CarritoY-10, CarritoH, CarritoW);
//trasnlate(pX, pY);
pop();

