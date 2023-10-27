const INITIAL_VELOCITY = 0.025
// const INITIAL_VELOCITY = 0.1
const INCREMENTAL_VELOCITY = 0.00008

export default class Ball {
    constructor(ballElem) {
        this.ballElem = ballElem
        this.reset()
    }

    get x() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"))
    }

    set x(value) {
        this.ballElem.style.setProperty("--x", value)
    }
    get y() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"))
    }

    set y(value) {
        this.ballElem.style.setProperty("--y", value)
    }

    rect() {
        return this.ballElem.getBoundingClientRect()
    }

    reset() {
        this.x = 50
        this.y = 50
        this.direction = { x: 0}
        while (
            Math.abs(this.direction.x) <= 0.3 ||
            Math.abs(this.direction.x) >= 0.7
        ) {
            const heading = randomNumberBetween(0,2 * Math.PI)
            this.direction = { x: Math.cos(heading), y: Math.sin(heading)}
        }

        if (this.direction.x > 0) {
            this.cpu_turn = true
        }
        else {
            this.cpu_turn = false
        }
        console.log(this.cpu_turn)
        this.velocity = INITIAL_VELOCITY
    }

    // update (delta, paddleRects, mushroomRect, mirrorRect) {
    update (delta, playerRect, comRect, mushroom, mirror, banana) {
        this.x += this.direction.x * this.velocity * delta
        this.y += this.direction.y * this.velocity * delta

        const rect = this.rect() 

        if (rect.bottom >= window.innerHeight || rect.top <= 0) {
            this.direction.y *= -1
        }

        
        if (isCollision(playerRect, rect) && !this.cpu_turn) {
            const ballY = (rect.bottom + rect.top)/2
            const pos = (ballY - playerRect.top)/(playerRect.bottom - playerRect.top)
            const heading = (((2* Math.PI )/ 3) * pos) - (Math.PI/3)
            this.direction = { x: Math.cos(heading), y: Math.sin(heading)}
            this.cpu_turn = !this.cpu_turn
        }
        
        if (isCollision(comRect, rect) && this.cpu_turn) {
            const ballY = (rect.bottom + rect.top)/2
            const pos = (ballY - comRect.bottom)/(comRect.top - comRect.bottom)
            const heading = (((2*Math.PI)/3) * pos) + ((2 * Math.PI)/3)
            this.direction = { x: Math.cos(heading), y: Math.sin(heading)}
            this.cpu_turn = !this.cpu_turn
        }

        this.velocity += INCREMENTAL_VELOCITY

        if (isCollision(rect, mushroom.rect())) {
            this.velocity *= 1.1
            mushroom.reset()
        }
        if (isCollision(rect, mirror.rect())) {
            this.direction.x *= -1
            this.cpu_turn = !this.cpu_turn
            mirror.reset()
        }

        if (isCollision(rect, banana.rect())) {
            const prevState = this.direction.x
            do {
                const heading = randomNumberBetween(0,2 * Math.PI)
                this.direction = { x: Math.cos(heading), y: Math.sin(heading)}
            } while (Math.abs(this.direction.x) < 0.2 || Math.abs(this.direction.x) > 0.8)
            if (prevState * this.direction.x < 0) {
                this.cpu_turn = !this.cpu_turn
            }
            banana.reset()
        }
    }
}

function randomNumberBetween(min, max) {
    return Math.random() * (max-min) + min
}

function isCollision (rect1, rect2) {
    return (
        rect1.left <= rect2.right &&
        rect1.right >= rect2.left &&
        rect1.top <= rect2.bottom &&
        rect1.bottom >= rect2.top
    )
}