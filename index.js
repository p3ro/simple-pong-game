const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
const WALL_COLOR = 'rgb(201,201,201)'
const WALL_HEIGHT = 15

canvas.width = 1024
canvas.height = 576

timers = []

context.fillRect(0, 0, canvas.width, canvas.height)

let pause = false

//players
const leftPaddle = new Paddle({
    x: 20,
    color: LEFT_COLOR
})

const rightPaddle = new Paddle({
    x:canvas.width-40,
    color: RIGHT_COLOR
})

const ball = new Ball()

//checking which key was pressed
const keysPressed = {
    w: false,
    s: false,
    ArrowUp: false,
    ArrowDown: false
}

//check for key presses
document.addEventListener('keydown', (k) => {
    switch (k.key) {
        case 'Escape':
            if (!ball.reset) {
                pause = !pause
            }
            break
        case 'Backspace':
            if (!ball.reset) {
                pause = !pause
            }
            break
        case 'r':
            pause = false
            leftPaddle.restart(20, LEFT_COLOR)
            rightPaddle.restart(canvas.width-40, RIGHT_COLOR)
            ball.restart()
            for(i=0; i<timers.length; i++) {
                clearTimeout(timers[i])
            }
            timers = []
            document.getElementById("rightScore").innerHTML = rightPaddle.score
            document.getElementById("leftScore").innerHTML = leftPaddle.score
            break
        case 'R':
            pause = false
            leftPaddle.restart(20, LEFT_COLOR)
            rightPaddle.restart(canvas.width-40, RIGHT_COLOR)
            ball.restart()
            for(i=0; i<timers.length; i++) {
                clearTimeout(timers[i])
            }
            timers = []
            document.getElementById("rightScore").innerHTML = rightPaddle.score
            document.getElementById("leftScore").innerHTML = leftPaddle.score
            break
        case 'w':
            if (!pause){
                keysPressed.w = true
                leftPaddle.lastPressed = 'w'
            }
            break
        case 'W':
            if (!pause){
                keysPressed.w = true
                leftPaddle.lastPressed = 'w'
            }
            break
        case 's':
            if (!pause){
                keysPressed.s = true
                leftPaddle.lastPressed = 's'
            }
            break
        case 'S':
            if (!pause){
                keysPressed.s = true
                leftPaddle.lastPressed = 's'
            }
                break
        case 'ArrowUp':
            if (!pause){
                keysPressed.ArrowUp = true
                rightPaddle.lastPressed = 'ArrowUp'
            }
            break
        case 'ArrowDown':
            if (!pause){
                keysPressed.ArrowDown = true
                rightPaddle.lastPressed = 'ArrowDown'
            }
            break
    }
})

document.addEventListener('keyup', (k) => {
    switch (k.key) {
        case 'w':
            keysPressed.w = false
            break
        case 'W':
            keysPressed.w = false
            break
        case 's':
            keysPressed.s = false
            break
        case 'S':
            keysPressed.s = false
            break
        case 'ArrowUp':
            keysPressed.ArrowUp = false
            break
        case 'ArrowDown':
            keysPressed.ArrowDown = false
            break
    }
})



//basic game loop
function loop() {
    requestAnimationFrame(loop)
    if (!pause) {
        //draw background
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.fillStyle = 'black'
        context.fillRect(0, 0, canvas.width, canvas.height)
        //draw walls
        context.fillStyle = WALL_COLOR
        context.fillRect(0, 0, canvas.width, WALL_HEIGHT)
        context.fillRect(0, canvas.height-WALL_HEIGHT, canvas.width, WALL_HEIGHT)
        //draw center
        context.beginPath()
        context.arc(canvas.width/2, canvas.height/2, 25, 0, 2*Math.PI)
        context.strokeStyle = WALL_COLOR
        context.lineWidth = 3
        context.stroke()
        context.beginPath()
        context.arc(canvas.width/2, canvas.height/2, 5, 0, 2*Math.PI)
        context.fill()
        context.beginPath()
        context.moveTo(canvas.width/2-50,canvas.height/2)
        context.lineTo(canvas.width/2-35,canvas.height/2)
        context.stroke()
        context.beginPath()
        context.moveTo(canvas.width/2+50,canvas.height/2)
        context.lineTo(canvas.width/2+35,canvas.height/2)
        context.stroke()
        //draw players and ball
        leftPaddle.update()
        rightPaddle.update()
        ball.update()
        
        //reset players' velocity
        leftPaddle.velocity = 0
        rightPaddle.velocity = 0

        //check for movement
        if (keysPressed.w && leftPaddle.lastPressed === 'w') {
            leftPaddle.velocity = -7
        }
        else if (keysPressed.s && leftPaddle.lastPressed === 's') {
            leftPaddle.velocity = 7
        }
        
        if (keysPressed.ArrowUp && rightPaddle.lastPressed === 'ArrowUp') {
            rightPaddle.velocity = -7
        }
        else if (keysPressed.ArrowDown && rightPaddle.lastPressed === 'ArrowDown') {
            rightPaddle.velocity = 7
        }
    }
}

setTimeout(()=> {
    //initialize
    document.getElementById("rightScore").innerHTML = rightPaddle.score
    document.getElementById("leftScore").innerHTML = leftPaddle.score
    ballLaunch.play()
    loop()
}, 500)
