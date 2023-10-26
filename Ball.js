const INITIAL_VELOCITY = 0.025
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
            Math.abs(this.direction.x) <= 0.2 ||
            Math.abs(this.direction.x) >= 0.8
        ) {
            const heading = randomNumberBetween(0,2 * Math.PI)
            this.direction = { x: Math.cos(heading), y: Math.sin(heading)}
        }
        this.velocity = INITIAL_VELOCITY
    }

    // update (delta, paddleRects, mushroomRect, mirrorRect) {
    update (delta, paddleRects, mushroom, mirror) {
        this.x += this.direction.x * this.velocity * delta
        this.y += this.direction.y * this.velocity * delta

        const rect = this.rect() 

        if (rect.bottom >= window.innerHeight || rect.top <= 0) {
            this.direction.y *= -1
        }

        
        if (paddleRects.some(r => isCollision(r, rect))) {
            this.direction.x *= -1
        }
        this.velocity += INCREMENTAL_VELOCITY

        if (isCollision(rect, mushroom.rect())) {
            this.velocity *= 1.1
            mushroom.reset()
        }
        if (isCollision(rect, mirror.rect())) {
            this.direction.x *= -1
            mirror.reset()
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