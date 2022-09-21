window.onresize = changeWindow;
let mainBoard = new Board();
let overlay;
let text;

function load() {
  canvas = document.querySelector('.canvas');
  ctx = canvas.getContext('2d');
  overlay = document.getElementById("overlay");
  text = document.getElementById("topText");
  canvas.width = width;
  canvas.height = height;
  document.onkeydown = keyPress;
  document.onmousemove = updateMousePos;
  overlay.style.display = "none";
  text.style.display = 'block';
  mainBoard.draw(0, 0, width, height);
}

function startGame(n) {
  overlay.style.display = "none";
  text.style.display = 'block';
}

function finishGame() {
  overlay.style.display = 'block';
  text.style.display = 'none';
}

function redraw() {
  ctx.clearRect(0, 0, width, height);
  mainBoard.draw(0, 0, width, height);
}

function changeWindow() {
  width = window.innerWidth;
  height = window.innerHeight;
  //REDRAW SCREEN
}

function keyPress(key) {
  if(key.keyCode == 32) {
    return;
  }
}

function leftClick() {
  
}

function aiMove() {
  let move;
  let player = playerTurn == 2;
  console.log(player)
  move = aiDecide(mainBoard, player)[0];
  mainBoard = mainBoard.makeMove(move);
  redraw();
  if(mainBoard.winner != 0 || mainBoard.movesLeft == 0) {
    showWinner();
    setTimeout(finishGame, 5000);
    return;
  }
  text.innerHTML = 'Player Turn';
  canClick = true;
}

function updateMousePos() {
  mousePos[0] = event.clientX;
  mousePos[1] = event.clientY;
}