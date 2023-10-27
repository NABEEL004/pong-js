import Ball from './Ball.js'
import Paddle from './Paddle.js'
import Item from './Item.js'
import Modal from './Modal.js'

// Creating new objects based on the imported Ball and Paddle classes
const ball = new Ball(document.getElementById("ball"))  // creating a new Ball object
const player_paddle = new Paddle(document.getElementById("player-paddle")) // creating the player paddle object
const computer_paddle = new Paddle(document.getElementById("computer-paddle"))  // creating the computer paddle object
const mushroom = new Item(document.getElementById("mushroom")) // creating a new Item object
const mirror = new Item(document.getElementById("mirror")) // creating a new Item object
const banana = new Item(document.getElementById("banana")) // creating a new Item object
const modal = new Modal(document.getElementById("welcome"))

// Getting the score elements on the html page
const playerScore = document.getElementById('player-score')
const computerScore = document.getElementById('computer-score')

// Defining the initial value of lastTime to calculate the first value of delta
let lastTime = 0

// defining the update function that takes in the parameter of time
function update(time) {
    const delta = time - lastTime 
    const hue = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--hue')
    )

    if (modal.show == true) {
        console.log("modal showing")
    }
    else{
        ball.update(delta, player_paddle.rect(), computer_paddle.rect() , mushroom, mirror, banana) 
        computer_paddle.update(delta, ball.y)
        mushroom.update()
        mirror.update()
        banana.update()
        if (isLose()) {
            computer_paddle.reset()
            incrementScore()
            ball.reset()
        }
        document.documentElement.style.setProperty("--hue", hue + delta * 0.01)
    }
    
    lastTime = time
    window.requestAnimationFrame(update)
}

function isLose () {
    const rect = ball.rect()
    return rect.left < 0 || rect.right > window.innerWidth
}

function incrementScore () {
    const rect = ball.rect()
    console.log(rect.left)
    if (rect.left < 0) {
        computerScore.textContent = parseInt(computerScore.textContent) + 1
        if (parseInt(computerScore.textContent) == 5) {
            handleLose(modal, ball)
        }
    }
    else {
        playerScore.textContent = parseInt(playerScore.textContent) + 1
        if (parseInt(playerScore.textContent) == 5) {
            handleWin(modal, ball)
        }
    }
}

function handleClick () {
    computerScore.textContent = 0
    playerScore.textContent = 0
    modal.hide()
    ball.reset()
    mushroom.reset()
    banana.reset()
    mirror.reset()
    console.log("clicked")
}

function handleWin(modal, ball) {
    modal.reset()
    ball.reset()
    document.getElementById("welcome-header").style.display = "none";
    document.getElementById("win-header").style.display = "block";
    document.getElementById("lose-header").style.display = "none";
}

function handleLose(modal, ball) {
    modal.reset() 
    ball.reset()
    document.getElementById("welcome-header").style.display = "none";
    document.getElementById("win-header").style.display = "none";
    document.getElementById("lose-header").style.display = "block";
}

document.getElementById("easy").addEventListener('click', () => {handleClick(modal); computer_paddle.speed = 0.005; computer_paddle.reset()})
document.getElementById("medium").addEventListener('click', () => {handleClick(modal); computer_paddle.speed = 0.008; computer_paddle.reset()})
document.getElementById("hard").addEventListener('click', () => {handleClick(modal); computer_paddle.speed = 0.012; computer_paddle.reset()})

document.addEventListener("mousemove", e => {
    player_paddle.position = (e.y / window.innerHeight) * 100
})

document.addEventListener("touchmove", function(event) {
    event.preventDefault();
    var touch = event.touches[0];
    var yPosition = touch.clientY;
    player_paddle.position = yPosition;
    console.log("Y-position: " + yPosition);
});

window.requestAnimationFrame(update)