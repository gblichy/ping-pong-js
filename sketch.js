//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 18;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 5
let velocidadeYBolinha = 5

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosOp = 0;

//variaveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 70;

//variaveis do oponente
let xRaqueteOp = 585;
let yRaqueteOp = 150;
let velocidadeYOponente;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}
function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha ();
  movimentoBolinha();
  verificaColisao();
  mostraRaquete(xRaquete, yRaquete);
  movimentoRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete,yRaquete);
  mostraRaquete(xRaqueteOp, yRaqueteOp);
  movimentaRaqueteOponente();
  verificaColisaoRaquete (xRaqueteOp,yRaqueteOp);
  incluiPlacar();
  marcaPonto();
   
}
function mostraBolinha (){
  circle (xBolinha,yBolinha,diametro);
 } 
function movimentoBolinha (){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisao (){
  if (xBolinha + raio> width ||
     xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
    }
  if (yBolinha + raio> height || 
    yBolinha - raio< 0){
    velocidadeYBolinha *= -1;
 }
 } 

function mostraRaquete(x,y){
  rect(x,y,raqueteComprimento,
      raqueteAltura);
}

function movimentoRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function verificaColisaoRaquete() {
    if (xBolinha - raio < xRaquete + raqueteComprimento
        && yBolinha - raio < yRaquete + raqueteAltura
        && yBolinha + raio > yRaquete) {
        velocidadeXBolinha *= -1;
      raquetada.play();
    }
}

function verificaColisaoRaquete(x,y){
  colidiu =
    collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha -yRaqueteOp - raqueteComprimento / 2 - 30;
  yRaqueteOp += velocidadeYOponente 
}

function incluiPlacar(){
  stroke(255)
  textAlign(CENTER);
  textSize(16);
  fill(color(255,140,0));
  rect(180, 10, 40, 20);
  fill(255);
  text(meusPontos, 200, 26);
  fill(color(255,140,0));
  rect(380, 10, 40, 20);
  fill(255);
  text(pontosOp, 400, 26);
}
  function marcaPonto(){
    if (xBolinha > 590){
      meusPontos += 1;
      ponto.play();
    }
    if (xBolinha < 10){
      pontosOp += 1;
      ponto.play();
    }
  }