import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight


// variable

let ball;
let gravity = 1;
let friction = 0.75;


function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}


const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

addEventListener('click', function(){
    init();
})

//  Ball Constructor
function Ball(x, y, xSpeed, ySpeed, radius, color) {
    this.x = x
    this.y = y
    this.xSpeed = xSpeed
    this.ySpeed = ySpeed
    this.radius = radius
    this.color = color
}

Ball.prototype.draw = function() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.stroke();
    c.closePath()
}

Ball.prototype.update = function() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    if(this.y  + this.radius + this.ySpeed > innerHeight){
        this.ySpeed = -this.ySpeed * friction;
    }else{
        this.ySpeed += gravity;
    }

    if(this.x + this.radius + this.xSpeed > canvas.width || this.x - this.radius <= 0){
        this.xSpeed = -this.xSpeed;
    }

    this.draw()
}

// store balls in ballArray
let ballArray;
function init() {
      ballArray = [];
    for (let i = 0; i < 500; i++) {
        let radius = randomIntFromRange(10,30);
        let x = randomIntFromRange(radius, canvas.width - radius);
        let y = randomIntFromRange(0, canvas.height - radius);
        let xSpeed = randomIntFromRange(-2,2);
        let ySpeed = randomIntFromRange(-2,2);
        let color = randomColor(colors);
        ballArray.push(new Ball(x, y, xSpeed, ySpeed, radius, color));  
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    for( let i = 0; i < ballArray.length; i++){     // Display balls
        ballArray[i].update();
    }
}

init()
animate()


