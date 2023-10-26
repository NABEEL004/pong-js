import Ball from './Ball.js'
import Paddle from './Paddle.js'
import Item from './Item.js'

// Creating new objects based on the imported Ball and Paddle classes
const ball = new Ball(document.getElementById("ball"))  // creating a new Ball object
const player_paddle = new Paddle(document.getElementById("player-paddle")) // creating the player paddle object
const computer_paddle = new Paddle(document.getElementById("computer-paddle"))  // creating the computer paddle object
const mushroom = new Item(document.getElementById("mushroom")) // creating a new Item object
const mirror = new Item(document.getElementById("mirror")) // creating a new Item object

// Getting the score elements on the html page
const playerScore = document.getElementById('player-score')
const computerScore = document.getElementById('computer-score')

// Defining the initial value of lastTime to calculate the first value of delta
let lastTime = 0

// defining the update function that takes in the parameter of time
function update(time) {
    const delta = time - lastTime 
    ball.update(delta, [ player_paddle.rect(), computer_paddle.rect() ], mushroom, mirror) 
    computer_paddle.update(delta, ball.y)
    mushroom.update()
    mirror.update()
    lastTime = time
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


document.addEventListener("mousemove", e => {
    player_paddle.position = (e.y / window.innerHeight) * 100
})

window.requestAnimationFrame(update)