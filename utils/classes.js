
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