//Vars
let width = window.innerWidth;
let height = window.innerHeight;
let canvas;
let ctx;
let mousePos = [0,0];

//Useful Functions
function max(n1, n2) {
  if(n1 > n2) {
    return n1;
  }
  return n2;
}

function min(n1, n2) {
  if(n1 < n2) {
    return n1;
  }
  return n2;
}

function randColor() {
  return 'rgba(' + rand(0,255) + ',' + rand(0,255) + ',' + rand(0,255) + ')';
}

function rand(min, max) {
  return Math.floor(Math.random() * (max-min+1)) + (min);
}
function degToRad(degrees) {
  return degrees * Math.PI / 180;
}

function radToDeg(rad) {
  return rad / Math.PI * 180;
}

function drawLine(x1, y1, x2, y2, style = white, r = 1) {
  ctx.strokeStyle = style;
  ctx.lineWidth = r;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function equals(arr1, arr2) {
  if(arr1.length != arr2.length) {
    return false;
  }
  for(let i = 0; i < arr1.length; i++) {
    if(arr1[i] != arr2[i]) {
      return false;
    }
  }
  return true;
}

function copy(arr) {
  return JSON.parse(JSON.stringify(arr));
}

function remove(arr, n) {
  const i = arr.indexOf(n);
  if(i >= 0) {
    arr.splice(i, 1);
    return true;
  }
  return false;
}

function shuffle(arr) {
  let m = arr.length - 1;
  while(m > 0) {
    const i = rand(0, m);
    const temp = arr[i];
    arr[i] = arr[m];
    arr[m] = temp;
    m--;
  }
  return arr;
}

function intersects(p11, p12, p21, p22) {
  const m1 = (p11.y - p12.y) / (p11.x - p12.x);
  const m2 = (p21.y - p22.y) / (p21.x - p22.x);
  const x = ((m1 * p11.x) - (m2 * p21.x) - p11.y + p21.y) / (m1 - m2);
  if((x > p11.x != x > p12.x) && (x > p21.x != p22.x)) {
    return {'x': x, 'y': m1 * (x - p11.x) + p11.y};
  }
  return false;
}

function inRange(n) {
  return n >= 0 && n < 8;
}

//Classes
class Board {
  constructor(params) {
    this.arr = params.arr || [[2, 0, 2, 0, 0, 0, 1, 0],
                [0, 2, 0, 0, 0, 1, 0, 1],
                [2, 0, 2, 0, 0, 0, 1, 0],
                [0, 2, 0, 0, 0, 1, 0, 1],
                [2, 0, 2, 0, 0, 0, 1, 0],
                [0, 2, 0, 0, 0, 1, 0, 1],
                [2, 0, 2, 0, 0, 0, 1, 0],
                [0, 2, 0, 0, 0, 1, 0, 1]]
    this.toGo = params.toGo || 1;
    this.black = params.black || 12;
    this.white = params.white || 12;
    this.getWinner();
    this.getMoves();
  }

  getWinner() {
    if(this.white == 0) {
      this.winner = 2;
    } else if(this.black == 0) {
      this.winner = 1;
    } else {
      this.winner = 0;
    }
  }

  getMoves() {
    this.moves = [];
    //Move is an object
    //{start: pos, end: pos, kills: [pos,pos]}
    for(let i = 0; i < 8; i++) {
      for(let j = 0; j < 8; j++) {
        if(this.arr[i][j] != this.toGo) {
          continue;
        }
        let dir = (this.toGo == 2? 1: -1);
        if(inRange(i + dir) && inRange(j + 1) && this.arr[i + dir, j + 1] == 0) {
          this.moves.push({start: [i, j], end: [i + dir, j + 1]})
        }
      }
    }
  }

  draw(x, y, w, h) {
    const unit = Math.floor(min(w, h) / 9);
    const xStart = Math.floor((w - (unit * 8)) / 2);
    const yStart = Math.floor((h - (unit * 8)) / 2);
    ctx.fillStyle = 'rgba(255, 255, 255, .2)';
    ctx.strokeStyle = 'white';
    for(let i = 0; i < 8; i++) {
      for(let j = 0; j < 8; j++) {
        ctx.fillStyle = 'rgba(255, 255, 255, .2)';
        const xp = xStart + unit * i;
        const yp = yStart + unit * j;
        if((i + j) % 2 == 0) {
          ctx.fillRect(xp, yp, unit, unit);
        }
        ctx.strokeRect(xp, yp, unit, unit);
        if(this.arr[i][j] != 0) {
          ctx.fillStyle = 'rgba(0, 0, 48, 1)';
          if(this.arr[i][j] == 1) {
            ctx.fillStyle = 'rgba(51, 51, 99, 1)';
          }
          ctx.beginPath();
          const r = unit / 2;
          ctx.arc(xp + r, yp + r, r * .8, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
      }
    }
  }

  copy() {
    const child = new Board();
    child.arr = JSON.parse(JSON.stringify(this.arr));
    child.toGo = this.toGo;
    child.black = this.black;
    child.white = this.white;
    child.getWinner();
    child.getMoves();
  }
}