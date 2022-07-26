
function randVelocity() {
    if (Math.random() < 0.5) {
        return Math.floor(Math.random()*3)+5
    }
    return (Math.floor(Math.random()*3)+5)*-1
}

function wallCollision() {
   return (ball.position.y + ball.velocity.y + ball.radius >= canvas.height - WALL_HEIGHT|| 
    ball.position.y + ball.velocity.y <= WALL_HEIGHT)
}

function paddleCollision(paddle) {
    return (ball.position.x + ball.velocity.x <= paddle.position.x + paddle.width &&
        ball.position.x +  ball.velocity.x + ball.radius >= paddle.position.x &&
        ball.position.y + ball.velocity.y <= paddle.position.y +paddle.velocity + paddle.height &&
        ball.position.y + ball.velocity.y + ball.radius >= paddle.position.y + paddle.velocity)
 }

 function randChangeY(ball) {
    rand = Math.random()
    if (rand < 0.2) {
        return Math.ceil(ball.velocity.y*1.1)
    }
    if (rand < 0.4) {
        return Math.ceil(ball.velocity.y*-1.1)
    }
    if (rand < 0.6) {
        return Math.floor(ball.velocity.y*0.9)
    }
    if (rand < 0.8) {
        return Math.floor(ball.velocity.y*-0.9)
    }
    else return ball.velocity.y
 }

 function checkForWinner() {
    if (ball.position.x + ball.velocity.x < 0 && !ball.reset) {
        console.log("Right Won")
        rightPaddle.color = WINNER_COLOR
        leftPaddle.color = LOSER_COLOR
        rightPaddle.score++
        return true
    }
    if (ball.position.x + ball.velocity.x > canvas.width && !ball.reset) {
        console.log("Left Won")
        rightPaddle.color = LOSER_COLOR
        leftPaddle.color = WINNER_COLOR
        leftPaddle.score++
        return true
    }
    return false
 }