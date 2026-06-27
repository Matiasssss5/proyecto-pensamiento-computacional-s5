## Link de web pública (github pages)

[https://matiasssss5.github.io/proyecto-pensamiento-computacional-s5/]

### Título del proyecto

Juego Completito 

### Referencia de origen / bibliografía

La leyenda del hilo rojo es un antiguo mito de origen asiático (popular en China y Japón) que sostiene que las personas predestinadas a conocerse están unidas por un hilo rojo invisible atado al dedo meñique o al tobillo. se atribuye al "anciano de la luna" (Yuè Xià Lǎo),

### Imagen de referencia de proyecto

![Pantalla de inicio](https://raw.githubusercontent.com/Matiasssss5/proyecto-pensamiento-computacional-s5/main/Inicio.png)

### Integrantes

Matías Gutiérrez [Matiasssss5] [(https://github.com/Matiasssss5/proyecto-pensamiento-computacional-s5)]

### Enlace de p5.js 

<[https://editor.p5js.org/matias.gutierrez5/sketches/JjlNsxPZL]>

### Relato inicial

La persona va al supermercado a comprar todo lo necesario para comerse un rico completito, luego de tener toda su lista completa, se va a su casa y arma en el orden correcto su completito italiano y después de eso se come su completito.

### Storyboard

## Storyboard

![Storyboard](https://raw.githubusercontent.com/Matiasssss5/proyecto-pensamiento-computacional-s5/main/Storyboard.jpeg)

### Estados

Describe acá los estados de tu máquina (mínimo 3 para proyectos individuales, 6 para parejas, 9 para tríos), y la condición de salida. Incluye la sección de código que muestra ese estado

#### Estado 1

l poner el mouse sobre el canvas, puedes mover tu carrito siguiendo la lista, si llevas verduras como brócoli, lechuga, pimentón o zanahoria, pierdes 1 vida x cada de estas agarradas, si agarras todo los ingredientes de la lista antes de perder tus 3 vidas pasas al estado 2

```js
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
```


#### Estado 2

Llegas del supermercado y toca hacerte tu completo, presionando el orden correcto del italiano, si no pierdes y vuelves a empezar, si lo haces bien pasas a la siguiente fase.

```function dibujarMesa() {
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
```
#### Estado 3
Puedes disfrutar de tu rico completito gracias por jugar.
```
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
```
