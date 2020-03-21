// select the elements on the page - canvas, shake button
const canvas = document.querySelector('#etch-a-sketch');
// canvas is the element and the place we're drawing is called the context
const ctx = canvas.getContext('2d');
const shakeButton = document.querySelector('.shake');
const MOVE_AMOUNT = 10;

// const width =  canvas.width;
// const hight = canvas.height;
// because it is object and we're making same named variables we can destructur this
const { width, height } = canvas;

// create random x & y starting points
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

// set up the canvas for the drawing

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;
let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

// to show starting drawing dot
ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// write the draw function
function draw({ key }) {
  // increment the hue
  hue += 10;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  console.log(key);
  ctx.beginPath();
  ctx.moveTo(x, y);
  // move x & y values depending on what user did
  switch (key) {
    case 'ArrowUp':
      y -= MOVE_AMOUNT;
      break;
    case 'ArrowDown':
      y += MOVE_AMOUNT;
      break;
    case 'ArrowLeft':
      x -= MOVE_AMOUNT;
      break;
    case 'ArrowRight':
      x += MOVE_AMOUNT;
      break;
    default:
      break;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
}

// write handler for the keys
function handleKey(e) {
  if (e.key.includes('Arrow')) {
    // because default of the arrow key is to scroll
    e.preventDefault();
    draw({ key: e.key });
    // console.log(e.key);
    // console.log(e);
  }
}

// write function for the shake button
function clearCanvas() {
  canvas.classList.add('shake');
  ctx.clearRect(0, 0, width, height);
  canvas.addEventListener(
    'animationend',
    function() {
      canvas.classList.remove('shake');
      // when we run clearCanvas(), we add the class and the we listen for that animation to be over and then we remove it. But what's happening is that this canvas still has the eventListener of animationend added to it, and every time we clear the canvas, we're adding a new eventListener to it over and over again. AddEvent listener can have 3 arguments and if now use 3 argument {once: true}, then it will unbind itself
    },
    { once: true }
    
  );
}

// listen for the arrow keys
window.addEventListener('keydown', handleKey);
shakeButton.addEventListener('click', clearCanvas);
