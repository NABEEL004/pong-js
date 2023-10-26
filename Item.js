export default class Item {
    constructor(mushroomElem) {
        this.mushroomElem = mushroomElem
        this.reset()
    }

    get x() {
        return parseFloat(getComputedStyle(this.mushroomElem).getPropertyValue("--x"))
    }

    set x(value) {
        this.mushroomElem.style.setProperty("--x", value)
    }
    get y() {
        return parseFloat(getComputedStyle(this.mushroomElem).getPropertyValue("--y"))
    }

    set y(value) {
        this.mushroomElem.style.setProperty("--y", value)
    }

    reset () {
        this.x = -20
        this.y = -20
    }

    update () {
        if (this.x < 0 && this.y < 0 && Math.random() > 0.9985) {
            this.x = (Math.random() * 60) + 30
            this.y = (Math.random() * 60) + 30
            console.log(this.x)
            console.log(this.y)
        }
    }

    rect() {
        return this.mushroomElem.getBoundingClientRect()
    }
}