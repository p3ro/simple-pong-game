const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
const WALL_COLOR = 'rgb(201,201,201)'
const WALL_HEIGHT = 15

canvas.width = 1024
canvas.height = 576

context.fillRect(0, 0, canvas.width, canvas.height)


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

//set score
document.getElementById("rightScore").innerHTML = rightPaddle.score
document.getElementById("leftScore").innerHTML = leftPaddle.score

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
        case 'w':
            keysPressed.w = true
            leftPaddle.lastPressed = 'w'
            break
        case 'W':
            keysPressed.w = true
            leftPaddle.lastPressed = 'w'
            break
        case 's':
            keysPressed.s = true
            leftPaddle.lastPressed = 's'
            break
        case 'S':
            keysPressed.s = true
            leftPaddle.lastPressed = 's'
                break
        case 'ArrowUp':
            keysPressed.ArrowUp = true
            rightPaddle.lastPressed = 'ArrowUp'
            break
        case 'ArrowDown':
            keysPressed.ArrowDown = true
            rightPaddle.lastPressed = 'ArrowDown'
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

    //draw background, players, ball and enviroment
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = 'black'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = WALL_COLOR
    context.fillRect(0, 0, canvas.width, WALL_HEIGHT)
    context.fillRect(0, canvas.height-WALL_HEIGHT, canvas.width, WALL_HEIGHT)
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
    
    leftPaddle.update()
    rightPaddle.update()
    ball.update()
    
    //reset players' velocity
    leftPaddle.velocity = 0
    rightPaddle.velocity = 0

    //check for movement
    if (keysPressed.w && leftPaddle.lastPressed === 'w') {
        leftPaddle.velocity = -5
    }
    else if (keysPressed.s && leftPaddle.lastPressed === 's') {
        leftPaddle.velocity = 5
    }
    
    if (keysPressed.ArrowUp && rightPaddle.lastPressed === 'ArrowUp') {
        rightPaddle.velocity = -5
    }
    else if (keysPressed.ArrowDown && rightPaddle.lastPressed === 'ArrowDown') {
        rightPaddle.velocity = 5
    }
}

loop()