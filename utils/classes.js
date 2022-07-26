
const MAX_VELOCITY = 15
const RIGHT_COLOR = 'rgb(117,0,117)'
const RIGHT_COLOR_ANIMATION1 = 'rgb(97,0,97)'
const RIGHT_COLOR_ANIMATION2 = 'rgb(107,0,107)'
const LEFT_COLOR = 'white'
const LEFT_COLOR_ANIMATION1 = 'rgb(215,215,215)'
const LEFT_COLOR_ANIMATION2 = 'rgb(220,220,220)'
const BALL_COLOR = 'white'
const WINNER_COLOR = 'green'
const LOSER_COLOR = 'red'

const ballOnPaddleSound = new Audio()
ballOnPaddleSound.src = "../sounds/ball_on_paddle.mp3"

const ballOnWallSound = new Audio()
ballOnWallSound.src = "../sounds/ball_on_wall.mp3"

const ballLaunch = new Audio()
ballLaunch.src = "../sounds/ball_launch.mp3"

const applause = new Audio()
applause.src = "../sounds/applause.mp3"

const applause2 = new Audio()
applause2.src = "../sounds/applause_2.mp3"

class Paddle {
    constructor({
        x,
        color
    }) {
        this.width = 20
        this.height = 100
        this.position = {
            x: x,
            y: canvas.height/2 - this.height/2
        }
        this.color = color
        this.velocity = 0
        this.lastPressed
        this.score = 0
    }
    
    draw() {
        context.fillStyle = this.color
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        //move paddles and make sure they don't go through walls
        if (this.position.y + this.velocity >= WALL_HEIGHT
            && this.position.y + this.velocity + this.height <= canvas.height - WALL_HEIGHT) {
                this.position.y += this.velocity
        }
        this.draw()
    }
}

class Ball {
    constructor() {
        this.position = {
            x: canvas.width/2,
            y: canvas.height/2
        }
        this.color = BALL_COLOR
        this.velocity = {
            x: randVelocity(),
            y: randVelocity()
        }
        this.radius = 8
        this.reset = false
        this.fired = false
    }

    draw() {
        context.fillStyle = this.color
        context.beginPath()
        context.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI)
        context.fill()
    }

    update() {
        //if ball collides with a paddle reverse it's x velocity and accelerate it
        //also change it's y velocity at random and play a simple animation and sound effect
        if (paddleCollision(leftPaddle)) {
            this.position.x = leftPaddle.position.x + leftPaddle.width
            this.velocity.x = Math.ceil(this.velocity.x*-1.1)
            this.velocity.y = randChangeY(this)
            leftPaddle.color = LEFT_COLOR_ANIMATION1
            ballOnPaddleSound.play()
            setTimeout(() => {
                leftPaddle.color = LEFT_COLOR_ANIMATION2
                setTimeout(() => {
                    leftPaddle.color = LEFT_COLOR
                },100)
            }, 200)
        }
        if (paddleCollision(rightPaddle)) {
            this.position.x = rightPaddle.position.x - this.radius
            this.velocity.x = Math.ceil(this.velocity.x*-1.1)
            this.velocity.y = randChangeY(this)
            rightPaddle.color = RIGHT_COLOR_ANIMATION1
            ballOnPaddleSound.play()
            setTimeout(() => {
                rightPaddle.color = RIGHT_COLOR_ANIMATION2
                setTimeout(() => {
                    rightPaddle.color = RIGHT_COLOR
                },100)
            }, 200)
        }

        //if the ball passes a paddle and goes out of bounds we have a winner
        if (checkForWinner()) {
            //play one of the two sound effects at random
            if (Math.random() < 0.6) {
                applause.play()
            }
            else {
                applause2.play()
            }
            //reset ball, update score, play animations
            this.reset = true
            document.getElementById("rightScore").innerHTML = rightPaddle.score
            document.getElementById("leftScore").innerHTML = leftPaddle.score
            setTimeout(()=>{
                this.position = {
                    x: canvas.width/2,
                    y: canvas.height/2
                }
                this.velocity = {
                    x: randVelocity(),
                    y: randVelocity()
                }
                this.reset = false
                rightPaddle.color = RIGHT_COLOR
                leftPaddle.color = LEFT_COLOR
                ballLaunch.play()
            },4000)
        }

        //on collision with a wall reverse ball's y velocity
        if (wallCollision() && !this.reset) {
            this.velocity.y *= -1
            ballOnWallSound.play()
        }

        //make sure x and y velocity don't go over a limit
        if (this.velocity.x > MAX_VELOCITY) {
            this.velocity.x = MAX_VELOCITY
        }

        if (this.velocity.y > MAX_VELOCITY) {
            this.velocity.y = MAX_VELOCITY
        }

        //move ball
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.draw()
    }
}