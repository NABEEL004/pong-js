import Ball from './Ball.js'

const ball = new Ball(document.getElementById("ball"))

let lastTime = 0

function update(time) {
    const delta = time - lastTime
    ball.update(delta)
    lastTime = time
    window.requestAnimationFrame(update)
}

window.requestAnimationFrame(update)