const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

context.fillRect(0, 0, canvas.width, canvas.height)

//players
const leftPaddle = new Paddle({
    x : 10,
    color: 'white'
})

const rightPaddle = new Paddle({
    x:canvas.width-30,
    color:'purple'
})

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
        case 's':
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
        case 's':
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

    //draw background, players and ball
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = 'black'
    context.fillRect(0, 0, canvas.width, canvas.height)
    leftPaddle.update()
    rightPaddle.update()

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