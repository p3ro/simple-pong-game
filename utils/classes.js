
MAX_VELOCITY = 12
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
    }
    
    draw() {
        context.fillStyle = this.color
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        if (this.position.y + this.velocity >= 0
            && this.position.y + this.velocity + this.height <= canvas.height) {
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
        this.color = 'white'
        this.velocity = {
            x: randVelocity(),
            y: randVelocity()
        }
        this.radius = 8
        this.reset = false
    }

    draw() {
        context.fillStyle = this.color
        context.beginPath()
        context.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI)
        context.fill()
    }

    update() {
        if (paddleCollision(leftPaddle)) {
            this.position.x = leftPaddle.position.x + leftPaddle.width
            this.velocity.x = Math.ceil(this.velocity.x*-1.01)
            this.velocity.y = randChangeY(this)
        }
        if (paddleCollision(rightPaddle)) {
            this.position.x = rightPaddle.position.x - this.radius
            this.velocity.x = Math.ceil(this.velocity.x*-1.01)
            this.velocity.y = randChangeY(this)
        }

        if (checkForWinner()) {
            this.reset = true
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
                rightPaddle.color = 'purple'
                leftPaddle.color = 'white'
            },3000)
            }

        if (wallCollision()) {
            this.velocity.y *= -1
        }

        if (this.velocity.x > MAX_VELOCITY) {
            this.velocity.x = MAX_VELOCITY
        }

        if (this.velocity.y > MAX_VELOCITY) {
            this.velocity.y = MAX_VELOCITY
        }

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.draw()
    }
}