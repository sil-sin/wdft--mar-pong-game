let canvas = document.querySelector('canvas')
canvas.style.backgroundColor = "#302c2c"

// getting the paintbrush
let ctx = canvas.getContext('2d')

// The DOM of the start and the restart buttons
let startBtn = document.querySelector('#start')
let restartBtn = document.querySelector('#restart')

let circleX = 50, circleY = 50, circleRadius = 30;
let paddleX = 100, paddleHeight = 20, paddleWidth = 200;
let incrX = 5, incrY = 5
let isGameOver = false;
let intervalId = 0
let isArrowLeft = false, isArrowRight = false
let score = 0;
let lives = 3

// keydown && keyup
document.addEventListener('keydown', (event) => {
    console.log(event)
    if (event.code == 'ArrowRight'){
        isArrowRight = true
        isArrowLeft = false
    }
    else if (event.code == 'ArrowLeft') {
        isArrowRight = false
        isArrowLeft = true
    }
})

document.addEventListener('keyup', () => {
    isArrowRight = false
    isArrowLeft = false
})

function drawCircle() {
    ctx.beginPath()
    ctx.fillStyle = "#19fae0"
    ctx.arc(circleX, circleY, circleRadius, 0, 2*Math.PI)
    ctx.fill()
    ctx.closePath()
}

function drawPaddle(){
    ctx.beginPath()
    ctx.fillStyle = "#96ff2e"
    ctx.fillRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
    ctx.closePath()
}

function collision(){
     // right hand side
     if (circleX > canvas.width - circleRadius) {
        incrX = -5
    }
    // bottom side
    if (circleY > canvas.height - circleRadius) {
        //code
        if (circleX > paddleX && circleX < paddleX + paddleWidth  ) {
            // increment the score
            score++
            incrY = -5
        }
        else {
            lives -= 1
            incrY = -5
            if (lives == 0) {
                isGameOver = true
            }
        }
    }
    //left side
    if (circleX < circleRadius) {
        incrX = 5        
    }
    // top side
    if (circleY < circleRadius) {
        incrY = 5
    }
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawCircle()
    collision()
    drawPaddle()

    // adding the score
    ctx.fillStyle = 'white'
    ctx.font = '24px Verdana'
    ctx.fillText(`Score is: ${score}`, 20, 30)

    // animating our circle
    circleX = circleX + incrX
    circleY = circleY + incrY
    

    // animate the paddle
    if (isArrowRight && (paddleX + paddleWidth < canvas.width)) {
        paddleX = paddleX + 5
    }
    if (isArrowLeft && (paddleX > 0 ) ) {
        paddleX = paddleX - 5
    }

    if (isGameOver) {
        cancelAnimationFrame(intervalId)
        canvas.style.display = 'none'
        restartBtn.style.display = 'block'
    }
    else {
       intervalId =  requestAnimationFrame(animate)
    } 
}

function start(){
    canvas.style.display = 'block'
    startBtn.style.display = 'none'
    restartBtn.style.display = 'none'
    animate()
}

function restart() {
    isGameOver = false;
    circleX = 50;
    circleY = 50;
    start()
}

 //Everything begins here
window.addEventListener('load', () => {
    canvas.style.display = 'none'
    restartBtn.style.display = 'none'
    start()
    startBtn.addEventListener('click', () => {
         start()
    })

    restartBtn.addEventListener('click', () => {
        restart()
    })
})