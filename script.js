import Ball from './Ball.js'
import Paddle from './Paddle.js'

const ball = new Ball(document.getElementById("ball"))
const player_paddle = new Paddle(document.getElementById("player-paddle"))
const computer_paddle = new Paddle(document.getElementById("computer-paddle"))
const playerScore = document.getElementById('player-score')
const computerScore = document.getElementById('computer-score')
let lastTime = 0

function update(time) {
    const delta = time - lastTime
    ball.update(delta, [ player_paddle.rect(), computer_paddle.rect() ])
    computer_paddle.update(delta, ball.y)
    lastTime = time
    // handlePaddle()
    if (isLose()) {
        incrementScore()
        ball.reset()
        computer_paddle.reset()
    }
    const hue = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--hue')
    )
    
    document.documentElement.style.setProperty("--hue", hue + delta * 0.01)
    
    window.requestAnimationFrame(update)
}

function isLose () {
    const rect = ball.rect()
    return rect.left < 0 || rect.right > window.innerWidth
}

function incrementScore () {
    const rect = ball.rect()
    if (rect.left < 0) {
        computerScore.textContent = parseInt(computerScore.textContent) + 1
    }
    else {
        playerScore.textContent = parseInt(playerScore.textContent) + 1
    }
}

// function handlePaddle () {
//     const ballRect = ball.rect()
//     const playerRect = player_paddle.rect()
//     const computerRect = computer_paddle.rect()
// }

document.addEventListener("mousemove", e => {
    player_paddle.position = (e.y / window.innerHeight) * 100
})

window.requestAnimationFrame(update)